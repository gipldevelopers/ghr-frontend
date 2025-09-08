// src/app/(dashboard)/hr/employees/components/EmployeeTable.js
"use client";
import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Eye, Edit, Trash2 } from 'lucide-react';
import Pagination from '@/components/common/Pagination';
import EmployeeFilters from './EmployeeFilters';

// Mock data for employees with image paths
 const defaultData = [
  {
    id: 'Emp-010',
    name: 'Lori Broaddus',
    email: 'broaddus@example.com',
    phone: '(168) 8392 823',
    designation: 'Finance Manager',
    joiningDate: '17 Dec 2024',
    status: 'Active',
    image: '/images/users/user-01.png',
  },
  {
    id: 'Emp-011',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(168) 8392 824',
    designation: 'Software Engineer',
    joiningDate: '15 Jan 2024',
    status: 'Active',
    image: '/images/users/user-02.png',
  },
  {
    id: 'Emp-012',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(168) 8392 825',
    designation: 'HR Specialist',
    joiningDate: '22 Feb 2024',
    status: 'Active',
    image: '/images/users/user-03.png',
  },
  {
    id: 'Emp-013',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '(168) 8392 826',
    designation: 'Product Manager',
    joiningDate: '05 Mar 2024',
    status: 'On Leave',
    image: '/images/users/user-04.png',
  },
  {
    id: 'Emp-014',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '(168) 8392 827',
    designation: 'UX Designer',
    joiningDate: '18 Apr 2024',
    status: 'Active',
    image: '/images/users/user-05.jpg',
  },
  {
    id: 'Emp-015',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '(168) 8392 828',
    designation: 'Data Analyst',
    joiningDate: '30 May 2024',
    status: 'Active',
    image: '/images/users/user-06.jpg',
  },
  {
    id: 'Emp-016',
    name: 'Jennifer Lee',
    email: 'jennifer.l@example.com',
    phone: '(168) 8392 829',
    designation: 'Marketing Manager',
    joiningDate: '12 Jun 2024',
    status: 'Inactive',
    image: '/images/users/user-07.jpg',
  },
  {
    id: 'Emp-017',
    name: 'David Miller',
    email: 'david.m@example.com',
    phone: '(168) 8392 830',
    designation: 'Sales Executive',
    joiningDate: '25 Jul 2024',
    status: 'Active',
    image: '/images/users/user-08.jpg',
  },
  {
    id: 'Emp-018',
    name: 'Amanda Taylor',
    email: 'amanda.t@example.com',
    phone: '(168) 8392 831',
    designation: 'Quality Assurance',
    joiningDate: '08 Aug 2024',
    status: 'Active',
    image: '/images/users/user-09.jpg',
  },
  {
    id: 'Emp-019',
    name: 'Christopher Anderson',
    email: 'chris.a@example.com',
    phone: '(168) 8392 832',
    designation: 'DevOps Engineer',
    joiningDate: '19 Sep 2024',
    status: 'Active',
    image: '/images/users/user-10.jpg',
  },
  {
    id: 'Emp-020',
    name: 'Jessica Martinez',
    email: 'jessica.m@example.com',
    phone: '(168) 8392 833',
    designation: 'Business Analyst',
    joiningDate: '03 Oct 2024',
    status: 'On Leave',
    image: '/images/users/user-11.jpg',
  },
  {
    id: 'Emp-021',
    name: 'Daniel Thomas',
    email: 'daniel.t@example.com',
    phone: '(168) 8392 834',
    designation: 'Technical Lead',
    joiningDate: '14 Nov 2024',
    status: 'Active',
    image: '/images/users/user-12.jpg',
  },
];

export default function EmployeeTable() {
  const [data, setData] = useState(defaultData);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [designationFilter, setDesignationFilter] = useState('all');
  // const [departmentFilter, setDepartmentFilter] = useState('all');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Emp ID',
        cell: info => <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{info.getValue()}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: info => (
          <div className="flex items-center">
            <img 
              src={info.row.original.image} 
              alt={info.getValue()}
              className="w-8 h-8 rounded-full mr-3 object-cover"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
      },
      {
        accessorKey: 'designation',
        header: 'Designation',
        cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
      },
      {
        accessorKey: 'joiningDate',
        header: 'Joining Date',
        cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          let statusClass = '';
          if (status === 'Active') {
            statusClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
          } else if (status === 'On Leave') {
            statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
          } else {
            statusClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
          }
          return (
            <span className={`px-2.5 py-0.5 rounded-xs text-xs font-medium ${statusClass}`}>
              {status}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <div className="flex items-center gap-3">
            <button
              onMouseEnter={() => setHoveredAction(`${info.row.id}-view`)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleView(info.row.original)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 group relative"
              title="View"
            >
              <Eye className="w-4 h-4" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                View
              </span>
            </button>
            <button
              onMouseEnter={() => setHoveredAction(`${info.row.id}-edit`)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleEdit(info.row.original)}
              className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 group relative"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Edit
              </span>
            </button>
            <button
              onMouseEnter={() => setHoveredAction(`${info.row.id}-delete`)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleDelete(info.row.original)}
              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 group relative"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Delete
              </span>
            </button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    []
  );

    // Apply all filters and return filtered data
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply global search filter
    if (globalFilter) {
      const searchTerm = globalFilter.toLowerCase();
      result = result.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.phone.toLowerCase().includes(searchTerm) ||
        employee.designation.toLowerCase().includes(searchTerm) ||
        // employee.department.toLowerCase().includes(searchTerm) ||
        employee.id.toLowerCase().includes(searchTerm)
      );
    }
     // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(employee => employee.status === statusFilter);
    }
    
    // Apply designation filter
    if (designationFilter !== 'all') {
      result = result.filter(employee => employee.designation === designationFilter);
    }
    
    // Apply department filter
    // if (departmentFilter !== 'all') {
    //   result = result.filter(employee => employee.department === departmentFilter);
    // }
    
    return result;
  }, [data, globalFilter, statusFilter, designationFilter, 
    // departmentFilter
  ]);

  const table = useReactTable({
    data: filteredData, // Use filtered data instead of original data
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
  });
 // Get unique values for filter dropdowns
  const statuses = useMemo(() => {
    const uniqueStatuses = new Set(data.map(emp => emp.status));
    return ['all', ...Array.from(uniqueStatuses)];
  }, [data]);

  const designations = useMemo(() => {
    const uniqueDesignations = new Set(data.map(emp => emp.designation));
    return ['all', ...Array.from(uniqueDesignations)];
  }, [data]);

  // const departments = useMemo(() => {
  //   const uniqueDepartments = new Set(data.map(emp => emp.department));
  //   return ['all', ...Array.from(uniqueDepartments)];
  // }, [data]);

 // Clear all filters
  const clearFilters = () => {
    setStatusFilter('all');
    setDesignationFilter('all');
    // setDepartmentFilter('all');
    setGlobalFilter('');
  };

   // Handle actions
  const handleView = (employee) => console.log('View employee:', employee);
  const handleEdit = (employee) => console.log('Edit employee:', employee);
  const handleDelete = (employee) => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setData(data.filter(emp => emp.id !== employee.id));
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Filters Section */}
      <div className="mb-6">
        <EmployeeFilters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          designationFilter={designationFilter}
          setDesignationFilter={setDesignationFilter}
          // departmentFilter={departmentFilter}
          // setDepartmentFilter={setDepartmentFilter}
          statuses={statuses}
          designations={designations}
          // departments={departments}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredData.length} of {defaultData.length} employees
        {(statusFilter !== 'all' || designationFilter !== 'all' || globalFilter) && (
          <span> (filtered)</span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="min-w-[800px] md:min-w-full">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-700">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-3 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300"
                      {...(header.column.getCanSort() ? {
                        onClick: header.column.getToggleSortingHandler(),
                        className: "px-3 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150"
                      } : {})}
                    >
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {{
                              asc: <ChevronUp className="ml-1 w-4 h-4 text-blue-500" />,
                              desc: <ChevronDown className="ml-1 w-4 h-4 text-blue-500" />,
                            }[header.column.getIsSorted()] ?? (
                              <div className="ml-1 flex flex-col">
                                <ChevronUp className="w-3 h-3 -mb-0.5 text-gray-400" />
                                <ChevronDown className="w-3 h-3 -mt-0.5 text-gray-400" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-2 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">
                    No employees found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalItems={filteredData.length}
        itemsPerPage={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onItemsPerPageChange={(size) => {
          table.setPageSize(size);
          table.setPageIndex(0);
        }}
        className="mt-6"
      />
    </div>
  );
}