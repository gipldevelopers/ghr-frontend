"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History, Wallet, Receipt, BarChart } from "lucide-react";

export default function EmployeeTabs() {
  const pathname = usePathname();

  const tabs = [
    { key: "summary", label: "Summary", href: "/employee/payslips/salery-summery", icon: BarChart, gradient: "from-indigo-500 to-indigo-700" },
    { key: "payslips", label: "Payslips", href: "/employee/payslips/pay-slips", icon: FileText, gradient: "from-green-500 to-green-700" },
    { key: "history", label: "History", href: "/employee/payslips/payment-history", icon: History, gradient: "from-orange-500 to-orange-700" },
    { key: "tax", label: "Tax Info", href: "/employee/payslips/tax-info", icon: Receipt, gradient: "from-blue-500 to-blue-700" },
    { key: "reimbursements", label: "Reimbursements", href: "/employee/payslips/rembursment", icon: Wallet, gradient: "from-pink-500 to-pink-700" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-xl border transition-all duration-300 text-white
                bg-gradient-to-r ${tab.gradient}
                ${isActive ? "scale-105 shadow-xl" : "opacity-90 hover:opacity-100"}
              `}
            >
              <Icon className="w-8 h-8" /> {/* slightly bigger icons */}
              <span className="text-lg sm:text-xl font-semibold">{tab.label}</span> {/* bigger, bolder text */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
