import React from "react";
import Link from "next/link";

const EmployeesTable = () => {
  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "Anthony Lewis",
      position: "Finance",
      department: "Finance",
      avatar: "/images/users/user-13.jpg",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
    {
      id: 2,
      name: "Brian Villalobos",
      position: "PHP Developer",
      department: "Development",
      avatar: "/images/users/user-01.png",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    },
    {
      id: 3,
      name: "Stephan Peralt",
      position: "Executive",
      department: "Marketing",
      avatar: "/images/users/user-02.png",
      badgeColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
    },
    {
      id: 4,
      name: "Doglas Martini",
      position: "Project Manager",
      department: "Manager",
      avatar: "/images/users/user-03.png",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    },
    {
      id: 5,
      name: "Anthony Lewis",
      position: "UI/UX Designer",
      department: "UI/UX Design",
      avatar: "/images/users/user-04.png",
      badgeColor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
    },
    {
      id: 6,
      name: "Sheshansingh Rajput",
      position: "UI/UX Designer",
      department: "UI/UX Design",
      avatar: "/images/users/user-10.jpg",
      badgeColor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
    },
    {
      id: 7,
      name: "Aayush Sharma",
      position: "UI/UX Designer",
      department: "UI/UX Design",
      avatar: "/images/users/user-11.jpg",
      badgeColor: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
    }
  ];

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-lg shadow-sm border-0 overflow-hidden h-full">
      <div className="card-header px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap">
        <h5 className="text-base font-semibold text-gray-800 dark:text-white mb-2 md:mb-0">
          Employees
        </h5>
        <Link
        //   href="/hr/employees"
          href="#"
          className="px-3 py-1 font-semibold text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 
             dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          View All
        </Link>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {employees.map((employee, index) => (
                <tr key={employee.id} className={index === employees.length - 1 ? "" : "border-b border-gray-100 dark:border-gray-700"}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={employee.avatar}
                          alt={employee.name}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {employee.position}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex text-[10px] px-2 py-1 font-semibold rounded-sm ${employee.badgeColor}`}>
                      {employee.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;