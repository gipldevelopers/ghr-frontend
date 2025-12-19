"use client";

import React, { useState, useEffect, useRef } from "react";
import { Fingerprint } from "lucide-react";

export default function EmployeeAttendanceCircle() {
  const WORK_HOURS = 9;
  const TOTAL_SECONDS = WORK_HOURS * 3600;

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [secondsWorked, setSecondsWorked] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const intervalRef = useRef(null);

  // Reset timer daily
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);
      if (punchInTime && now.toDateString() !== new Date(punchInTime).toDateString()) {
        setIsPunchedIn(false);
        setPunchInTime(null);
        setPunchOutTime(null);
        setSecondsWorked(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [punchInTime]);

  // Animate timer
  useEffect(() => {
    if (isPunchedIn) {
      intervalRef.current = setInterval(() => {
        setSecondsWorked((prev) => Math.min(prev + 1, TOTAL_SECONDS));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPunchedIn]);

  const handlePunch = () => {
    const now = new Date();
    if (!isPunchedIn) {
      setPunchInTime(now);
      setIsPunchedIn(true);
      setPunchOutTime(null);
    } else {
      setPunchOutTime(now);
      setIsPunchedIn(false);
    }
  };

  const progress = (secondsWorked / TOTAL_SECONDS) * 100;
  const hours = String(Math.floor(secondsWorked / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsWorked % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsWorked % 60).padStart(2, "0");

  return (
    // <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 max-w-sm mx-auto border border-gray-200 dark:border-gray-700">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col w-full">
      {/* Header */}
      <div className="text-center mb-4">
        {/* Common Icon */}
        

        {/* Punch Times */}
        <div className="flex items-center space-x-2 justify-center">
          {punchInTime && (
            <p className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              Punch In: {punchInTime.toLocaleTimeString()}
            </p>
          )}

          {punchOutTime && (
            <p className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
              Punch Out: {punchOutTime.toLocaleTimeString()}
            </p>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
          Office Hours Tracker
        </h3>
      </div>

      {/* Progress Circle */}
      <div className="relative mx-auto mb-6 w-48 h-48">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 - (progress / 100) * 2 * Math.PI * 88}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 drop-shadow-md"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center shadow-inner animate-pulse-slow">
          <span className="text-gray-900 dark:text-white text-2xl font-bold">
            {hours}:{minutes}:{seconds}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-sm mt-1">{WORK_HOURS} Hrs</span>
        </div>
      </div>

      {/* Punch Button */}
      <button
        onClick={handlePunch}
        className={`w-full py-3 rounded-full font-medium transition-colors text-white ${
          isPunchedIn ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isPunchedIn ? "Punch Out" : "Punch In"}
      </button>
    </div>
  );
}
