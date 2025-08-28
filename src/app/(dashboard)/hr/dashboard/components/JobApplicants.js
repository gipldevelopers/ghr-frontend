"use client";
import React, { useState } from "react";
import Link from "next/link";

const JobApplicants = () => {
  const [activeTab, setActiveTab] = useState("applicants");

  // Sample data for job openings
  const jobOpenings = [
    {
      id: 1,
      company: "Apple",
      logo: "/images/icons/apple.svg",
      title: "Senior IOS Developer",
      openings: 25,
    },
    {
      id: 2,
      company: "PHP",
      logo: "/images/icons/php.svg",
      title: "Junior PHP Developer",
      openings: 20,
    },
    {
      id: 3,
      company: "React",
      logo: "/images/icons/react.svg",
      title: "Junior React Developer",
      openings: 30,
    },
    {
      id: 4,
      company: "Laravel",
      logo: "/images/icons/laravel-icon.svg",
      title: "Senior Laravel Developer",
      openings: 40,
    },
  ];

  // Sample data for applicants
  const applicants = [
    {
      id: 1,
      name: "Brian Villalobos",
      avatar: "/images/users/user-01.png",
      experience: "5+ Years",
      location: "USA",
      position: "UI/UX Designer",
      badgeColor: "bg-gray-500",
    },
    {
      id: 2,
      name: "Anthony Lewis",
      avatar: "/images/users/user-02.png",
      experience: "4+ Years",
      location: "USA",
      position: "Python Developer",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Stephan Peralt",
      avatar: "/images/users/user-03.png",
      experience: "6+ Years",
      location: "USA",
      position: "Android Developer",
      badgeColor: "bg-pink-500",
    },
    {
      id: 4,
      name: "Doglas Martini",
      avatar: "/images/users/user-04.png",
      experience: "2+ Years",
      location: "USA",
      position: "React Developer",
      badgeColor: "bg-purple-500",
    },
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden h-full">
      {/* Header */}
      <div className="card-header px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white">
          Jobs Applicants
        </h5>
        {/* View All Button */}
        <Link
          href="/hr/recruitment"
          className="px-3 py-1 font-semibold text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          View All
        </Link>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        {/* Tabs */}
        <div className="grid grid-cols-2 mb-4 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <button
            className={`py-[6px] text-sm font-semibold transition ${
              activeTab === "openings"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("openings")}
          >
            Openings
          </button>
          <button
            className={`py-[6px] text-sm font-semibold transition ${
              activeTab === "applicants"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("applicants")}
          >
            Applicants
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Openings Tab */}
          {activeTab === "openings" && (
            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md w-12 h-12 flex items-center justify-center">
                      <img
                        src={job.logo}
                        className="w-5 h-5"
                        alt={job.company}
                      />
                    </div>
                    <div className="ml-3 overflow-hidden">
                      <p className="text-gray-800 dark:text-white font-semibold text-sm truncate">
                        {job.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Openings: {job.openings}
                      </span>
                    </div>
                  </div>

                  {/* Edit Icon Button */}
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Applicants Tab */}
          {activeTab === "applicants" && (
            <div className="space-y-4">
              {applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={applicant.avatar}
                        className="w-10 h-10 object-cover"
                        alt={applicant.name}
                      />
                    </div>
                    <div className="ml-3 overflow-hidden">
                      <p className="text-gray-800 dark:text-white font-medium text-sm truncate">
                        {applicant.name}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>Exp: {applicant.experience}</span>
                        <span className="mx-1">•</span>
                        <span>{applicant.location}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] py-[2px] px-2 rounded-sm ${applicant.badgeColor} text-white`}
                  >
                    {applicant.position}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;
