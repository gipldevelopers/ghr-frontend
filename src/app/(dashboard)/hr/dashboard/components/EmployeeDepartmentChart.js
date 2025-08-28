"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EmployeeDepartmentChart = () => {
  // Sample employee data for different time periods
  const dataByPeriod = {
    "thisWeek": [
      { department: "UI/UX", employees: 80 },
      { department: "Development", employees: 110 },
      { department: "Management", employees: 75 },
      { department: "HR", employees: 20 },
      { department: "Testing", employees: 60 },
      { department: "Marketing", employees: 100 },
    ],
    "lastWeek": [
      { department: "UI/UX", employees: 75 },
      { department: "Development", employees: 105 },
      { department: "Management", employees: 70 },
      { department: "HR", employees: 18 },
      { department: "Testing", employees: 55 },
      { department: "Marketing", employees: 95 },
    ],
    "thisMonth": [
      { department: "UI/UX", employees: 85 },
      { department: "Development", employees: 115 },
      { department: "Management", employees: 80 },
      { department: "HR", employees: 22 },
      { department: "Testing", employees: 65 },
      { department: "Marketing", employees: 105 },
    ]
  };

  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);
  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State for selected time period
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  
  // Ref for dropdown container
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle period selection
  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  // Get display text for selected period
  const getDisplayText = (period) => {
    switch(period) {
      case "thisWeek": return "This Week";
      case "lastWeek": return "Last Week";
      case "thisMonth": return "This Month";
      default: return "This Week";
    }
  };

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden w-full">
      {/* Header */}
      <div className="card-header px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white">
          Employees By Department
        </h5>
        
        {/* Dropdown for time period selection */}
        <div className="dropdown relative" ref={dropdownRef}>
          <button 
            className="btn btn-white border border-gray-200 dark:border-gray-600 text-xs py-1 px-2 rounded-lg inline-flex items-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
            {getDisplayText(selectedPeriod)}
            <svg 
              className="h-3 w-3 ml-1 transition-transform" 
              style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 text-xs ${selectedPeriod === "thisWeek" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                onClick={() => handlePeriodSelect("thisWeek")}
              >
                This Week
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-xs ${selectedPeriod === "lastWeek" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                onClick={() => handlePeriodSelect("lastWeek")}
              >
                Last Week
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-xs ${selectedPeriod === "thisMonth" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
                onClick={() => handlePeriodSelect("thisMonth")}
              >
                This Month
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="card-body p-4">
        <div className="h-64 sm:h-72 md:h-80"> {/* Responsive height */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataByPeriod[selectedPeriod]}
              layout={isMobile ? "horizontal" : "vertical"} // Change layout on mobile
              margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              {isMobile ? (
                <>
                  <XAxis 
                    type="category" 
                    dataKey="department" 
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    type="number" 
                    tick={{ fontSize: 10 }}
                  />
                </>
              ) : (
                <>
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="department" 
                    tick={{ fontSize: 11 }}
                    width={80}
                    axisLine={false}
                  />
                </>
              )}
              <Tooltip 
                contentStyle={{ 
                  fontSize: '12px',
                  borderRadius: '6px',
                  padding: '6px 10px'
                }} 
              />
              <Bar 
                dataKey="employees" 
                fill="#f97316" 
                barSize={20}
                radius={[4, 4, 4, 4]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="w-2 h-2 bg-orange-500 rounded-full inline-block mr-1"></span>
          No of Employees increased by{" "}
          <span className="text-green-600 font-medium">+20%</span> from last Week
        </p>
      </div>
    </div>
  );
};

export default EmployeeDepartmentChart;