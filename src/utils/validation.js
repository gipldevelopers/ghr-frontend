// src/utils/validation.js - CORRECTED VERSION
export const validateEmployeeForm = (formData, currentStep) => {
  const errors = {};

  // Step 1: Personal Information validation (ONLY validate fields that are in this step)
  if (currentStep === 1) {
    if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
    
    // Remove email validation from Step 1 - it belongs to Step 2
    // if (!formData.email?.trim()) errors.email = 'Email is required';
    // else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    // Only validate phone if it's actually in Step 1, otherwise remove this too
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) errors.phone = 'Phone must be 10 digits';
  }

  // Step 2: Contact Information validation (THIS is where email should be validated)
  if (currentStep === 2) {
    // Add email validation here
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.permanentAddress?.trim()) errors.permanentAddress = 'Permanent address is required';
    if (!formData.currentAddress?.trim()) errors.currentAddress = 'Current address is required';
    
    if (formData.emergencyContactPhone && !/^[0-9]{10}$/.test(formData.emergencyContactPhone)) {
      errors.emergencyContactPhone = 'Emergency contact phone must be 10 digits';
    }
  }

  return errors;
};