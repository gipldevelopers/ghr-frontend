// src/app/(dashboard)/hr/attendance/reports/components/charts/AttendanceTrendChart.js
"use client";
import { CHART_TYPES } from '@/types/attendanceReports';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AttendanceTrendChart({ data, chartType, dateRange, customDateRange }) {
  if (!data || data.length === 0) {
    return <div className="text-center py-12 text-gray-500">No data available for the selected period</div>;
  }

  const renderChart = () => {
    switch (chartType) {
      case CHART_TYPES.BAR:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#0088FE" name="Present" />
              <Bar dataKey="late" fill="#FFBB28" name="Late" />
              <Bar dataKey="absent" fill="#FF8042" name="Absent" />
              <Bar dataKey="overtime" fill="#00C49F" name="Overtime" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case CHART_TYPES.LINE:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#0088FE" name="Present" />
              <Line type="monotone" dataKey="late" stroke="#FFBB28" name="Late" />
              <Line type="monotone" dataKey="absent" stroke="#FF8042" name="Absent" />
              <Line type="monotone" dataKey="overtime" stroke="#00C49F" name="Overtime" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case CHART_TYPES.PIE:
        // For pie chart, we need to aggregate the data
        const aggregatedData = [
          { name: 'Present', value: data.reduce((sum, item) => sum + item.present, 0) },
          { name: 'Late', value: data.reduce((sum, item) => sum + item.late, 0) },
          { name: 'Absent', value: data.reduce((sum, item) => sum + item.absent, 0) },
          { name: 'Overtime', value: data.reduce((sum, item) => sum + item.overtime, 0) }
        ];
        
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {aggregatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case CHART_TYPES.TABLE:
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Present
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Late
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Absent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Overtime
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.late}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.absent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.overtime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing data for {dateRange === 'custom' 
          ? `${customDateRange.startDate.toLocaleDateString()} to ${customDateRange.endDate.toLocaleDateString()}`
          : dateRange.replace('_', ' ')}
      </div>
      {renderChart()}
    </div>
  );
}