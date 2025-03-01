import { Employee } from '@/domain/model/employee';

export class EmployeeDto {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly joinDate: string;
  public readonly status: string;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.email = employee.email;
    this.joinDate = employee.joinDate.toISOString();
    this.status = employee.status;
  }
}
