import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";

const holidays = [
  { date: "14-Jan-2025", name: "Makar Sankranti" },
  { date: "15-Jan-2025", name: "Makar Sankranti" },
  { date: "26-Feb-2025", name: "Maha Shivaratri" },
  { date: "14-Mar-2025", name: "Holi" },
  { date: "27-Jun-2025", name: "Rath Yatra" },
  { date: "15-Aug-2025", name: "Independence Day / Janmastami" },
  { date: "27-Aug-2025", name: "Ganesh Chaturthi" },
  { date: "02-Oct-2025", name: "Gandhi Jayanti / Dussehra" },
  { date: "20-Oct-2025", name: "Diwali" },
  { date: "21-Oct-2025", name: "Diwali" },
];

export default function HolidayPage() {
  return (
    <div className="">
      <Breadcrumb
        title="Holiday"
        subtitle="Check upcoming holidays for 2025"
      />

      {/* Table Card */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6">
        <table className="w-full border border-gray-300 dark:border-gray-700">
          {/* Title Row inside table */}
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th
                colSpan={2}
                className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-gray-100 text-left border-b border-gray-300 dark:border-gray-600"
              >
                Holiday List – 2025
              </th>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 text-left border border-gray-300 dark:border-gray-600">
                Holiday Date
              </th>
              <th className="px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 text-left border border-gray-300 dark:border-gray-600">
                Holiday Name
              </th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                  {holiday.date}
                </td>
                <td className="px-6 py-3 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                  {holiday.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
