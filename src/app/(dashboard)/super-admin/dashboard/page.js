// src/app/(dashboard)/super-admin/dashboard/page.js
import React from "react";
import WelcomeWrap from "./components/WelcomeWrap";
import SystemStats from "./components/SystemStats";
import SystemHealth from "./components/SystemHealth";
import UserActivity from "./components/UserActivity";
import SecurityOverview from "./components/SecurityOverview";
import AuditLogs from "./components/AuditLogs";
import ApiUsage from "./components/ApiUsage";

export const metadata = {
  title: "Super Admin Dashboard | HRMS Portal",
  description: "System Administration Dashboard for HRMS Portal",
};

export default function SuperAdminDashboard() {
  // Sample data for super admin
  const userData = {
    userName: "System Admin",
    systemAlerts: 3,
    pendingTasks: 8,
    avatarUrl: "/images/users/admin-avatar.png",
  };

  return (
      <div className="space-y-6">
        {/* Welcome Wrap Section */}
        <WelcomeWrap
          userName={userData.userName}
          systemAlerts={userData.systemAlerts}
          pendingTasks={userData.pendingTasks}
          avatarUrl={userData.avatarUrl}
        />

        {/* System Stats Cards */}
        <SystemStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SystemHealth />
            <UserActivity />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <SecurityOverview />
            <AuditLogs />
            <ApiUsage />
          </div>
        </div>
      </div>
  );
}