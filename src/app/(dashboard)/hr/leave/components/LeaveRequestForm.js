"use client";
import { useState, useEffect, useRef } from 'react';
import { X, Calendar, User, FileText, Paperclip, Download, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LeaveRequestForm = ({ isEditMode = false, initialData = null, onSave, onCancel }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    reason: '',
    days: 0,
    fromDate: '',
    toDate: '',
    startDateBreakdown: 'full_day',
    endDateBreakdown: 'full_day',
    status: 'pending',
    attachment: null,
    attachmentName: ''
  });

  const [calculatedDays, setCalculatedDays] = useState(0);
  const [existingAttachment, setExistingAttachment] = useState(null);
  
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const fileInputRef = useRef(null);

  // Update form data when initialData changes (edit mode)
  useEffect(() => {
    if (initialData) {
      // Convert date format from "11 Oct, 2023" to "2023-10-11" for input fields
      const parseDate = (dateStr) => {
        const months = {
          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
          'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        
        const parts = dateStr.split(' ');
        const day = parts[0];
        const month = months[parts[1]];
        const year = parts[2].replace(',', '');
        
        return `${year}-${month}-${day.padStart(2, '0')}`;
      };

      const formData = {
        employeeName: initialData.employeeName || '',
        leaveType: initialData.leaveType || '',
        reason: initialData.reason || '',
        days: initialData.days || 0,
        fromDate: parseDate(initialData.fromDate) || '',
        toDate: parseDate(initialData.toDate) || '',
        startDateBreakdown: initialData.startDateBreakdown || 'full_day',
        endDateBreakdown: initialData.endDateBreakdown || 'full_day',
        status: initialData.status || 'pending',
        attachment: null,
        attachmentName: initialData.attachmentName || ''
      };

      setFormData(formData);
      
      // Set existing attachment if present
      if (initialData.attachment) {
        setExistingAttachment(initialData.attachment);
      }
      
      // Calculate initial days
      calculateDays(formData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedFormData);

    // Recalculate days if date or breakdown fields change
    if (name === 'fromDate' || name === 'toDate' || 
        name === 'startDateBreakdown' || name === 'endDateBreakdown') {
      calculateDays(updatedFormData);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 
                           'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (JPEG, PNG, PDF, DOC, DOCX)');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        attachment: file,
        attachmentName: file.name
      }));
      
      // Clear existing attachment when new file is selected
      setExistingAttachment(null);
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null,
      attachmentName: ''
    }));
    setExistingAttachment(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const calculateDays = (data) => {
    if (!data.fromDate || !data.toDate) {
      setCalculatedDays(0);
      return;
    }

    const start = new Date(data.fromDate);
    const end = new Date(data.toDate);
    
    // If it's the same day, check breakdown to determine days
    if (start.toDateString() === end.toDateString()) {
      let dayCount = 0;
      
      if (data.startDateBreakdown === 'full_day') {
        dayCount = 1;
      } else {
        dayCount = 0.5;
      }
      
      setCalculatedDays(dayCount);
      return;
    }
    
    // Calculate full days between dates
    const diffTime = Math.abs(end - start);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Adjust for partial days at start and end
    if (data.startDateBreakdown !== 'full_day') {
      diffDays -= 0.5;
    }
    
    if (data.endDateBreakdown !== 'full_day') {
      diffDays -= 0.5;
    }
    
    if (!isNaN(diffDays)) {
      setCalculatedDays(diffDays);
    }
  };

  const handleBreakdownChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    calculateDays(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert dates back to the original format "11 Oct, 2023"
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    const submitData = {
      ...formData,
      days: calculatedDays,
      fromDate: formatDate(formData.fromDate),
      toDate: formatDate(formData.toDate),
      // Keep existing attachment if no new file was selected
      attachment: formData.attachment || (initialData && initialData.attachment),
      attachmentName: formData.attachmentName || (initialData && initialData.attachmentName)
    };

    onSave(submitData);
  };

  const openDatePicker = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
            {isEditMode ? 'Edit Leave Request' : 'Add New Leave Request'}
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
        {/* Employee Name (Read-only in edit mode, editable in add mode) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Employee Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {isEditMode ? (
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                readOnly
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
              />
            ) : (
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            )}
          </div>
          {isEditMode && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Employee name cannot be changed
            </p>
          )}
        </div>

        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Medical Leave">Medical Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Personal Leave">Personal Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reason
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Date Range with Calendar Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Date
            </label>
            <div className="relative">
              <input
                ref={fromDateRef}
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
              <Calendar 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" 
                onClick={() => openDatePicker(fromDateRef)}
              />
            </div>
            
            {/* Start Date Breakdown */}
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date Breakdown
              </label>
              <div className="flex space-x-2">
                {['full_day', 'first_half', 'second_half'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="startDateBreakdown"
                      checked={formData.startDateBreakdown === option}
                      onChange={() => handleBreakdownChange('startDateBreakdown', option)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {option.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Date
            </label>
            <div className="relative">
              <input
                ref={toDateRef}
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
              <Calendar 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" 
                onClick={() => openDatePicker(toDateRef)}
              />
            </div>
            
            {/* End Date Breakdown */}
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date Breakdown
              </label>
              <div className="flex space-x-2">
                {['full_day', 'first_half', 'second_half'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="endDateBreakdown"
                      checked={formData.endDateBreakdown === option}
                      onChange={() => handleBreakdownChange('endDateBreakdown', option)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {option.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Days Display */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Calculated Leave Days:
            </span>
            <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
              {calculatedDays} {calculatedDays === 1 ? 'day' : 'days'}
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Based on selected dates and breakdown options
          </p>
        </div>

        {/* Attachment Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Attachment (Optional)
          </label>
          <div className="space-y-2">
            {/* File input (hidden) */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              className="hidden"
            />
            
            {/* Upload button */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              Upload File
            </button>
            
            {/* File info and restrictions */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 5MB)
            </p>
            
            {/* Display selected file or existing attachment */}
            {(formData.attachmentName || existingAttachment) && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <div className="flex items-center">
                  <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                    {formData.attachmentName || (existingAttachment && existingAttachment.name) || 'Attachment'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {existingAttachment && (
                    <button
                      type="button"
                      onClick={() => window.open(existingAttachment.url, '_blank')}
                      className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      title="Download attachment"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove attachment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status (only in edit mode) */}
        {isEditMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

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
            {isEditMode ? 'Save Changes' : 'Create Leave Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;