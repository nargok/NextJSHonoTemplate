export type EmployeeStatus = 'active' | 'inactive';

export interface Employee {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: EmployeeStatus;
} 