import React from "react";

export default function LeaveTypes() {
  const leaveTypes = [
    {
      name: "Casual Leave",
      value: "12 days",
      description: "Annual entitlement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
          viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
        </svg>
      ),
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-400",
      cardBg: "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900",
    },
    {
      name: "Sick Leave",
      value: "15 days",
      description: "Medical needs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
          viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"></path>
        </svg>
      ),
      iconBg: "bg-gradient-to-r from-green-500 to-green-400",
      cardBg: "bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900",
    },
    {
      name: "Paid Leave",
      value: "21 days",
      description: "With full pay",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
          viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
        </svg>
      ),
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-400",
      cardBg: "bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900",
    },
    {
      name: "Maternity Leave",
      value: "180 days",
      description: "For new mothers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
          viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2   0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"></path>
        </svg>
      ),
      iconBg: "bg-gradient-to-r from-pink-500 to-pink-400",
      cardBg: "bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900",
    },
    {
      name: "Paternity Leave",
      value: "30 days",
      description: "For new fathers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
          viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"></path>
        </svg>
      ),
      iconBg: "bg-gradient-to-r from-indigo-500 to-indigo-400",
      cardBg: "bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Leave Types
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {leaveTypes.map((leave, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 md:p-6 cursor-pointer ${leave.cardBg} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex items-center">
              <div className={`${leave.iconBg} rounded-lg sm:rounded-xl p-2 sm:p-3 mr-3 sm:mr-4 shadow-md`}>
                {leave.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1 uppercase tracking-wide truncate">
                  {leave.name}
                </p>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white truncate">
                  {leave.value}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                  {leave.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
