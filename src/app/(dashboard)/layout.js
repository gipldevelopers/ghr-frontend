// src/app/(dashboard)/layout.js
"use client"; // This must be a client component because it uses context and state

import Breadcrumb from "@/components/common/Breadcrumb";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

export default function DashboardLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, loading } = useAuth(); // Get user from auth context

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

   // Redirect to login if not authenticated
  if (!user) {
    // You might want to redirect to login page here
    // For now, we'll just show a message
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Authenticated</h2>
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar userRole={user.role} />
      <Backdrop />
      
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader userRole={user.role} />
        
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-5">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </div>
  );
}