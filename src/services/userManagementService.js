// src/services/userManagementService.js
import { apiClient } from '@/lib/api';

export const userManagementService = {
  // Get all users with pagination and filters
  getAllUsers: async (params = {}) => {
    try {
      const response = await apiClient.get('/users', { params });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch users';
      throw new Error(errorMessage);
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user';
      throw new Error(errorMessage);
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      throw new Error(errorMessage);
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      throw new Error(errorMessage);
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      throw new Error(errorMessage);
    }
  },

  // Get available roles for assignment
//   getAvailableRoles: async () => {
//     try {
//       const response = await apiClient.get('/rbac/roles');
//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
//       throw new Error(errorMessage);
//     }
//   },
 // Get available roles for assignment - Updated endpoint
  getAvailableRoles: async () => {
    try {
      const response = await apiClient.get('/rbac/roles', { 
        params: { limit: 100, type: 'custom' } 
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
      throw new Error(errorMessage);
    }
  },

  // Get system roles
//   getSystemRoles: async () => {
//     try {
//       const response = await apiClient.get('/rbac/system-roles');
//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to fetch system roles';
//       throw new Error(errorMessage);
//     }
//   },
// Get system roles - Updated endpoint
  getSystemRoles: async () => {
    try {
      const response = await apiClient.get('/rbac/roles/system');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch system roles';
      throw new Error(errorMessage);
    }
  },

    // Get company roles - New endpoint
  getCompanyRoles: async () => {
    try {
      const response = await apiClient.get('/users/roles/company');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch company roles';
      throw new Error(errorMessage);
    }
  },

  // Assign role to user
  assignRoleToUser: async (userId, roleData) => {
    try {
      const response = await apiClient.post(`/users/${userId}/assign-role`, roleData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to assign role';
      throw new Error(errorMessage);
    }
  },

  // Remove role from user
  removeRoleFromUser: async (userId) => {
    try {
      const response = await apiClient.delete(`/users/${userId}/role`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove role';
      throw new Error(errorMessage);
    }
  },

  // Change user status (activate/deactivate)
  changeUserStatus: async (userId, status) => {
    try {
      const response = await apiClient.patch(`/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to change user status';
      throw new Error(errorMessage);
    }
  },

  // Reset user password
  resetUserPassword: async (userId) => {
    try {
      const response = await apiClient.post(`/users/${userId}/reset-password`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password';
      throw new Error(errorMessage);
    }
  },

  // Get user activity/logs
  getUserActivity: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/activity`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user activity';
      throw new Error(errorMessage);
    }
  }
};

export default userManagementService;