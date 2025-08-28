import React from "react";
import Link from "next/link";

const Schedules = () => {
  // Sample schedule data
  const schedules = [
    {
      id: 1,
      position: "UI/UX Designer",
      badgeColor: "bg-gray-500",
      title: "Interview Candidates - UI/UX Designer",
      date: "Thu, 15 Feb 2025",
      time: "01:00 PM - 02:20 PM",
      participants: [
        "/images/users/user-05.jpg",
        "/images/users/user-06.jpg",
        "/images/users/user-07.jpg",
        "/images/users/user-08.jpg",
        "/images/users/user-09.jpg",
      ],
      additionalParticipants: 3,
    },
    {
      id: 2,
      position: "IOS Developer",
      badgeColor: "bg-gray-800",
      title: "Interview Candidates - IOS Developer",
      date: "Thu, 15 Feb 2025",
      time: "02:00 PM - 04:20 PM",
      participants: [
        "/images/users/user-05.jpg",
        "/images/users/user-06.jpg",
        "/images/users/user-07.jpg",
        "/images/users/user-08.jpg",
        "/images/users/user-09.jpg",
      ],
      additionalParticipants: 3,
    },
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden h-full">
      <div className="card-header px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white mb-2 md:mb-0">
          Schedules
        </h5>
        {/* View All Button */}
        <Link
          href="/hr/candidates"
          className="px-3 py-1 font-semibold text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          View All
        </Link>
      </div>

      <div className="card-body p-4">
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 last:mb-0"
            >
              {/* Badge */}
              <span
                className={`badge text-[10px] py-1 px-2 rounded-sm ${schedule.badgeColor} text-white mb-3`}
              >
                {schedule.position}
              </span>

              {/* Title */}
              <h6 className="text-sm font-semibold text-gray-800 dark:text-white truncate mb-2">
                {schedule.title}
              </h6>

              {/* Date and Time */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {schedule.date}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {schedule.time}
                </p>
              </div>

              {/* Participants and Join Button */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-3">
                {/* Avatar Group */}
                <div className="flex -space-x-2">
                  {schedule.participants
                    .slice(0, 5)
                    .map((participant, index) => (
                      <div
                        key={index}
                        className="avatar relative rounded-full w-8 h-8 border-2 border-white dark:border-gray-800 overflow-hidden 
                 transition-all duration-200 hover:z-10 hover:-translate-y-1"
                      >
                        <img
                          src={participant}
                          className="w-full h-full object-cover"
                          alt={`Participant ${index + 1}`}
                        />
                      </div>
                    ))}
                  {schedule.additionalParticipants > 0 && (
                    <div className="relative group">
                      <div
                        className="w-7 h-7 avatar rounded-full border-2 border-white dark:border-gray-800 
      bg-blue-500 text-white text-xs flex items-center justify-center 
      cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                      >
                        +{schedule.additionalParticipants}
                      </div>

                      {/* Tooltip on hover */}
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap 
      bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 
      transition-opacity duration-200"
                      >
                        {schedule.additionalParticipants} more participants
                      </div>
                    </div>
                  )}
                </div>

                {/* Join Button */}
                <div data-color="primary">
                  {/* Join Button */}
                  <button className="btn rounded-sm btn-primary btn-xs py-1 px-3 text-[10px]">
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedules;
