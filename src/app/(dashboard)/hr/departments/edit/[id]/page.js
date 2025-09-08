// src/app/(dashboard)/hr/departments/edit/[id]/page.js
"use client";
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import DepartmentForm from '../../components/DepartmentForm';

// This would typically fetch the department data from an API
const getDepartmentData = (id) => {
  // Mock data - replace with actual API call
  const departments = [
    {
      id: 1,
      name: 'Human Resources',
      headOfDepartment: 'Sarah Johnson',
      phone: '(168) 8392 825',
      email: 'hr@company.com',
      employeeCount: 12,
      status: 'Active',
    },
    // ... other departments
  ];
  return departments.find(dept => dept.id === parseInt(id));
};

export default function EditDepartmentPage() {
  const params = useParams();
  const department = getDepartmentData(params.id);

//   if (!department) {
//     return (
//       <div className="bg-gray-50 min-h-screen dark:bg-gray-900 p-6">
//         <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 text-center">
//           <p className="text-gray-600 dark:text-gray-400">Department not found</p>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <DepartmentForm department={department} isEdit={true} />
      </div>
    </div>
  );
}