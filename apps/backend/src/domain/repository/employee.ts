import { Employee } from '../model/employee';

export interface IEmployeeRepository {
  findMany: ({ status }: Partial<Pick<Employee, 'status'>>) => Promise<Employee[]>;
}
