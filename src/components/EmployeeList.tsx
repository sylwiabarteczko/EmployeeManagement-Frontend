import { useEffect, useState } from 'react'
import { getEmployees } from '../api'
import type { Employee, Page } from '../types'

export default function EmployeeList() {
    const [data, setData] = useState<Page<Employee> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    const [search, setSearch] = useState('')
    const [q, setQ] = useState('')

    useEffect(() => {
        const id = setTimeout(() => {
            setPage(0)
            setQ(search.trim())
        }, 300)
        return () => clearTimeout(id)
    }, [search])

    useEffect(() => {
        setLoading(true)
        setError(null)
        getEmployees(page, size, 'id', 'asc', q)
            .then(setData)
            .catch((e) => setError(e instanceof Error ? e.message : String(e)))
            .finally(() => setLoading(false))
    }, [page, size, q])

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!data) return null

    const totalPages = Math.max(data.totalPages, 1)

    return (
        <>
            <div className="toolbar">
                <input
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search employees"
                />
            </div>

            {data.content.length === 0 ? (
                <p style={{ marginTop: 16 }}>
                    No employees found{q ? ` for “${q}”` : ''}.
                </p>
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Dept</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.content.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.firstName}</td>
                                <td>{e.lastName ?? ''}</td>
                                <td>{e.dateOfBirth ?? ''}</td>
                                <td>{e.email ?? ''}</td>
                                <td>{e.department ?? ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="pager">
                <button disabled={page <= 0} onClick={() => setPage((p) => p - 1)}>
                    Prev
                </button>

                <span>
          Page {data.number + 1} / {totalPages}
        </span>

                <button
                    disabled={data.number + 1 >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>

                <select
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value))
                        setPage(0)
                    }}
                    aria-label="Page size"
                >
                    {[5, 10, 20, 50].map((s) => (
                        <option key={s} value={s}>
                            {s} / page
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}