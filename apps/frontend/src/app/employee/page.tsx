'use client'

import { useGetEmployees } from "@/hooks/employee";
import { Employee, EmployeeStatus } from "@/types/employee";
import { Suspense, useState } from "react";

const EmployeeListPage = () => (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">従業員一覧</h1>
        <Suspense fallback={<div className="p-4 text-center">データを読み込み中...</div>}>
            <Component />
        </Suspense>
    </div>
)

const Component = () => {
    const [statusFilter, setStatusFilter] = useState<EmployeeStatus | undefined>(undefined);
    
    const { data: employees } = useGetEmployees({
        status: statusFilter,
    });

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <button 
                    className={`px-3 py-1 rounded ${statusFilter === undefined ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setStatusFilter(undefined)}
                >
                    すべて
                </button>
                <button 
                    className={`px-3 py-1 rounded ${statusFilter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setStatusFilter('active')}
                >
                    在籍中
                </button>
                <button 
                    className={`px-3 py-1 rounded ${statusFilter === 'inactive' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setStatusFilter('inactive')}
                >
                    退職済み
                </button>
            </div>
            
            <div className="bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メール</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">入社日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map((employee: Employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.joinDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {employee.status === 'active' ? '在籍中' : '退職済み'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    従業員が見つかりません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeListPage;