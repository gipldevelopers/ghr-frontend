// src/components/common/Breadcrumb.js
'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Configuration for breadcrumb labels
const breadcrumbConfig = {
  defaultTransform: (path) => {
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  
  specialPaths: {
    '': 'Home',
    'dashboard': 'Dashboard',
    'employee': 'Employee',
    'employees': 'Employees',
    'attendance': 'Attendance',
    'leave': 'Leave',
    'payslips': 'Payslips',
    'profile': 'Profile',
    'payroll': 'Payroll',
    'recruitment': 'Recruitment',
    'report': 'Reports',
    'department': 'Department',
    'designation': 'Designation',
    'new': 'Add New',
    'edit': 'Edit',
  },
  
  hiddenPaths: ['hr'],
  idPaths: ['id'],
};

const Breadcrumb = ({ customTitle }) => {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(path => path);
    
    // Filter out hidden paths
    const filteredPaths = paths.filter(path => 
      !breadcrumbConfig.hiddenPaths.includes(path)
    );
    
    const breadcrumbs = [];
    
    // Always add home as the first breadcrumb
    breadcrumbs.push({
      href: '/',
      label: <Home className="w-4 h-4" />,
      isCurrent: false
    });
    
    // Generate breadcrumbs from the path segments
    let accumulatedPath = '';
    for (let i = 0; i < filteredPaths.length; i++) {
      const path = filteredPaths[i];
      accumulatedPath += `/${path}`;
      
      let label;
      const isIdPath = !isNaN(path) && 
        (i > 0 && breadcrumbConfig.idPaths.includes(filteredPaths[i-1]));
      
      // Handle ID paths (like employee IDs)
      if (isIdPath) {
        // Check if we're on an edit page
        if (i < filteredPaths.length - 1 && filteredPaths[i+1] === 'edit') {
          label = 'Edit';
        } else {
          label = 'Details';
        }
      } 
      // Handle special paths
      else if (breadcrumbConfig.specialPaths[path]) {
        label = breadcrumbConfig.specialPaths[path];
      } 
      // Default transformation
      else {
        label = breadcrumbConfig.defaultTransform(path);
      }
      
      breadcrumbs.push({
        href: accumulatedPath,
        label: label,
        isCurrent: i === filteredPaths.length - 1
      });
    }
    
    // Special handling for employees listing page
    // If we're on /hr/employees, we need to add "Employee List" as the last breadcrumb
    if (filteredPaths.length === 1 && filteredPaths[0] === 'employees') {
      // Add "Employee List" as the final breadcrumb
      breadcrumbs.push({
        href: pathname,
        label: 'Employee List',
        isCurrent: true
      });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Determine page title
  let pageTitle;
  if (customTitle) {
    pageTitle = customTitle;
  } else if (breadcrumbs.length > 1) {
    pageTitle = breadcrumbs[breadcrumbs.length - 1].label;
    
    // Special handling for list pages
    const paths = pathname.split('/').filter(path => path);
    const lastPath = paths[paths.length - 1];
    
    if (!isNaN(lastPath) && paths.length > 1) {
      // This is a detail page (has an ID)
      const parentPath = paths[paths.length - 2];
      if (breadcrumbConfig.specialPaths[parentPath]) {
        pageTitle = breadcrumbConfig.specialPaths[parentPath] + ' Details';
      }
    } else if (lastPath === 'new') {
      pageTitle = 'Add New';
    } else if (lastPath === 'edit') {
      pageTitle = 'Edit';
    } else if (lastPath === 'employees') {
      pageTitle = 'Employee List';
    }
  } else {
    pageTitle = 'Dashboard';
  }
  
  return (
    <div className="my-auto mb-4">
      {/* Page Title */}
      <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white">
        {pageTitle}
      </h2>
      
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className="breadcrumb mb-0 flex flex-wrap items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li 
              key={index} 
              className={`breadcrumb-item flex items-center mr-0 ${breadcrumb.isCurrent ? 'active text-gray-600 dark:text-gray-400' : ''}`}
            >
              {breadcrumb.isCurrent ? (
                <span aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link 
                  href={breadcrumb.href} 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center"
                >
                  {breadcrumb.label}
                </Link>
              )}
              
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
