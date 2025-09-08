// src/app/(dashboard)/hr/attendance/reports/components/ReportFilters.js
"use client";
import { useState } from 'react';
import { DATE_RANGES, CHART_TYPES } from '@/types/attendanceReports';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

export default function ReportFilters({
  dateRange,
  onDateRangeChange,
  customDateRange,
  onCustomDateRangeChange,
  chartType,
  onChartTypeChange,
  filters,
  onFiltersChange
}) {
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);

  const dateRangeOptions = [
    { value: DATE_RANGES.TODAY, label: 'Today' },
    { value: DATE_RANGES.YESTERDAY, label: 'Yesterday' },
    { value: DATE_RANGES.THIS_WEEK, label: 'This Week' },
    { value: DATE_RANGES.LAST_WEEK, label: 'Last Week' },
    { value: DATE_RANGES.THIS_MONTH, label: 'This Month' },
    { value: DATE_RANGES.LAST_MONTH, label: 'Last Month' },
    { value: DATE_RANGES.CUSTOM, label: 'Custom Range' }
  ];

  const chartTypeOptions = [
    { value: CHART_TYPES.BAR, label: 'Bar Chart' },
    { value: CHART_TYPES.LINE, label: 'Line Chart' },
    { value: CHART_TYPES.PIE, label: 'Pie Chart' },
    { value: CHART_TYPES.TABLE, label: 'Data Table' }
  ];

  // Mock departments data - in real app, this would come from API
  const departments = [
    { id: '1', name: 'Human Resources' },
    { id: '2', name: 'Information Technology' },
    { id: '3', name: 'Finance' },
    { id: '4', name: 'Marketing' },
    { id: '5', name: 'Sales' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Report Filters
        </h3>
        
        {/* Date Range Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => {
              onDateRangeChange(e.target.value);
              setIsCustomDateOpen(e.target.value === DATE_RANGES.CUSTOM);
            }}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Date Range Picker */}
        {isCustomDateOpen && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <Flatpickr
                value={customDateRange.startDate}
                onChange={([date]) => onCustomDateRangeChange({
                  ...customDateRange,
                  startDate: date
                })}
                options={{ dateFormat: 'Y-m-d' }}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <Flatpickr
                value={customDateRange.endDate}
                onChange={([date]) => onCustomDateRangeChange({
                  ...customDateRange,
                  endDate: date
                })}
                options={{ dateFormat: 'Y-m-d' }}
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Chart Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {chartTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Departments
          </label>
          <select
            multiple
            value={filters.departments}
            onChange={(e) => onFiltersChange({
              ...filters,
              departments: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Hold Ctrl/Cmd to select multiple departments
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => {
            onDateRangeChange(DATE_RANGES.THIS_MONTH);
            onChartTypeChange(CHART_TYPES.BAR);
            onFiltersChange({
              departments: [],
              employees: [],
              locations: []
            });
          }}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          Reset Filters
        </button>
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}