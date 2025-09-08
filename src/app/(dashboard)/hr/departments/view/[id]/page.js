"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import DepartmentStats from '../../components/DepartmentStats';
import DepartmentHeader from '../../components/view/DepartmentHeader';
import DepartmentInfoCard from '../../components/view/DepartmentInfoCard';
import RecentActivityCard from '../../components/view/RecentActivityCard';
import TeamSizeCard from '../../components/view/TeamSizeCard';
import QuickActionsCard from '../../components/view/QuickActionsCard';

// Mock function to fetch department data - replace with actual API call
const getDepartmentData = (id) => {
  const departments = [
    {
      id: 1,
      name: 'Human Resources',
      headOfDepartment: 'Sarah Johnson',
      phone: '(168) 8392 825',
      email: 'hr@company.com',
      employeeCount: 12,
      status: 'Active',
      establishedDate: '2020-01-15',
      description: 'Handles recruitment, employee relations, benefits administration, and training programs.',
      recentActivity: [
        { action: 'Hired', person: 'John Doe', date: '2023-10-15' },
        { action: 'Promoted', person: 'Jane Smith', date: '2023-10-10' }
      ]
    },
    // Include all other departments from your table data
    // ...
  ];
  return departments.find(dept => dept.id === parseInt(id));
};

export default function DepartmentViewPage() {
  const params = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from your API
        const data = getDepartmentData(params.id);
        setDepartment(data);
      } catch (error) {
        console.error('Error fetching department:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center dark:bg-gray-800">
          <div className="animate-pulse">Loading department data...</div>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">Department not found</p>
          <button 
            onClick={() => router.push('/hr/departments')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Departments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb />
      
      <div className='bg-white rounded-lg shadow dark:bg-gray-800'>
        <div className="p-4 sm:p-6">
          {/* Header with back button */}
          <DepartmentHeader department={department} />

          {/* Stats Cards */}
          <DepartmentStats department={department} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column - Department Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information Card */}
              <DepartmentInfoCard department={department} />

              {/* Recent Activity Card */}
              <RecentActivityCard recentActivity={department.recentActivity} />
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Employee Count Card */}
              <TeamSizeCard employeeCount={department.employeeCount} />

              {/* Quick Actions Card */}
              <QuickActionsCard departmentId={department.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}