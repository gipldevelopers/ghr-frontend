// src/app/(dashboard)/hr/employees/page.js
"use client";
import EmployeeTable from './components/EmployeesTable';
import EmployeeStatsCards from './components/EmployeeStatsCards';

export default function EmployeeDirectory() {
  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Directory</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and view all employees in your organization</p>
      </div> */}

      <EmployeeStatsCards />
      
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <EmployeeTable />
      </div>
    </div>
  );
}