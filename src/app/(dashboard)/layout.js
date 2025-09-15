// // // src/app/(dashboard)/layout.js
// // "use client"; // This must be a client component because it uses context and state

// // import { useAuth } from "@/context/AuthContext";
// // import { useSidebar } from "@/context/SidebarContext";
// // import AppHeader from "@/layout/AppHeader";
// // import AppSidebar from "@/layout/AppSidebar";
// // import Backdrop from "@/layout/Backdrop";

// // export default function DashboardLayout({ children }) {
// //   const { isExpanded, isHovered, isMobileOpen } = useSidebar();
// //   const { user, loading } = useAuth(); // Get user from auth context

// //   // Show loading state while checking authentication
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //    // Redirect to login if not authenticated
// //   if (!user) {
// //     // You might want to redirect to login page here
// //     // For now, we'll just show a message
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold mb-4">Not Authenticated</h2>
// //           <p>Please log in to access the dashboard.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Dynamic class for main content margin based on sidebar state
// //   const mainContentMargin = isMobileOpen
// //     ? "ml-0"
// //     : isExpanded || isHovered
// //     ? "lg:ml-[290px]"
// //     : "lg:ml-[90px]";

// //   return (
// //     <div className="min-h-screen xl:flex">
// //       {/* Sidebar and Backdrop */}
// //       <AppSidebar userRole={user.role} />
// //       <Backdrop />
      
// //       {/* Main Content Area */}
// //       <div
// //         className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
// //       >
// //         {/* Header */}
// //         <AppHeader userRole={user.role} />
        
// //         {/* Page Content */}
// //         <div className="p-4 mx-auto max-w-screen-2xl md:p-5">
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // src/app/(dashboard)/layout.js
// "use client";
// import ErrorBoundary from "@/components/ErrorBoundary";
// import { useAuth } from "@/context/AuthContext";
// import { useSidebar } from "@/context/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
// import Backdrop from "@/layout/Backdrop";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function DashboardLayout({ children }) {
//   const { isExpanded, isHovered, isMobileOpen } = useSidebar();
//   const { user, loading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push('/signin');
//     }
//   }, [isAuthenticated, loading, router]);

//   // Show loading state while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Return null during redirect to avoid flash of content
//   if (!isAuthenticated) {
//     return null;
//   }

//   // Dynamic class for main content margin based on sidebar state
//   const mainContentMargin = isMobileOpen
//     ? "ml-0"
//     : isExpanded || isHovered
//     ? "lg:ml-[290px]"
//     : "lg:ml-[90px]";

//   return (
//     <ErrorBoundary>
//       <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-900">
//         {/* Sidebar and Backdrop */}
//         <AppSidebar userRole={user.role} />
//         <Backdrop />
        
//         {/* Main Content Area */}
//         <div
//           className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
//         >
//           {/* Header */}
//           <AppHeader user={user} /> {/* Pass full user object */}
          
//           {/* Page Content */}
//           <main className="p-4 mx-auto max-w-screen-2xl md:p-5 2xl:p-6">
//             {children}
//           </main>
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// }

// src/app/(dashboard)/layout.js
"use client";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]); // Added router to dependencies

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Return null during redirect to avoid flash of content
  if (!isAuthenticated) {
    return null;
  }

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <AuthGuard requireAuth={true}>
      <ErrorBoundary>
        <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-900">
          {/* Sidebar and Backdrop */}
          <AppSidebar /> {/* Removed userRole prop - AppSidebar now uses useAuth() */}
          <Backdrop />
          
          {/* Main Content Area */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
          >
            {/* Header */}
            <AppHeader user={user} />
            
            {/* Page Content */}
            <main className="p-4 mx-auto max-w-screen-2xl md:p-5 2xl:p-6">
              {children}
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </AuthGuard>
  );
}