"use client";

import React, { useState, useRef } from "react";
import { User, Calendar, Briefcase } from "lucide-react";

export default function UpcomingWorkAnniversaries() {
  const anniversaries = [
    { 
      name: "Alice Johnson", 
      date: "July 15, 2024", 
      department: "Engineering",
      years: "3 years"
    },
    { 
      name: "Mark Smith", 
      date: "July 20, 2024", 
      department: "Marketing",
      years: "5 years"
    },
    { 
      name: "Sophia Lee", 
      date: "July 25, 2024", 
      department: "HR",
      years: "2 years"
    },
    { 
      name: "James Brown", 
      date: "July 30, 2024", 
      department: "Finance",
      years: "4 years"
    },
    { 
      name: "Emily Davis", 
      date: "August 5, 2024", 
      department: "Design",
      years: "1 year"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Get the three anniversaries to display
  const getVisibleAnniversaries = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % anniversaries.length;
      visible.push(anniversaries[index]);
    }
    return visible;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + anniversaries.length) % anniversaries.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % anniversaries.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 dark:from-purple-800 dark:to-purple-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Work Anniversaries</h2>
          <div className="flex space-x-1">
            {anniversaries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-purple-300 w-4" : "bg-purple-500 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div ref={containerRef} className="h-72 overflow-hidden">
          <div className="space-y-4">
            {getVisibleAnniversaries().map((item, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="rounded-xl p-2 bg-gradient-to-r from-purple-500 to-purple-400 shadow-md flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <User className="w-3 h-3 mr-1" />
                      <span>{item.department}</span>
                      <span className="mx-2">•</span>
                      <span>{item.years}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Previous anniversary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-inner">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-purple-600 dark:text-purple-400">{currentIndex + 1}</span>
              <span className="text-gray-500 dark:text-gray-400"> / </span>
              <span>{anniversaries.length}</span>
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Next anniversary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
