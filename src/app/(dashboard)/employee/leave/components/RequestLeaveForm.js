"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";

export default function RequestLeaveForm() {
  const [form, setForm] = useState({
    leaveType: "",
    optionalHoliday: "",
    effectiveFrom: "",
    effectiveTo: "",
    selectedCcList: "",
    remark: "",
    proof: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.leaveType) newErrors.leaveType = "Leave type is required.";
    if (!form.effectiveFrom) newErrors.effectiveFrom = "Start date is required.";
    if (!form.effectiveTo) newErrors.effectiveTo = "End date is required.";
    if (
      form.effectiveFrom &&
      form.effectiveTo &&
      form.effectiveTo < form.effectiveFrom
    ) {
      newErrors.effectiveTo = "End date cannot be earlier than start date.";
    }
    if (!form.remark) newErrors.remark = "Remarks are required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("✅ Leave request submitted!");
      console.log("Submitted:", form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 dark:bg-gray-800 rounded-2xl shadow-lg w-full space-y-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
        Submit Leave Request
      </h3>

      {/* Leave Type */}
      <div>
        <legend className="font-medium text-gray-700 dark:text-gray-300">
          Leave Type Name <span className="text-red-500">*</span>
        </legend>
        <select
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="">Please Select Leave Type</option>
          <option value="sick">Sick Leave</option>
          <option value="vacation">Vacation</option>
          <option value="personal">Personal</option>
        </select>
        {errors.leaveType && (
          <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>
        )}
      </div>

      {/* Start & End Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <legend className="font-medium text-gray-700 dark:text-gray-300">
            Select From Date <span className="text-red-500">*</span>
          </legend>
          <input
            type="date"
            name="effectiveFrom"
            value={form.effectiveFrom}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.effectiveFrom && (
            <p className="text-red-500 text-sm mt-1">{errors.effectiveFrom}</p>
          )}
        </div>
        <div>
          <legend className="font-medium text-gray-700 dark:text-gray-300">
            Select To Date <span className="text-red-500">*</span>
          </legend>
          <input
            type="date"
            name="effectiveTo"
            value={form.effectiveTo}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.effectiveTo && (
            <p className="text-red-500 text-sm mt-1">{errors.effectiveTo}</p>
          )}
        </div>
      </div>

      {/* CC Field */}
      <div>
  <legend className="font-medium text-gray-700 dark:text-gray-300 mb-2">
    Cc:
  </legend>

  <select
    name="selectedCcList"
    value={form.selectedCcList}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
  >
    <option value="">Please Select Cc Admin Or Supervisor</option>
    <option value="john_doe">John Doe (Supervisor)</option>
    <option value="jane_smith">Jane Smith (Manager)</option>
    <option value="robert_brown">Robert Brown (HR)</option>
    <option value="emily_white">Emily White (Team Lead)</option>
  </select>
</div>


      {/* Remarks */}
      <div>
        <legend className="font-medium text-gray-700 dark:text-gray-300">
          Remarks <span className="text-red-500">*</span>
        </legend>
        <textarea
          name="remark"
          value={form.remark}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.remark && (
          <p className="text-red-500 text-sm mt-1">{errors.remark}</p>
        )}
      </div>

      {/* Proof */}
<div>
  <legend className="font-medium text-gray-700 dark:text-gray-300 mb-2">
    Attach Proof Document:
  </legend>

  <label className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700 transition shadow-sm">
    Upload
    <input
      type="file"
      name="proof"
      onChange={handleChange}
      className="hidden"
    />
  </label>

  {form.proof && (
    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
      📄 {form.proof.name}
    </p>
  )}
</div>



      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
