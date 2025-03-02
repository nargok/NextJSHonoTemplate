'use client'

import { client } from '@/lib/hono';
import { useSuspenseQuery } from '@tanstack/react-query';
import { InferRequestType } from 'hono';
import { Employee } from '@/types/employee';

type EmployeeRoute = typeof client.api.employees

export const useGetEmployees = (
    query: InferRequestType<EmployeeRoute["$get"]>["query"]
) => {
    return useSuspenseQuery<Employee[]>({
        queryKey: ["employees", query],
        queryFn: async () => {
            const response = await client.api.employees
                .$get({
                    query,
                })
            const data = await response.json();
            return data as Employee[];
        }
    })
}