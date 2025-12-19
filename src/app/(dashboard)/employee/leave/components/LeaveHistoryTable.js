"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

// Mock leave history data
const defaultData = [
  {
    id: "L-001",
    submitted: "01 Sep 2025",
    type: "Sick Leave",
    startDate: "03 Sep 2025",
    endDate: "04 Sep 2025",
    days: 2,
    status: "Approved",
    reason: "Fever",
  },
  {
    id: "L-002",
    submitted: "05 Sep 2025",
    type: "Vacation",
    startDate: "10 Sep 2025",
    endDate: "12 Sep 2025",
    days: 3,
    status: "Pending",
    reason: "Family trip",
  },
  {
    id: "L-003",
    submitted: "10 Sep 2025",
    type: "Personal Time",
    startDate: "15 Sep 2025",
    endDate: "15 Sep 2025",
    days: 1,
    status: "Rejected",
    reason: "Appointment",
  },
  {
    id: "L-004",
    submitted: "12 Sep 2025",
    type: "Sick Leave",
    startDate: "14 Sep 2025",
    endDate: "14 Sep 2025",
    days: 1,
    status: "Approved",
    reason: "Cold",
  },
  {
    id: "L-005",
    submitted: "13 Sep 2025",
    type: "Vacation",
    startDate: "20 Sep 2025",
    endDate: "22 Sep 2025",
    days: 3,
    status: "Approved",
    reason: "Wedding",
  },
  {
    id: "L-006",
    submitted: "14 Sep 2025",
    type: "Sick Leave",
    startDate: "16 Sep 2025",
    endDate: "17 Sep 2025",
    days: 2,
    status: "Pending",
    reason: "Migraine",
  },
  {
    id: "L-007",
    submitted: "15 Sep 2025",
    type: "Personal Time",
    startDate: "18 Sep 2025",
    endDate: "18 Sep 2025",
    days: 1,
    status: "Approved",
    reason: "Bank visit",
  },
  {
    id: "L-008",
    submitted: "16 Sep 2025",
    type: "Vacation",
    startDate: "25 Sep 2025",
    endDate: "28 Sep 2025",
    days: 4,
    status: "Rejected",
    reason: "Trip canceled",
  },
  {
    id: "L-009",
    submitted: "17 Sep 2025",
    type: "Sick Leave",
    startDate: "19 Sep 2025",
    endDate: "19 Sep 2025",
    days: 1,
    status: "Approved",
    reason: "Flu",
  },
  {
    id: "L-010",
    submitted: "18 Sep 2025",
    type: "Vacation",
    startDate: "30 Sep 2025",
    endDate: "03 Oct 2025",
    days: 4,
    status: "Pending",
    reason: "Family event",
  },
  {
    id: "L-011",
    submitted: "19 Sep 2025",
    type: "Personal Time",
    startDate: "21 Sep 2025",
    endDate: "21 Sep 2025",
    days: 1,
    status: "Rejected",
    reason: "Urgent task",
  },
  {
    id: "L-012",
    submitted: "20 Sep 2025",
    type: "Sick Leave",
    startDate: "23 Sep 2025",
    endDate: "24 Sep 2025",
    days: 2,
    status: "Approved",
    reason: "High fever",
  },
  {
    id: "L-013",
    submitted: "21 Sep 2025",
    type: "Vacation",
    startDate: "28 Sep 2025",
    endDate: "30 Sep 2025",
    days: 3,
    status: "Approved",
    reason: "Holiday",
  },
  {
    id: "L-014",
    submitted: "22 Sep 2025",
    type: "Personal Time",
    startDate: "26 Sep 2025",
    endDate: "26 Sep 2025",
    days: 1,
    status: "Pending",
    reason: "Appointment",
  },
  {
    id: "L-015",
    submitted: "23 Sep 2025",
    type: "Sick Leave",
    startDate: "27 Sep 2025",
    endDate: "27 Sep 2025",
    days: 1,
    status: "Rejected",
    reason: "Headache",
  },
];

export default function LeaveHistoryTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const statuses = useMemo(
    () => ["all", "Approved", "Pending", "Rejected"],
    []
  );

  const filteredData = useMemo(() => {
    let result = [...defaultData];
    if (globalFilter) {
      const term = globalFilter.toLowerCase();
      result = result.filter(
        (d) =>
          d.type.toLowerCase().includes(term) ||
          d.reason.toLowerCase().includes(term) ||
          d.status.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((d) => d.status === statusFilter);
    }
    return result;
  }, [globalFilter, statusFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "submitted", header: "Submitted" },
      { accessorKey: "type", header: "Leave Type" },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "endDate", header: "End Date" },
      { accessorKey: "days", header: "Days" },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const statusClass =
            status === "Approved"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
          return (
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}
            >
              {status}
            </span>
          );
        },
      },
      { accessorKey: "reason", header: "Reason" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Filters */}
      {/* Filters */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
    <input
      type="text"
      placeholder="Search by type, reason, or status..."
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      className="w-full sm:w-72 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s === "all" ? "All Status" : s}
        </option>
      ))}
    </select>
  </div>

  {(globalFilter || statusFilter !== "all") && (
    <button
      onClick={() => {
        setGlobalFilter("");
        setStatusFilter("all");
        setPagination({ pageIndex: 0, pageSize: 5 });
      }}
      className="text-red-600 hover:text-red-800 dark:text-red-400 font-medium transition sm:mt-0 mt-2"
    >
      Clear
    </button>
  )}
</div>


      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm min-w-[700px] border border-gray-200 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold uppercase tracking-wide text-xs cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span>
                          {sorted === "asc"
                            ? "▲"
                            : sorted === "desc"
                            ? "▼"
                            : "⇅"}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all rounded-lg"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-gray-600 dark:text-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No leave history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Prev
          </button>
          <span className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            table.setPageIndex(0);
          }}
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
