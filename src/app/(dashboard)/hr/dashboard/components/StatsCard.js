import React from "react";
import Link from "next/link";

const StatsCard = ({ 
  title, 
  value, 
  comparison, 
  trend, 
  icon, 
  iconBgColor, 
  href 
}) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600"
  };

  return (
    <div className="card flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden">
      <div className="card-body p-5 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`avatar rounded-full p-3 ${iconBgColor} flex-shrink-0`}>
            {icon}
          </div>
        </div>
        
        <div>
          <h6 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {title}
          </h6>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {value}
            </h3>
            {comparison && (
              <span className={`text-xs font-medium ${trendColors[trend]}`}>
                {trend === 'up' ? (
                  <svg className="inline h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="inline h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                )}
                {comparison}
              </span>
            )}
          </div>
        </div>
        
        {href && (
          <Link 
            href={href} 
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2 inline-block"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default StatsCard;