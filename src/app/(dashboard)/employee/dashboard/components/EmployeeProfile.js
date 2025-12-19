"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Facebook, X } from "lucide-react";

export default function EmployeeProfile() {
  const employee = {
    name: "John Doe",
    position: "Senior Product Designer",
    role: "UI/UX Design",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    reportOffice: "Douglas Martini",
    joinedOn: "15 Jan 2024",
    avatarUrl: "/images/users/default-avatar.png",
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      x: "https://x.com/johndoe",
    },
  };

  return (
    <div className="card flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 h-full">
      {/* Card Header */}
      <div className="card-header p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <span className="avatar avatar-lg rounded-full border-2 border-white dark:border-gray-800 flex-shrink-0 overflow-hidden w-20 h-20">
            <Image
              src={employee.avatarUrl}
              alt={`${employee.name} avatar`}
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-full"
            />
          </span>

          {/* Name and Position */}
          <div>
            <h5 className="text-gray-800 dark:text-white text-xl font-semibold mb-2">
              {employee.name}
            </h5>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
              <p>{employee.position}</p>
              <span>
                <svg
                  className="w-3 h-3 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </span>
              <p>{employee.role}</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <a
          href="#"
          className="btn btn-icon text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          aria-label="Edit Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </a>
      </div>

      {/* Card Body */}
      <div className="card-body p-5 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Left Column */}
          <div className="flex flex-col justify-top space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-24">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Phone Number
                </p>
                <p className="text-base font-medium text-gray-800 dark:text-white">
                  {employee.phone}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-24">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Email Address
                </p>
                <p className="text-base font-medium text-gray-800 dark:text-white">
                  {employee.email}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-top space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-24">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Report Office
                </p>
                <p className="text-base font-medium text-gray-800 dark:text-white">
                  {employee.reportOffice}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-24">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Joined on
                </p>
                <p className="text-base font-medium text-gray-800 dark:text-white">
                  {employee.joinedOn}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
       <div className="mt-6 flex justify-center space-x-6">
  {/* LinkedIn */}
  <a
    href={employee.social.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-700 hover:text-blue-900"
    aria-label="LinkedIn"
  >
    <Linkedin className="w-6 h-6" />
  </a>

  {/* Facebook */}
  <a
    href={employee.social.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800"
    aria-label="Facebook"
  >
    <Facebook className="w-6 h-6" />
  </a>

  {/* X */}
  <a
    href={employee.social.x}
    target="_blank"
    rel="noopener noreferrer"
    className="text-black hover:text-gray-800"
    aria-label="X"
  >
    <X className="w-6 h-6" />
  </a>
</div>
      </div>
    </div>
  );
}
