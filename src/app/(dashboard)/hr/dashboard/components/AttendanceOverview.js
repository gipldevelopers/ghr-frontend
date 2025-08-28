"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const chartData = {
    labels: ["Late", "Present", "Permission", "Absent"],
    datasets: [
      {
        data: [21, 59, 2, 15],
        backgroundColor: ["#0f4a63", "#10b981", "#facc15", "#ef4444"],
        borderWidth: 0,       // remove inner white borders
        borderRadius: 8,      // rounded edges
        spacing: 6,           // spacing between segments
        hoverOffset: 12,      // arc pops out on hover
        cutout: "70%",        // thickness of donut
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180, // makes it semi-circle gauge style
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  const absentEmployees = [
    "/images/users/user-05.jpg",
    "/images/users/user-06.jpg",
    "/images/users/user-07.jpg",
    "/images/users/user-08.jpg",
    "/images/users/user-09.jpg",
  ];

  const periodOptions = ["Today", "This Week", "This Month"];

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white">
          Attendance Overview
        </h5>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center px-3 py-1 text-sm font-medium border rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="mr-2">{selectedPeriod}</span>
            <svg
              className={`h-4 w-4 transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-20">
              {periodOptions.map((period) => (
                <button
                  key={period}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedPeriod === period
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => handlePeriodSelect(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Chart */}
        <div className="relative mb-6" style={{ height: "180px" }}>
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Attendance</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">120</h3>
          </div>
        </div>

        {/* Status List */}
        <div className="space-y-2 mb-5">
          {[
            { label: "present", color: "bg-green-500", value: "59%" },
            { label: "Late", color: "bg-[#0f4a63]", value: "21%" },
            { label: "Permission", color: "bg-yellow-500", value: "2%" },
            { label: "Absent", color: "bg-red-500", value: "15%" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
                {item.label}
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Absent Employees */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
  <div className="flex items-center">
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
      Total Absentees
    </p>
    <div className="flex -space-x-2">
      {absentEmployees.slice(0, 4).map((avatar, index) => (
        <div
          key={index}
          className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden 
                   transition-all duration-200 hover:z-10 hover:-translate-y-1"
        >
          <img
            src={avatar}
            alt={`Employee ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {absentEmployees.length > 4 && (
        <div className="relative group">
          <div
            className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 
                     bg-blue-500 text-white text-xs flex items-center justify-center 
                     cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg"
          >
            +{absentEmployees.length - 4}
          </div>
          
          {/* Tooltip on hover */}
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap 
                     bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200 pointer-events-none"
          >
            {absentEmployees.length - 4} more absentees
          </div>
        </div>
      )}
    </div>
  </div>
  <Link
    href="/hr/leaves"
    className="text-sm font-medium text-orange-500 hover:underline"
  >
    View Details
  </Link>
</div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
