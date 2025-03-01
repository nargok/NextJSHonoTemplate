import { Employee } from '@/domain/model/employee';
import { IEmployeeRepository } from '@/domain/repository/employee';
import { EmployeeDto } from '..';

type GetEmployeesCommand = Partial<Pick<Employee, 'status'>>;

export class GetEmployeesUsecase {
  constructor(private repository: IEmployeeRepository) {}

  async execute(command: GetEmployeesCommand) {
    const employees = await this.repository.findMany(command);

    return employees
      .map((employee) => {
        return employee ? new EmployeeDto(employee) : null;
      })
      .filter((employee) => !!employee);
  }
}
