'use client'

import { useGetEmployees } from "@/hooks/employee";
import { Suspense } from "react";

const EmployeeListPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
)

const Component = () => {
    const { data: employees } = useGetEmployees({
        status: undefined,
    })

    return (
        <ul>
            {employees.map((employee, index) => (
                <li key={index}>
                    {employee.name}
                </li>
            ))}
        </ul>
    )
}

export default EmployeeListPage;