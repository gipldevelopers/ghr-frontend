"use client";

import { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import BreadcrumbRightContent from "../components/BreadcrumbRightContent";
import LeaveBalanceCard from "../components/LeaveBalanceCard";
import LeaveOverviewCards from "../components/LeaveOverviewCards";

export default function LeaveBalancePage() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );

  const leaveData = [
    { type: "Casual Leave", allocated: 12, used: 5 },
    { type: "Sick Leave", allocated: 10, used: 3 },
    { type: "Privilege Leave", allocated: 8, used: 2 },
    { type: "Optional Holiday", allocated: 4, used: 1 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb
        title="Leave Balance"
        subtitle="Check your remaining leave days"
        rightContent={
          <BreadcrumbRightContent
            selectedDate={selectedMonth}
            setSelectedDate={setSelectedMonth}
          />
        }
      />

      {/* Leave Overview Cards */}
      <div className="mt-6">
        <LeaveOverviewCards selectedMonth={selectedMonth} />
      </div>

      {/* Leave Balance Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaveData.map((leave, index) => (
          <LeaveBalanceCard
            key={index}
            type={leave.type}
            allocated={leave.allocated}
            used={leave.used}
          />
        ))}
      </div>
    </div>
  );
}
