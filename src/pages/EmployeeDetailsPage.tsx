import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { deleteEmployee, getEmployee } from '../api'
import type { Employee } from '../types'

export default function EmployeeDetailsPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [employee, setEmployee] = useState<Employee | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const idParam = searchParams.get('id')
        if (!idParam) {
            setError('Missing employee id')
            setLoading(false)
            return
        }

        const numericId = Number(idParam)
        if (Number.isNaN(numericId)) {
            setError('Invalid employee id')
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        getEmployee(numericId)
            .then(setEmployee)
            .catch((e) =>
                setError(e instanceof Error ? e.message : String(e))
            )
            .finally(() => setLoading(false))
    }, [searchParams])

    const handleDelete = async () => {
        if (!employee) return

        const confirmed = window.confirm(
            'Are you sure you want to delete this employee?'
        )

        if (!confirmed) {
            return
        }

        await deleteEmployee(employee.id)
        navigate('/employees')
    }
    if (loading) return <p>Loading…</p>
    if (error) {
        return (
            <>
                <p style={{ color: 'red' }}>Error: {error}</p>
                <button onClick={() => navigate(-1)}>← Back</button>
            </>
        )
    }
    if (!employee) return <p>No employee found.</p>

    return (
        <>
            <div className="page-header">
                <h2>Employee details</h2>
                <Link className="btn-secondary" to="/employees">
                    ← Back to list
                </Link>
            </div>

            <div className="card">
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>First name:</strong> {employee.firstName}</p>
                <p><strong>Last name:</strong> {employee.lastName ?? '-'}</p>
                <p><strong>Date of birth:</strong> {employee.dateOfBirth ?? '-'}</p>
                <p><strong>Email:</strong> {employee.email ?? '-'}</p>
                <p><strong>Department:</strong> {employee.department ?? '-'}</p>
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <Link
                    className="btn-secondary"
                    to={`/employees/edit?id=${employee.id}`}
                >
                    ✏️ Edit
                </Link>
                <button
                    className="btn-danger"
                    onClick={handleDelete}
                >
                    🗑 Delete
                </button>
            </div>
        </>
    )
}
