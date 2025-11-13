import { useState } from 'react'
import type { EmployeeCreateDTO } from '../types'
import { createEmployee } from '../api'

interface EmployeeFormProps {
    initial?: EmployeeCreateDTO
    onSubmit?: (data: EmployeeCreateDTO) => Promise<void>
    onSuccess?: () => void
    submitLabel?: string
}

const emptyForm: EmployeeCreateDTO = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    department: '',
}

export default function EmployeeForm({
                                         initial,
                                         onSubmit,
                                         onSuccess,
                                         submitLabel = 'Save',
                                     }: EmployeeFormProps) {
    const [form, setForm] = useState<EmployeeCreateDTO>(initial ?? emptyForm)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

            const handler = onSubmit ?? (async (data: EmployeeCreateDTO) => {
                await createEmployee(data)
            })

            await handler(form)

            if (!initial) {

                setForm(emptyForm)
            }

            onSuccess?.()
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)
            setError(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                required
                aria-label="First name"
            />
            <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName ?? ''}
                onChange={handleChange}
                aria-label="Last name"
            />
            <div className="date-field">
                <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth ?? ''}
                    onChange={handleChange}
                    aria-label="Date of birth"
                />
            </div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email ?? ''}
                onChange={handleChange}
                aria-label="Email"
            />
            <input
                name="department"
                placeholder="Department"
                value={form.department ?? ''}
                onChange={handleChange}
                aria-label="Department"
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : submitLabel}
            </button>
            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}
        </form>
    )
}
