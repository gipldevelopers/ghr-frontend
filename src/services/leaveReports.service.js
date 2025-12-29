// src/services/leaveReports.service.js
import { apiClient } from '../lib/api';

const leaveReportsService = {
    // Get leave statistics
    getLeaveStats: async (params = {}) => {
        try {
            const response = await apiClient.get('/leave-reports/stats', { params });
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching leave stats:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch leave statistics'
            };
        }
    },

    // Get leave trends
    getLeaveTrends: async (params = {}) => {
        try {
            const response = await apiClient.get('/leave-reports/trends', { params });
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching leave trends:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch leave trends'
            };
        }
    },

    // Get leave by type
    getLeaveByType: async (params = {}) => {
        try {
            const response = await apiClient.get('/leave-reports/by-type', { params });
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching leave by type:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch leave by type'
            };
        }
    },

    // Get leave by department
    getLeaveByDepartment: async (params = {}) => {
        try {
            const response = await api.get('/leave-reports/by-department', { params });
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching leave by department:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch leave by department'
            };
        }
    },

    // Get employee leave summary
    getEmployeeLeaveSummary: async (params = {}) => {
        try {
            const response = await api.get('/leave-reports/employee-summary', { params });
            return {
                success: true,
                data: response.data.data.data,
                pagination: response.data.data.pagination
            };
        } catch (error) {
            console.error('Error fetching employee leave summary:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch employee leave summary'
            };
        }
    },

    // Export report
    exportReport: async (data) => {
        try {
            const response = await api.post('/leave-reports/export', data, {
                responseType: 'blob'
            });
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `leave-report-${Date.now()}.${data.format || 'xlsx'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            return {
                success: true,
                message: 'Report exported successfully'
            };
        } catch (error) {
            console.error('Error exporting report:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to export report'
            };
        }
    },

    // Save report
    saveReport: async (reportData) => {
        try {
            const response = await api.post('/leave-reports/save', reportData);
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        } catch (error) {
            console.error('Error saving report:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to save report'
            };
        }
    },

    // Get saved reports
    getSavedReports: async () => {
        try {
            const response = await api.get('/leave-reports/saved');
            return {
                success: true,
                data: response.data.data
            };
        } catch (error) {
            console.error('Error fetching saved reports:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch saved reports'
            };
        }
    }
};

export default leaveReportsService;