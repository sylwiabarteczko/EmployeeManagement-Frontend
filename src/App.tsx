import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddEmployeePage from './pages/AddEmployeePage'
import EmployeeListPage from './pages/EmployeeListPage'

export default function App() {
    return (
        <div className="container">
            <nav className="nav">
                <h1 className="nav__brand">Employees</h1>
                <div className="nav__links">
                    <Link to="/">Home</Link>
                    <Link to="/add">Add Employee</Link>
                    <Link to="/employees">Employee List</Link>
                </div>
            </nav>

            <div className="divider" />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddEmployeePage />} />
                <Route path="/employees" element={<EmployeeListPage />} />
            </Routes>
        </div>
    )
}
