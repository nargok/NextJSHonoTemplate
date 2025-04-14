import { Context, Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { EmployeesUsecase } from '@/application/employee/usecase';
import { inject, injectable } from 'tsyringe';

const querySchema = z.object({
  status: z.union([z.literal('active'), z.literal('inactive')]).optional(),
});

@injectable()
export class EmployeeController {
  private app = new Hono();

  constructor(@inject(EmployeesUsecase) private usecase: EmployeesUsecase) {
    this.app.get('/', zValidator('query', querySchema), this.getEmployees.bind(this));
  }

  getRouter() {
    return this.app;
  }

  async getEmployees(context: Context) {
    try {
      const data = context.req.valid('query');
      console.log('data', data);
      const employees = await this.usecase.getEmployees(data);

      return context.json(employees, 200);
    } catch (err) {
      console.error('Error in getEmployees', err);
      return context.json({ error: 'Failed to get employees' }, 500);
    }
  }
}
