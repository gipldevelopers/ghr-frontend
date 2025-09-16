// src/services/employeeService.js
import { apiClient } from '@/lib/api';

export const employeeService = {
  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      // Convert file objects to FormData for file uploads
      const formData = new FormData();
      
      // Append all non-file fields
      Object.keys(employeeData).forEach(key => {
        if (key !== 'profilePhoto' && key !== 'aadhaarDocument' && 
            key !== 'panDocument' && key !== 'photo' && key !== 'resume' && 
            key !== 'educationCertificates') {
          formData.append(key, employeeData[key]);
        }
      });

      // Append files if they exist
      if (employeeData.profilePhoto) {
        formData.append('profilePhoto', employeeData.profilePhoto);
      }
      if (employeeData.aadhaarDocument) {
        formData.append('aadhaarDocument', employeeData.aadhaarDocument);
      }
      if (employeeData.panDocument) {
        formData.append('panDocument', employeeData.panDocument);
      }
      if (employeeData.photo) {
        formData.append('photo', employeeData.photo);
      }
      if (employeeData.resume) {
        formData.append('resume', employeeData.resume);
      }
      if (employeeData.educationCertificates && employeeData.educationCertificates.length > 0) {
        employeeData.educationCertificates.forEach((file, index) => {
          formData.append(`educationCertificates`, file);
        });
      }

      const response = await apiClient.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create employee';
      throw new Error(errorMessage);
    }
  },

  // Get all employees
  getAllEmployees: async (params = {}) => {
    try {
      const response = await apiClient.get('/employees', { params });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch employees';
      throw new Error(errorMessage);
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await apiClient.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch employee';
      throw new Error(errorMessage);
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const formData = new FormData();
      
      // Append all non-file fields
      Object.keys(employeeData).forEach(key => {
        if (key !== 'profilePhoto' && key !== 'aadhaarDocument' && 
            key !== 'panDocument' && key !== 'photo' && key !== 'resume' && 
            key !== 'educationCertificates') {
          formData.append(key, employeeData[key]);
        }
      });

      // Append files if they exist
      if (employeeData.profilePhoto instanceof File) {
        formData.append('profilePhoto', employeeData.profilePhoto);
      }
      if (employeeData.aadhaarDocument instanceof File) {
        formData.append('aadhaarDocument', employeeData.aadhaarDocument);
      }
      if (employeeData.panDocument instanceof File) {
        formData.append('panDocument', employeeData.panDocument);
      }
      if (employeeData.photo instanceof File) {
        formData.append('photo', employeeData.photo);
      }
      if (employeeData.resume instanceof File) {
        formData.append('resume', employeeData.resume);
      }
      if (employeeData.educationCertificates && employeeData.educationCertificates.length > 0) {
        employeeData.educationCertificates.forEach((file, index) => {
          formData.append(`educationCertificates`, file);
        });
      }

      const response = await apiClient.put(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update employee';
      throw new Error(errorMessage);
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await apiClient.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete employee';
      throw new Error(errorMessage);
    }
  }
};

export default employeeService;