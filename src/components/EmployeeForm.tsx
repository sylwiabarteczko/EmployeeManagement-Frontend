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
            if (!form.firstName?.trim()) {
                throw new Error('First name is required')
            }
            if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                throw new Error('Please provide a valid email')
            }
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
        <form onSubmit={submit} className="form">
            <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={onChange}
                required
                aria-label="First name"
            />
            <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName ?? ''}
                onChange={onChange}
                aria-label="Last name"
            />
            <div className="date-field">
                <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
            <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth ?? ''}
                onChange={onChange}
                aria-label="Date of birth"
            />
            </div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email ?? ''}
                onChange={onChange}
                aria-label="Email"
            />
            <input
                name="department"
                placeholder="Department"
                value={form.department ?? ''}
                onChange={onChange}
                aria-label="Department"
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save'}
            </button>
            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}
        </form>
    )
}