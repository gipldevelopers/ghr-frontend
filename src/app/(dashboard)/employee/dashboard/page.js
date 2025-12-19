import React from "react";
import EmployeeProfile from "./components/EmployeeProfile";
import LeaveSummary from "./components/LeaveSummary";
import Payroll from "./components/Payroll";
import LeaveTypes from "./components/LeaveTypes";
import UpcomingBirthdays from "./components/UpcomingBirthdays";
import UpcomingEvents from "./components/UpcomingEvents";
import UpcomingWorkAnniversaries from "./components/UpcomingWorkAnniversaries";
import EmployeeAttendance from "./components/EmployeeAttendance";

export const metadata = {
  title: "Employee Dashboard | GHR Portal",
  description: "Employee dashboard with profile, leave, payroll, and events",
};

export default function EmployeeDashboard() {
  return (
    <div className="space-y-5 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Row 1: Profile + Leave Summary - Fixed height container */}
      <div className="flex flex-col md:flex-row w-full gap-4 items-stretch">
        {/* Right Column - 30% */}
        <div className="w-full md:w-3/10 min-w-[280px] flex">
          <EmployeeAttendance />
        </div>
        {/* Left Column - 70% */}
        <div className="w-full md:w-7/10 min-w-[280px] flex">
          <LeaveSummary />
        </div>
      </div>

      {/* Row 2: Payroll (Full Width) */}
      {/* <div className="w-full">
        <LeaveSummary />
      </div> */}

      {/* Row 2: Payroll (Full Width) */}
      <div className="w-full">
        <Payroll />
      </div>

      {/* Row 3: Leave Types (Full Width) */}
      <div className="w-full">
        <LeaveTypes />
      </div>

      {/* Row 4: Upcoming Events + Upcoming Birthdays (Side by Side) */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 min-w-[300px]">
          <UpcomingEvents />
        </div>
        <div className="flex-1 min-w-[300px]">
          <UpcomingBirthdays />
        </div>
        <div className="flex-1 min-w-[300px]">
          <UpcomingWorkAnniversaries />
        </div>
      </div>
    </div>
  );
}
