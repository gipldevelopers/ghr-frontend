"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { roleService } from '@/services/roleService';
import { toast } from 'sonner';

const PermissionManager = ({ roleId, roleName }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    fetchRolePermissions();
  }, [roleId]);

  const fetchRolePermissions = async () => {
    try {
      setIsLoading(true);
      const response = await roleService.getRolePermissions(roleId);
      
      if (response.success) {
        setPermissions(response.data);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error(error.message || 'Failed to fetch permissions');
      
      // Set default empty permissions structure
      setPermissions({
        Employee: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Holidays: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Leaves: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Events: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Sales: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Training: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Reports: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Tickets: { read: false, write: false, create: false, delete: false, import: false, export: false },
        Payroll: { read: false, write: false, create: false, delete: false, import: false, export: false }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionChange = (module, permission, value) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: value
      }
    }));
  };

  const handleModuleAllChange = (module, value) => {
    setPermissions(prev => ({
      ...prev,
      [module]: Object.keys(prev[module]).reduce((acc, key) => {
        acc[key] = value;
        return acc;
      }, {})
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await roleService.updateRolePermissions(roleId, permissions);
      toast.success('Permissions updated successfully');
      
      // Redirect back to roles list after successful submission
      router.push('/super-admin/roles-permissions');
      router.refresh();
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast.error(error.message || 'Failed to save permissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  const permissionTypes = ["read", "write", "create", "delete", "import", "export"];
  const permissionLabels = {
    read: "Read",
    write: "Write", 
    create: "Create",
    delete: "Delete",
    import: "Import",
    export: "Export"
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      {/* Header with title and back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push('/super-admin/roles-permissions')}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Go back"
          disabled={isSubmitting}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Permission Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Role: {roleName}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Modules
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  Allow All
                </th>
                {permissionTypes.map(permission => (
                  <th key={permission} className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    {permissionLabels[permission]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(permissions).map(([module, modulePermissions]) => {
                const allChecked = Object.values(modulePermissions).every(Boolean);
                const someChecked = Object.values(modulePermissions).some(Boolean);

                return (
                  <tr key={module} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {module}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = someChecked && !allChecked;
                          }
                        }}
                        onChange={(e) => handleModuleAllChange(module, e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    {permissionTypes.map(permission => (
                      <td key={permission} className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={modulePermissions[permission] || false}
                          onChange={(e) => handlePermissionChange(module, permission, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            type="button"
            onClick={() => router.push('/super-admin/roles-permissions')}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 text-center"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSubmitting ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionManager;