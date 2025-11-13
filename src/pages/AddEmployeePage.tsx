import { useNavigate, Link } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { createEmployee } from '../api'
import type { EmployeeCreateDTO } from '../types'

export default function AddEmployeePage() {
    const navigate = useNavigate()

    const handleSubmit = async (data: EmployeeCreateDTO) => {
        await createEmployee(data)
    }
    return (
        <>
            <div className="page-header">
                <h2>Add new employee</h2>
                <Link className="btn-secondary" to="/employees">Go to List →</Link>
            </div>

            <EmployeeForm
                onSubmit={handleSubmit}

                onSuccess={() => navigate('/employees')}
                submitLabel="Create"
            />
        </>
    )
}
