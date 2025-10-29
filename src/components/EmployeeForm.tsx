import { useState } from 'react'
import { createEmployee } from '../api'
import type { EmployeeCreateDTO } from '../types'

export default function EmployeeForm({ onCreated }: { onCreated: () => void }) {
    const [form, setForm] = useState<EmployeeCreateDTO>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        department: '',
    })
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            await createEmployee(form)
            setForm({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                email: '',
                department: '',
            })
            onCreated()
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)
            setError(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
            <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={onChange}
                required
            />
            <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName ?? ''}
                onChange={onChange}
            />
            <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth ?? ''}
                onChange={onChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email ?? ''}
                onChange={onChange}
            />
            <input
                name="department"
                placeholder="Department"
                value={form.department ?? ''}
                onChange={onChange}
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}
