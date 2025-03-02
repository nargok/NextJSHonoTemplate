'use client'

import { client } from '@/lib/hono';
import { useSuspenseQuery } from '@tanstack/react-query';
import { InferRequestType } from 'hono';

type EmployeeRoute = typeof client.api.employees

export const useGetEmployees = (
    query: InferRequestType<EmployeeRoute["$get"]>["query"]
) => {
    return useSuspenseQuery({
        queryKey: ["employees", query],
        queryFn: () => {
            return client.api.employees
            .$get({
                query,
            })
            .then((response) => response.json())
        }
    })
}