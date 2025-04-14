import { container } from 'tsyringe';
import { EmployeeRepository } from '@/infrastructure/employee';
import { IEmployeeRepository } from '@/domain/repository/employee';
import { EmployeesUsecase } from '@/application/employee';
import { EmployeeController } from '@/presentation/routes/employee';

container.registerSingleton<IEmployeeRepository>('EmployeeRepository', EmployeeRepository);
container.registerSingleton(EmployeesUsecase);
container.registerSingleton(EmployeeController);

export { container };
