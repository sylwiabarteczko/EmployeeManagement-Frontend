import { useState } from 'react'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'

export default function App() {
    const [refreshKey, setRefreshKey] = useState<number>(0)

    return (
        <div style={{ padding: 24, fontFamily: 'ui-sans-serif' }}>
            <h1>Employees</h1>

            <EmployeeForm onCreated={() => setRefreshKey((k) => k + 1)} />
            <hr />
            <div key={refreshKey}>
                <EmployeeList />
            </div>
        </div>
    )
}
