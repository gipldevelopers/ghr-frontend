"use client";

import React, { useState, useRef } from "react";

export default function UpcomingEvents() {
  const events = [
    { title: "Team Meeting", date: "July 10, 2024", time: "10:00 AM", location: "Conference Room A" },
    { title: "Annual Company Picnic", date: "July 20, 2024", time: "12:00 PM", location: "Central Park" },
    { title: "Project Alpha Deadline", date: "July 25, 2024", time: "5:00 PM", location: "Office" },
    { title: "HR Training Session", date: "July 28, 2024", time: "2:00 PM", location: "Training Room B" },
    { title: "Quarterly Review", date: "August 5, 2024", time: "9:00 AM", location: "Board Room" },
    { title: "Team Building Workshop", date: "August 12, 2024", time: "1:00 PM", location: "Main Hall" },
    { title: "Client Presentation", date: "August 18, 2024", time: "11:00 AM", location: "Client Office" },
    { title: "Department Budget Review", date: "August 22, 2024", time: "3:00 PM", location: "Finance Office" },
    { title: "New Hire Orientation", date: "August 28, 2024", time: "10:00 AM", location: "HR Department" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Get the three events to display
  const getVisibleEvents = () => {
    const visibleEvents = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % events.length;
      visibleEvents.push(events[index]);
    }
    return visibleEvents;
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Dark Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <div className="flex space-x-1">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-blue-400 w-4" : "bg-gray-600 hover:bg-gray-500"
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
            {getVisibleEvents().map((event, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="rounded-xl p-2 bg-gradient-to-r from-blue-500 to-blue-400 shadow-md flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">{event.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2  V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-500">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8   0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location}</span>
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
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Previous event"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-inner">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-blue-600 dark:text-blue-400">{currentIndex + 1}</span>
              <span className="text-gray-500 dark:text-gray-400"> / </span>
              <span>{events.length}</span>
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Next event"
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
