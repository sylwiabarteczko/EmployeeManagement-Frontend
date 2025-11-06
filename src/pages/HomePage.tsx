import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <h2>Employee Management</h2>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn-secondary" to="/add">➕ Add Employee</Link>
                <Link className="btn-secondary" to="/employees">📄 Employee List</Link>
            </div>
        </>
    )
}
