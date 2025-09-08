"use client";
import { Briefcase, Calendar, User, IndianRupee, Clock, Building, Users, FileText } from 'lucide-react';
import InputField from '@/components/form/input/InputField';
import SelectField from './SelectField';
import Label from '@/components/form/Label';

export default function ProfessionalInfoForm({ formData, errors, onChange }) {
  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'research', label: 'Research & Development' },
    { value: 'production', label: 'Production' },
    { value: 'quality', label: 'Quality Assurance' },
    { value: 'logistics', label: 'Logistics' }
  ];

  const employmentTypeOptions = [
    { value: '', label: 'Select Employment Type' },
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const workLocationOptions = [
    { value: '', label: 'Select Work Location' },
    { value: 'office', label: 'Office' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const workShiftOptions = [
    { value: '', label: 'Select Work Shift' },
    { value: 'morning', label: 'Morning Shift (9 AM - 6 PM)' },
    { value: 'evening', label: 'Evening Shift (2 PM - 11 PM)' },
    { value: 'night', label: 'Night Shift (10 PM - 7 AM)' },
    { value: 'flexible', label: 'Flexible Hours' },
    { value: 'rotational', label: 'Rotational Shifts' }
  ];

  const probationPeriodOptions = [
    { value: '', label: 'Select Probation Period' },
    { value: '30', label: '30 Days' },
    { value: '60', label: '60 Days' },
    { value: '90', label: '90 Days' },
    { value: '180', label: '180 Days' },
    { value: 'none', label: 'No Probation' }
  ];

  // Generate employee ID (you can replace this with your logic)
  const generateEmployeeId = () => {
    const prefix = 'EMP';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Professional Information
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enter the employment details and professional information
            </p>
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Employment Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee ID */}
          <div className="space-y-2">
            <Label htmlFor="employeeId" required>
              Employee ID
            </Label>
            <InputField
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={(e) => onChange('employeeId', e.target.value)}
              placeholder="Enter employee ID"
              error={errors.employeeId}
              icon={<User className="w-4 h-4" />}
              endAdornment={
                <button
                  type="button"
                  onClick={() => onChange('employeeId', generateEmployeeId())}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Generate
                </button>
              }
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" required>
              Department
            </Label>
            <SelectField
              id="department"
              name="department"
              value={formData.department}
              onChange={(value) => onChange('department', value)}
              options={departmentOptions}
              error={errors.department}
            />
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label htmlFor="designation" required>
              Designation
            </Label>
            <InputField
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={(e) => onChange('designation', e.target.value)}
              placeholder="Enter designation"
              error={errors.designation}
              icon={<Briefcase className="w-4 h-4" />}
            />
          </div>

          {/* Reporting Manager */}
          <div className="space-y-2">
            <Label htmlFor="reportingManager">
              Reporting Manager
            </Label>
            <InputField
              id="reportingManager"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={(e) => onChange('reportingManager', e.target.value)}
              placeholder="Enter reporting manager"
              error={errors.reportingManager}
              icon={<Users className="w-4 h-4" />}
            />
          </div>

          {/* Joining Date */}
          <div className="space-y-2">
            <Label htmlFor="joiningDate" required>
              Joining Date
            </Label>
            <InputField
              id="joiningDate"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={(e) => onChange('joiningDate', e.target.value)}
              error={errors.joiningDate}
              icon={<Calendar className="w-4 h-4" />}
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType" required>
              Employment Type
            </Label>
            <SelectField
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={(value) => onChange('employmentType', value)}
              options={employmentTypeOptions}
              error={errors.employmentType}
            />
          </div>
        </div>
      </div>

      {/* Work Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Work Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Work Location */}
          <div className="space-y-2">
            <Label htmlFor="workLocation">
              Work Location
            </Label>
            <SelectField
              id="workLocation"
              name="workLocation"
              value={formData.workLocation}
              onChange={(value) => onChange('workLocation', value)}
              options={workLocationOptions}
              error={errors.workLocation}
            />
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <Label htmlFor="salary">
              Salary (₹)
            </Label>
            <InputField
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => onChange('salary', e.target.value)}
              placeholder="Enter salary"
              error={errors.salary}
              icon={<IndianRupee className="w-4 h-4" />}
            />
          </div>

          {/* Probation Period */}
          <div className="space-y-2">
            <Label htmlFor="probationPeriod">
              Probation Period
            </Label>
            <SelectField
              id="probationPeriod"
              name="probationPeriod"
              value={formData.probationPeriod}
              onChange={(value) => onChange('probationPeriod', value)}
              options={probationPeriodOptions}
              error={errors.probationPeriod}
            />
          </div>

          {/* Work Shift */}
          <div className="space-y-2">
            <Label htmlFor="workShift">
              Work Shift
            </Label>
            <SelectField
              id="workShift"
              name="workShift"
              value={formData.workShift}
              onChange={(value) => onChange('workShift', value)}
              options={workShiftOptions}
              error={errors.workShift}
            />
          </div>
        </div>
      </div>

      {/* Contract Details - Only show if employment type is contract */}
      {formData.employmentType === 'contract' && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Contract Details
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contract Start Date */}
            <div className="space-y-2">
              <Label htmlFor="contractStartDate" required>
                Contract Start Date
              </Label>
              <InputField
                id="contractStartDate"
                name="contractStartDate"
                type="date"
                value={formData.contractStartDate}
                onChange={(e) => onChange('contractStartDate', e.target.value)}
                error={errors.contractStartDate}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>

            {/* Contract End Date */}
            <div className="space-y-2">
              <Label htmlFor="contractEndDate" required>
                Contract End Date
              </Label>
              <InputField
                id="contractEndDate"
                name="contractEndDate"
                type="date"
                value={formData.contractEndDate}
                onChange={(e) => onChange('contractEndDate', e.target.value)}
                error={errors.contractEndDate}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-purple-600 rounded-md flex-shrink-0 mt-0.5">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Professional Information Guidelines
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
              Accurate professional information ensures proper payroll processing, department allocation, and reporting structure setup. All mandatory fields must be completed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}