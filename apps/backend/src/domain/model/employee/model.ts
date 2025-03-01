type EmployeeStatus = "active" | "inactive";

export class Employee {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public joinDate: Date,
        public status: EmployeeStatus,
    ) {}

    public get isNew(): boolean {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return this.joinDate > thirtyDaysAgo;
    }
}