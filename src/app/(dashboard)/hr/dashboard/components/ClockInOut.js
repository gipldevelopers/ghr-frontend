"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Circle } from 'lucide-react';

const ClockInOut = () => {
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [dateFilter, setDateFilter] = useState('Today');
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const deptDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  // Sample data - in a real app, this would come from your API
  const employees = [
    {
      id: 1,
      name: 'Daniel Esbella',
      position: 'UI/UX Designer',
      avatar: '/images/users/user-10.jpg',
      status: 'on-time',
      time: '09:15',
      clockIn: '09:15 AM',
      clockOut: '06:30 PM',
      production: '09:15 Hrs',
      timestamp: '2023-10-15T09:15:00'
    },
    {
      id: 2,
      name: 'Doglas Martini',
      position: 'Project Manager',
      avatar: '/images/users/user-05.jpg',
      status: 'on-time',
      time: '09:36',
      clockIn: '09:36 AM',
      clockOut: '06:45 PM',
      production: '09:09 Hrs',
      timestamp: '2023-10-15T09:36:00'
    },
    {
      id: 3,
      name: 'Brian Villalobos',
      position: 'PHP Developer',
      avatar: '/images/users/user-06.jpg',
      status: 'on-time',
      time: '09:15',
      clockIn: '10:30 AM',
      clockOut: '09:45 AM',
      production: '09:21 Hrs',
      timestamp: '2023-10-15T09:15:00'
    },
    {
      id: 4,
      name: 'Anthony Lewis',
      position: 'Marketing Head',
      avatar: '/images/users/user-07.jpg',
      status: 'late',
      lateBy: '30 Min',
      time: '08:35',
      clockIn: '08:35 AM',
      clockOut: '05:30 PM',
      production: '08:55 Hrs',
      timestamp: '2023-10-15T08:35:00'
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      position: 'HR Manager',
      avatar: '/images/users/user-08.jpg',
      status: 'on-time',
      time: '09:05',
      clockIn: '09:05 AM',
      clockOut: '05:30 PM',
      production: '08:25 Hrs',
      timestamp: '2023-10-15T09:05:00'
    },
    {
      id: 6,
      name: 'Michael Chen',
      position: 'Frontend Developer',
      avatar: '/images/users/user-09.jpg',
      status: 'late',
      lateBy: '15 Min',
      time: '08:50',
      clockIn: '08:50 AM',
      clockOut: '06:00 PM',
      production: '09:10 Hrs',
      timestamp: '2023-10-15T08:50:00'
    }
  ];

  const departmentOptions = ['All Departments', 'Finance', 'Development', 'Marketing'];
  const dateOptions = ['Today', 'This Week', 'This Month'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target)) {
        setIsDeptDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeptSelect = (dept) => {
    setDepartmentFilter(dept);
    setIsDeptDropdownOpen(false);
  };

  const handleDateSelect = (date) => {
    setDateFilter(date);
    setIsDateDropdownOpen(false);
  };

  // Filter employees who are not late (for the main list)
  const onTimeEmployees = employees
    .filter(employee => employee.status !== 'late')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3);
  
  // Filter only late employees (for the Late section)
  const lateEmployees = employees
    .filter(employee => employee.status === 'late')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-5 h-full">
      {/* Header - Updated to match your design */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-700">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white">
          Clock-In/Out
        </h5>

        <div className="flex items-center space-x-2">
          {/* Department Dropdown */}
          <div className="dropdown relative" ref={deptDropdownRef}>
  <button
    className="btn btn-white border border-gray-200 dark:border-gray-600 text-xs py-1 px-2 rounded-lg inline-flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
    onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
  >
    <svg
      className="h-3 w-3 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    {departmentFilter}
    <svg 
      className="h-3 w-3 ml-1 transition-transform" 
      style={{ transform: isDeptDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {/* Dropdown menu */}
  {isDeptDropdownOpen && (
    <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
      {departmentOptions.map((dept) => (
        <button
          key={dept}
          className={`block w-full text-left px-4 py-2 text-xs ${
            departmentFilter === dept
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleDeptSelect(dept)}
        >
          {dept}
        </button>
      ))}
    </div>
  )}
</div>

          {/* Date Dropdown */}
          <div className="dropdown relative" ref={dateDropdownRef}>
            <button
              className="btn btn-white border border-gray-200 dark:border-gray-600 text-xs py-1 px-2 rounded-lg inline-flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              <svg
                className="h-3 w-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateFilter}
              <svg 
                className="h-3 w-3 ml-1 transition-transform" 
                style={{ transform: isDateDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                {dateOptions.map((date) => (
                  <button
                    key={date}
                    className={`block w-full text-left px-4 py-2 text-xs ${
                      dateFilter === date
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Show only recent on-time employees in the main list */}
        {onTimeEmployees.map((employee) => (
          <div
            key={employee.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                    {employee.name}
                  </h6>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{employee.position}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2">
                  <Clock size={16} />
                </button>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Circle size={10} className="mr-1 fill-current" />
                  {employee.time}
                </span>
              </div>
            </div>

            {/* Additional details for specific employees if needed */}
            {employee.id === 3 && (
              <div className="grid grid-cols-3 gap-2 mt-3 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Circle size={10} className="mr-1 text-green-500 fill-current" />
                    Clock in
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.clockIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Circle size={10} className="mr-1 text-red-500 fill-current" />
                    Clock Out
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.clockOut}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Circle size={10} className="mr-1 text-yellow-500 fill-current" />
                    Production
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.production}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Only show Late section if there are late employees */}
      {lateEmployees.length > 0 && (
        <>
          <h6 className="mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">Late</h6>
          
          {/* Show only recent late employees in the Late section */}
          {lateEmployees.map((employee) => (
            <div
              key={employee.id}
              className="p-3 rounded-lg border border-dashed border-orange-200 dark:border-orange-800 mb-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                    <Image
                      src={employee.avatar}
                      alt={employee.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                      {employee.name}
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        <Clock size={12} className="mr-1" />
                        {employee.lateBy}
                      </span>
                    </h6>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{employee.position}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2">
                    <Clock size={16} />
                  </button>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <Circle size={10} className="mr-1 fill-current" />
                    {employee.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      <Link 
        href="/hr/attendance" 
        className="block w-full mt-4 px-4 py-2 text-sm font-medium text-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
      >
        View All Attendance
      </Link>
    </div>
  );
};

export default ClockInOut;