// // src/services/roleService.js
// import { apiClient } from '@/lib/api';

// export const roleService = {
//   // Get all roles with pagination and filters
//   getAllRoles: async (params = {}) => {
//     try {
//       const response = await apiClient.get('/rbac/roles', { params });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch roles');
//     }
//   },

//   // Get role by ID
//   getRoleById: async (id) => {
//     try {
//       const response = await apiClient.get(`/rbac/roles/${id}`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch role');
//     }
//   },

//   // Create new role
//   createRole: async (roleData) => {
//     try {
//       const response = await apiClient.post('/rbac/roles', roleData);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to create role');
//     }
//   },

//   // Update role
//   updateRole: async (id, roleData) => {
//     try {
//       const response = await apiClient.put(`/rbac/roles/${id}`, roleData);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to update role');
//     }
//   },

//   // Delete role
//   deleteRole: async (id) => {
//     try {
//       const response = await apiClient.delete(`/rbac/roles/${id}`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to delete role');
//     }
//   },

//   // Get role permissions
//   getRolePermissions: async (id) => {
//     try {
//       const response = await apiClient.get(`/rbac/roles/${id}/permissions`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch role permissions');
//     }
//   },

//   // Update role permissions
//   updateRolePermissions: async (id, permissions) => {
//     try {
//       const response = await apiClient.put(`/rbac/roles/${id}/permissions`, { permissions });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to update role permissions');
//     }
//   },

//   // Check if role has users
//   checkRoleHasUsers: async (id) => {
//     try {
//       const response = await apiClient.get(`/rbac/roles/${id}/has-users`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to check role users');
//     }
//   }
// };

// export default roleService;

// src/services/roleService.js
import { apiClient } from '@/lib/api';

export const roleService = {
  // Get all roles with pagination and filters
  getAllRoles: async (params = {}) => {
    try {
      const response = await apiClient.get('/rbac/roles', { params });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch roles';
      throw new Error(errorMessage);
    }
  },

  // Get role by ID
  getRoleById: async (id) => {
    try {
      const response = await apiClient.get(`/rbac/roles/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch role';
      throw new Error(errorMessage);
    }
  },

  // Create new role
  createRole: async (roleData) => {
    try {
      const response = await apiClient.post('/rbac/roles', roleData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create role';
      throw new Error(errorMessage);
    }
  },

  // Update role
  updateRole: async (id, roleData) => {
    try {
      const response = await apiClient.put(`/rbac/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update role';
      throw new Error(errorMessage);
    }
  },

  // Delete role
  deleteRole: async (id) => {
    try {
      const response = await apiClient.delete(`/rbac/roles/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete role';
      throw new Error(errorMessage);
    }
  },

  // Get role permissions
  getRolePermissions: async (id) => {
    try {
      const response = await apiClient.get(`/rbac/roles/${id}/permissions`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch role permissions';
      throw new Error(errorMessage);
    }
  },

  // Update role permissions
  updateRolePermissions: async (id, permissions) => {
    try {
      const response = await apiClient.put(`/rbac/roles/${id}/permissions`, { permissions });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update role permissions';
      throw new Error(errorMessage);
    }
  },

  // Check if role has users
  checkRoleHasUsers: async (id) => {
    try {
      const response = await apiClient.get(`/rbac/roles/${id}/has-users`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to check role users';
      throw new Error(errorMessage);
    }
  }
};

export default roleService;