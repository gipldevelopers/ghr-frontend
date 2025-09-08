"use client";
import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const LeaveTypeForm = ({ initialData = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    icon: initialData?.icon || '🏖️',
    isPaid: initialData?.isPaid ?? true,
    limitDays: initialData?.limitDays || 0,
    requireAttachment: initialData?.requireAttachment ?? false,
    isEncashable: initialData?.isEncashable ?? false,
    description: initialData?.description || '',
    accrualRate: initialData?.accrualRate || '',
    carryOver: initialData?.carryOver || '',
    eligibility: initialData?.eligibility || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const iconOptions = [
    { value: '🏖️', label: 'Vacation' },
    { value: '🤒', label: 'Sick' },
    { value: '👶', label: 'Maternity' },
    { value: '👨‍👦', label: 'Paternity' },
    { value: '⏸️', label: 'Unpaid' },
    { value: '🚨', label: 'Emergency' },
    { value: '🎓', label: 'Study' },
    { value: '🙏', label: 'Religious' },
    { value: '❤️', label: 'Compassionate' },
    { value: '⚖️', label: 'Jury Duty' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={onCancel}
            className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {initialData ? 'Edit Leave Type' : 'Add New Leave Type'}
          </h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Leave Type Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {iconOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.value} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Describe the purpose of this leave type"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Limit Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Limit (Days) *
            </label>
            <input
              type="number"
              name="limitDays"
              value={formData.limitDays}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Accrual Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Accrual Rate (Optional)
            </label>
            <input
              type="text"
              name="accrualRate"
              value={formData.accrualRate}
              onChange={handleChange}
              placeholder="e.g., 1.75 days per month"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Carry Over */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Carry Over Policy (Optional)
            </label>
            <input
              type="text"
              name="carryOver"
              value={formData.carryOver}
              onChange={handleChange}
              placeholder="e.g., Up to 5 days"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Eligibility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Eligibility (Optional)
            </label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="e.g., After 6 months of employment"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Paid Leave</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="requireAttachment"
              checked={formData.requireAttachment}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Require Attachment</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="isEncashable"
              checked={formData.isEncashable}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Encashment Available</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Save Changes' : 'Create Leave Type'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveTypeForm;