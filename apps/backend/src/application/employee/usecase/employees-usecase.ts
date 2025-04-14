import { Employee } from '@/domain/model/employee';
import { IEmployeeRepository } from '@/domain/repository/employee';
import { EmployeeDto } from '..';
import { inject, injectable } from 'tsyringe';
type GetEmployeesCommand = Partial<Pick<Employee, 'status'>>;

@injectable()
export class EmployeesUsecase {
  constructor(@inject('EmployeeRepository') private repository: IEmployeeRepository) {}

  async getEmployees(command: GetEmployeesCommand) {
    const employees = await this.repository.findMany(command);

    return employees
      .map((employee) => {
        return employee ? new EmployeeDto(employee) : null;
      })
      .filter((employee) => !!employee);
  }
}
