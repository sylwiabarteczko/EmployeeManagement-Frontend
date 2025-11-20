import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAgeHistogram, getEmployeesByAge } from '../api'
import type { AgeHistogram, Employee } from '../types'
import AgeHistogramChart from '../components/AgeHistogramChart'

const AGE_RANGES = [
    { label: '18-25', minAge: 18, maxAge: 25 },
    { label: '26-35', minAge: 26, maxAge: 35 },
    { label: '36-45', minAge: 36, maxAge: 45 },
    { label: '46-55', minAge: 46, maxAge: 55 },
    { label: '56-65', minAge: 56, maxAge: 65 },
    { label: '66+',  minAge: 66, maxAge: undefined },
]

export default function AgeStatsPage() {
    const [histogram, setHistogram] = useState<AgeHistogram | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [selectedRange, setSelectedRange] = useState<string | null>(null)
    const [employees, setEmployees] = useState<Employee[] | null>(null)
    const [employeesLoading, setEmployeesLoading] = useState(false)
    const [employeesError, setEmployeesError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        getAgeHistogram()
            .then(setHistogram)
            .catch((e) => setError(e instanceof Error ? e.message : String(e)))
            .finally(() => setLoading(false))
    }, [])

    const handleShowEmployees = async (label: string) => {
        const range = AGE_RANGES.find((r) => r.label === label)
        if (!range) return

        setSelectedRange(label)
        setEmployees(null)
        setEmployeesError(null)
        setEmployeesLoading(true)

        try {
            const result = await getEmployeesByAge(range.minAge, range.maxAge)
            setEmployees(result)
        } catch (e) {
            setEmployeesError(e instanceof Error ? e.message : String(e))
        } finally {
            setEmployeesLoading(false)
        }
    }

    if (loading) return <p>Loading…</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!histogram) return null

    return (
        <>
            <div className="page-header">
                <h2>Age histogram</h2>
                <Link className="btn-secondary" to="/employees">
                    ← Back to list
                </Link>
            </div>

            <AgeHistogramChart histogram={histogram} />

            <div className="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Age range</th>
                        <th>Count</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {AGE_RANGES.map((r) => (
                        <tr key={r.label}>
                            <td>{r.label}</td>
                            <td>{histogram[r.label] ?? 0}</td>
                            <td>
                                <button onClick={() => handleShowEmployees(r.label)}>
                                    Show employees
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedRange && (
                <div style={{ marginTop: 24, textAlign: 'left' }}>
                    <h3>Employees in age range {selectedRange}</h3>

                    {employeesLoading && <p>Loading…</p>}
                    {employeesError && (
                        <p style={{ color: 'red' }}>Error: {employeesError}</p>
                    )}

                    {!employeesLoading && !employeesError && employees && employees.length === 0 && (
                        <p>No employees in this range.</p>
                    )}

                    {!employeesLoading && !employeesError && employees && employees.length > 0 && (
                        <ul>
                            {employees.map((e) => (
                                <li key={e.id}>
                                    #{e.id} – {e.firstName} {e.lastName ?? ''}{' '}
                                    ({e.dateOfBirth ?? 'no date of birth'})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    )
}