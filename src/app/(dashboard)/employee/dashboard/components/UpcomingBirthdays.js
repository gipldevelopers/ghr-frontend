"use client";

import React, { useState, useRef } from "react";

export default function UpcomingBirthdays() {
  const birthdays = [
    { name: "Jane Smith", date: "July 5, 2024", department: "Marketing", years: "2 years" },
    { name: "Michael Brown", date: "July 12, 2024", department: "Engineering", years: "5 years" },
    { name: "Emily Johnson", date: "July 18, 2024", department: "HR", years: "3 years" },
    { name: "David Wilson", date: "July 22, 2024", department: "Sales", years: "1 year" },
    { name: "Sarah Davis", date: "July 28, 2024", department: "Design", years: "4 years" },
    { name: "Robert Miller", date: "August 3, 2024", department: "Finance", years: "7 years" },
    { name: "Lisa Anderson", date: "August 8, 2024", department: "Operations", years: "2 years" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const getVisibleBirthdays = () => {
    const visibleBirthdays = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % birthdays.length;
      visibleBirthdays.push(birthdays[index]);
    }
    return visibleBirthdays;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + birthdays.length) % birthdays.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % birthdays.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Dark Header Section */}
      <div className="bg-gradient-to-r from-pink-700 to-pink-600 dark:from-pink-800 dark:to-pink-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Birthdays</h2>
          <div className="flex space-x-1">
            {birthdays.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-pink-300 w-4" : "bg-pink-500 hover:bg-pink-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div ref={containerRef} className="h-72 overflow-hidden">
          <div className="space-y-4">
            {getVisibleBirthdays().map((bday, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="rounded-xl p-2 bg-gradient-to-r from-pink-500 to-pink-400 shadow-md flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">{bday.name}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{bday.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                      <span className="truncate">{bday.department}</span>
                      <span className="mx-2">•</span>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{bday.years}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Previous birthday"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-inner">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-pink-600 dark:text-pink-400">{currentIndex + 1}</span>
              <span className="text-gray-500 dark:text-gray-400"> / </span>
              <span>{birthdays.length}</span>
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Next birthday"
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
