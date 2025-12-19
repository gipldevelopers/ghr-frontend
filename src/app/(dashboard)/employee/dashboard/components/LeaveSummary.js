"use client";

import React, { useState, useMemo } from "react";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from "date-fns";

export default function AttendanceCalendar() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const years = [currentYear, currentYear - 1, currentYear - 2];
  const months = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Dummy attendance data (half month)
  const attendanceData = useMemo(
    () => ({
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-02`]:
        "Late",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-03`]:
        "Absent",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-04`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-05`]: "WFH",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-06`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-07`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-08`]:
        "Late",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-09`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-10`]:
        "Late",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-11`]:
        "Absent",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-12`]: "WFH",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-13`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-14`]:
        "OnTime",
      [`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`]:
        "Absent",
    }),
    [currentMonth, currentYear]
  );

  const statusColors = {
    OnTime: "bg-green-200 text-green-800",
    Late: "bg-orange-200 text-orange-800",
    Absent: "bg-red-200 text-red-800",
    WFH: "bg-blue-200 text-blue-800",
    SickLeave: "bg-yellow-200 text-yellow-800",
  };

  const generateCalendar = () => {
    const monthStart = startOfMonth(new Date(selectedYear, selectedMonth));
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateStr = format(day, "yyyy-MM-dd");
        const status = attendanceData[dateStr] || null;

        days.push(
          <div
            key={day}
            className={`border h-12 flex items-center justify-center text-xs font-medium rounded-md ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400"
                : status
                ? statusColors[status]
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    // <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-100 dark:border-gray-700 h-full flex flex-col w-full">
  {/* rest of your content */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Employee Attendance
        </h3>

        <div className="flex gap-2 items-center">
          {/* Year Dropdown */}
          <select
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Month Dropdown */}
          <select
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-300"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((m) => {
              const isDisabled =
                parseInt(selectedYear) > currentYear ||
                (parseInt(selectedYear) === currentYear &&
                  m.value > currentMonth);
              return (
                <option
                  key={m.value}
                  value={m.value}
                  disabled={isDisabled}
                  className={
                    isDisabled ? "text-gray-400 dark:text-gray-500" : ""
                  }
                >
                  {m.name}
                </option>
              );
            })}
          </select>

          {/* View Details Button */}
          {/* View Details Button */}
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div>{generateCalendar()}</div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-sm">
  {/* Leave types legend on the left */}
  <div className="flex gap-4">
    {Object.entries(statusColors).map(([status, color]) => (
      <div key={status} className="flex items-center gap-1">
        <span className={`w-4 h-4 ${color} rounded-md`}></span>
        <span className="dark:text-white/70">{status}</span>
      </div>
    ))}
  </div>

  {/* View Details link on the right */}
  <button
    onClick={() =>
      (window.location.href =
        "http://localhost:3000/employee/attendance/leave-summery-details")
    }
    className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
  >
    View Details
  </button>
</div>

    </div>
  );
}
