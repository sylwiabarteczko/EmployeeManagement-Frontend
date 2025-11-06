import { useNavigate, Link } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'

export default function AddEmployeePage() {
    const navigate = useNavigate()

    return (
        <>
            <div className="page-header">
                <h2>Add new employee</h2>
                <Link className="btn-secondary" to="/employees">Go to List →</Link>
            </div>

            <EmployeeForm onCreated={() => navigate('/employees')} />
        </>
    )
}
