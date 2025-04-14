import { Context, Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { EmployeesUsecase } from '@/application/employee/usecase';
import { inject, injectable } from 'tsyringe';

const querySchema = z.object({
  status: z.union([z.literal('active'), z.literal('inactive')]).optional(),
});

type QuerySchema = z.infer<typeof querySchema>;

@injectable()
export class EmployeeController {
  constructor(@inject(EmployeesUsecase) private usecase: EmployeesUsecase) {}

  public getEmployeesHandler = [
    zValidator('query', querySchema),
    async (context: Context) => {
      try {
        const data = context.req.query() as QuerySchema;
        const employees = await this.usecase.getEmployees(data);
        return context.json(employees, 200);
      } catch (err) {
        console.error('Error in getEmployees', err);
        return context.json({ error: 'Failed to get employees' }, 500);
      }
    },
  ] as const;
}
