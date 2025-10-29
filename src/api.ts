import axios from 'axios'
import type {Employee, EmployeeCreateDTO, Page} from './types'

export const api = axios.create({ baseURL: '/api' })

export const getEmployees = async (
    page = 0,
    size = 10,
    sortBy = 'id',
    sortDir: 'asc' | 'desc' = 'asc',
    q?: string
): Promise<Page<Employee>> => {
    const { data } = await api.get('/employees', { params: { page, size, sortBy, sortDir, q } })
    return data
}

export const createEmployee = async (payload: EmployeeCreateDTO): Promise<void> => {
    await api.post('/employees', payload)
}