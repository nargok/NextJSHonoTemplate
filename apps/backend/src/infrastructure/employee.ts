import { Employee } from '@/domain/model/employee';
import { IEmployeeRepository } from '@/domain/repository/employee';

export class EmployeeRepository implements IEmployeeRepository {
  findMany = async ({ status }: Partial<Pick<Employee, 'status'>>) => {
    const mockEmployees: Employee[] = [
      new Employee(1, 'John Doe', 'john@example.com', new Date('2024-01-15'), 'active'),
      new Employee(2, 'Jane Smith', 'jane@example.com', new Date('2023-12-01'), 'active'),
      new Employee(3, 'Bob Wilson', 'bob@example.com', new Date('2023-06-15'), 'inactive'),
    ];

    if (status) {
      return mockEmployees.filter((employee) => employee.status === status);
    }

    return mockEmployees;
  };
}
