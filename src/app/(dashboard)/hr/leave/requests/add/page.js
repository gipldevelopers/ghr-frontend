"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/common/Breadcrumb';
import LeaveRequestForm from '../../components/LeaveRequestForm';

export default function AddLeaveRequest() {
  const router = useRouter();

  const handleSave = (formData) => {
    // Here you would typically send the data to your API
    console.log('Saving leave request:', formData);
    
    // For now, just redirect back to the leave requests page
    router.push('/hr/leave/requests');
  };

  const handleCancel = () => {
    router.push('/hr/leave/requests');
  };

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 p-6">
      <Breadcrumb
        pages={[
          { name: 'HR', href: '/hr' },
          { name: 'Leave', href: '/hr/leave' },
          { name: 'Requests', href: '/hr/leave/requests' },
          { name: 'Add Leave Request', href: '#' },
        ]}
      />
      
      <div className="mt-6">
        <LeaveRequestForm 
          isEditMode={false}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}