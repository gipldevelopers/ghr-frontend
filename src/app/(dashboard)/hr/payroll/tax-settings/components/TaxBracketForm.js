// src/app/(dashboard)/hr/payroll/tax-settings/components/TaxBracketForm.js
"use client";
import { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TaxBracketForm = ({ bracket = null, onSubmit, onCancel }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    minIncome: 0,
    maxIncome: null,
    rate: 0,
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (bracket) {
      setFormData({
        minIncome: bracket.minIncome || 0,
        maxIncome: bracket.maxIncome || null,
        rate: bracket.rate || 0,
        description: bracket.description || ''
      });
    }
  }, [bracket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'minIncome' || name === 'maxIncome' || name === 'rate' 
        ? (value === '' ? null : parseFloat(value)) 
        : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.minIncome < 0) {
      newErrors.minIncome = 'Minimum income cannot be negative';
    }
    
    if (formData.maxIncome !== null && formData.maxIncome <= formData.minIncome) {
      newErrors.maxIncome = 'Maximum income must be greater than minimum income';
    }
    
    if (formData.rate < 0 || formData.rate > 100) {
      newErrors.rate = 'Tax rate must be between 0 and 100';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Success handling is done in parent component
    } catch (error) {
      console.error('Error saving tax bracket:', error);
      setErrors({ submit: 'Failed to save tax bracket. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 mr-4 transition dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {bracket ? 'Edit Tax Bracket' : 'Add New Tax Bracket'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Minimum Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Income ($) *
            </label>
            <input
              type="number"
              name="minIncome"
              value={formData.minIncome || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.minIncome ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.minIncome && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minIncome}</p>
            )}
          </div>

          {/* Maximum Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum Income ($)
            </label>
            <input
              type="number"
              name="maxIncome"
              value={formData.maxIncome || ''}
              onChange={handleChange}
              placeholder="Leave empty for no limit"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.maxIncome ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.maxIncome && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.maxIncome}</p>
            )}
          </div>

          {/* Tax Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tax Rate (%) *
            </label>
            <input
              type="number"
              step="0.1"
              name="rate"
              value={formData.rate || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.rate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.rate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rate}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., First bracket, Second bracket, etc."
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? 'Saving...' : (bracket ? 'Update Bracket' : 'Add Bracket')}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">About Tax Brackets</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Tax brackets define the income ranges and corresponding tax rates. The minimum income is required, 
          while maximum income can be left empty to indicate no upper limit. Tax rates should be expressed as 
          percentages (e.g., 10 for 10%).
        </p>
      </div>
    </div>
  );
};

export default TaxBracketForm;