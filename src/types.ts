export interface Employee {
    id: number
    firstName: string
    lastName?: string
    dateOfBirth?: string
    email?: string
    department?: string
}

export interface EmployeeCreateDTO {
    firstName: string
    lastName?: string
    dateOfBirth?: string
    email?: string
    department?: string
}
export interface Page<T> {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
    size: number
}