import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { GetEmployeesUsecase } from '@/application/employee/usecase';
import { EmployeeRepository } from '@/infrastructure/employee';

export const employees = new Hono().get(
  '/employees',
  zValidator(
    'query',
    z.object({
      status: z.union([z.literal('active'), z.literal('inactive')]).optional(),
    }),
  ),
  async (context) => {
    const data = context.req.valid('query');
    const usecase = new GetEmployeesUsecase(new EmployeeRepository());
    const employees = await usecase.execute(data);

    return context.json(employees, 200);
  },
);
