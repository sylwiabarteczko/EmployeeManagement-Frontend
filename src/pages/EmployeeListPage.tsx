import { Link } from 'react-router-dom'
import EmployeeList from '../components/EmployeeList'

export default function EmployeeListPage() {
    return (
        <>
            <div className="page-header">
                <h2>Employee list</h2>
                <Link className="btn-secondary" to="/add">+ Add Employee</Link>
            </div>

            <EmployeeList />
        </>
    )
}
