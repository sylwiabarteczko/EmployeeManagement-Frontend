import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { getEmployee, updateEmployee } from '../api'
import type { Employee, EmployeeCreateDTO } from '../types'

export default function EditEmployeePage() {
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

    const idParam = searchParams.get('id')!
    const numericId = Number(idParam)

    const initial: EmployeeCreateDTO = {
        firstName: employee.firstName,
        lastName: employee.lastName ?? '',
        dateOfBirth: employee.dateOfBirth ?? '',
        email: employee.email ?? '',
        department: employee.department ?? '',
    }

    const handleSubmit = async (data: EmployeeCreateDTO) => {
        await updateEmployee(numericId, data)
    }

    return (
        <>
            <div className="page-header">
                <h2>Edit employee #{employee.id}</h2>
                <Link className="btn-secondary" to={`/employees/details?id=${employee.id}`}>
                    ← Back to details
                </Link>
            </div>

            <EmployeeForm
                initial={initial}
                onSubmit={handleSubmit}
                onSuccess={() => navigate(`/employees/details?id=${employee.id}`)}
                submitLabel="Update"
            />
        </>
    )
}
