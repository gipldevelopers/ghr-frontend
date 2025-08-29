// import React from "react";
// import Link from "next/link";

// const StatsCard = ({ 
//   title, 
//   value, 
//   comparison, 
//   trend, 
//   icon, 
//   iconBgColor, 
//   href 
// }) => {
//   const trendColors = {
//     up: "text-green-600",
//     down: "text-red-600"
//   };

//   return (
//     <div className="card flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden">
//       <div className="card-body p-5 flex flex-col justify-between h-full">
//         <div className="flex items-start justify-between mb-4">
//           <div className={`avatar rounded-full p-3 ${iconBgColor} flex-shrink-0`}>
//             {icon}
//           </div>
//         </div>
        
//         <div>
//           <h6 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
//             {title}
//           </h6>
//           <div className="flex items-baseline justify-between">
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
//               {value}
//             </h3>
//             {comparison && (
//               <span className={`text-xs font-medium ${trendColors[trend]}`}>
//                 {trend === 'up' ? (
//                   <svg className="inline h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
//                   </svg>
//                 ) : (
//                   <svg className="inline h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
//                   </svg>
//                 )}
//                 {comparison}
//               </span>
//             )}
//           </div>
//         </div>
        
//         {href && (
//           <Link 
//             href={href} 
//             className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2 inline-block"
//           >
//             View Details
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatsCard;

import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  comparison, 
  trend, 
  icon, 
  iconBgColor, 
  href 
}) => {
  // Map your existing iconBgColor classes to the new gradient format
  const gradientMap = {
    "bg-blue-500": "bg-gradient-to-r from-blue-500 to-blue-400",
    "bg-gray-600": "bg-gradient-to-r from-gray-600 to-gray-500",
    "bg-blue-400": "bg-gradient-to-r from-blue-400 to-blue-300",
    "bg-pink-500": "bg-gradient-to-r from-pink-500 to-pink-400",
    "bg-purple-500": "bg-gradient-to-r from-purple-500 to-purple-400",
    "bg-red-500": "bg-gradient-to-r from-red-500 to-red-400",
    "bg-green-500": "bg-gradient-to-r from-green-500 to-green-400",
    "bg-gray-800": "bg-gradient-to-r from-gray-800 to-gray-700"
  };

  // Get the gradient class or use the original if not in map
  const gradientClass = gradientMap[iconBgColor] || iconBgColor;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col justify-between h-full">
        {/* Icon Row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`rounded-xl p-3 ${gradientClass} shadow-md flex-shrink-0`}>
            {icon}
          </div>
        </div>
        
        {/* Title and Value Row */}
        <div className="mb-3">
          <h6 className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-2">
            {title}
          </h6>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </h3>
        </div>
        
        {/* Comparison and Link Row */}
        <div className="flex items-center justify-between mt-auto">
          {comparison && (
            <div className="flex items-center">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center ${
                trend === 'up' 
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {comparison}
              </span>
            </div>
          )}
          
          {href && (
            <Link 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium ml-2"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;