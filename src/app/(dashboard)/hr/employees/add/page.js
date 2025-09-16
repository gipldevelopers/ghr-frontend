// src/app/(dashboard)/hr/employees/add/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoForm from './components/PersonalInfoForm';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProgressIndicator from './components/ProgressIndicator';
import ContactInfoForm from './components/ContactInfoForm';
import ProfessionalInfoForm from './components/ProfessionalInfoForm';
import BankingInfoForm from './components/BankingInfoForm';
import DocumentsForm from './components/DocumentsForm';
import FormNavigation from './components/FormNavigation';
import FormRecoveryModal from '@/components/form/FormRecoveryModal';
import { toast } from 'sonner';
import employeeService from '@/services/employeeService';
import { validateEmployeeForm } from '@/utils/validation';

const STEPS = [
  { id: 1, title: 'Personal Information', component: 'personal' },
  { id: 2, title: 'Contact Information', component: 'contact' },
  { id: 3, title: 'Professional Information', component: 'professional' },
  { id: 4, title: 'Banking Information', component: 'banking' },
  { id: 5, title: 'Documents', component: 'documents' }
];

const STORAGE_KEY = 'hrms_employee_form_data';

// Default form data structure
const defaultFormData = {
  // Personal Information
  profilePhoto: null,
  firstName: '',
  lastName: '',
  middleName: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  bloodGroup: '',
  nationality: '',
  religion: '',
  
  // Contact Information
  email: '',
  phone: '',
  alternatePhone: '',
  permanentAddress: '',
  currentAddress: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  
  // Emergency Contact
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  
  // Professional Information
  employeeId: '',
  department: '',
  designation: '',
  reportingManager: '',
  joiningDate: '',
  employmentType: '',
  workLocation: '',
  salary: '',
  probationPeriod: '',
  workShift: '',
  
  // Banking Information
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  accountHolderName: '',
  branchName: '',
  
  // Documents
  aadhaarNumber: '',
  panNumber: '',
  passportNumber: '',
  drivingLicense: '',
  voterIdNumber: '',
  aadhaarDocument: null,
  panDocument: null,
  photo: null,
  resume: null,
  educationCertificates: []
};

export default function AddEmployeePage() {
   const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  // Load saved data on component mount
  // useEffect(() => {
  //   const loadSavedData = () => {
  //     try {
  //       const saved = localStorage.getItem(STORAGE_KEY);
  //       if (saved) {
  //         setShowRecoveryModal(true);
  //         const parsedData = JSON.parse(saved);
  //         setFormData(parsedData.formData || defaultFormData);
  //         setCurrentStep(parsedData.currentStep || 1);
          
  //         // Show recovery message
  //         toast.success('Previous form data recovered');
  //       }
  //     } catch (error) {
  //       console.error('Error loading saved form data:', error);
  //       clearFormData(); // Clear corrupted data
  //     }
  //   };

  //   loadSavedData();
  // }, []);

   useEffect(() => {
    const loadSavedData = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsedData = JSON.parse(saved);
          setFormData(parsedData.formData || defaultFormData);
          setCurrentStep(parsedData.currentStep || 1);
          setIsDataLoaded(true); // Mark data as loaded
          setShowRecoveryModal(true);
        } else {
          setIsDataLoaded(true); // No saved data, but still mark as loaded
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
        clearFormData();
        setIsDataLoaded(true);
      }
    };

    loadSavedData();
  }, []);

  // Auto-save with debouncing
  useEffect(() => {
    const saveData = () => {
      try {
        const dataToSave = {
          formData,
          currentStep,
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        setLastSaved(new Date());
        setIsSaved(true);
        
        // Auto-hide saved indicator after 2 seconds
        setTimeout(() => setIsSaved(false), 2000);
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    };

    // Debounce the save operation
    const timeoutId = setTimeout(saveData, 1000); // Save after 1 second of inactivity
    return () => clearTimeout(timeoutId);
  }, [formData, currentStep]);

  // Clear form data from storage
  const clearFormData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
    setCurrentStep(1);
    setErrors({});
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    // Validate current step before proceeding
    const stepErrors = validateEmployeeForm(formData, currentStep);

    console.log('Current step:', currentStep);
    console.log('Form data:', formData);
    console.log('Validation errors:', stepErrors);
    console.log('Error count:', Object.keys(stepErrors).length);

     if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast.error('Please fix the errors before proceeding');
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, formData]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        // Convert string numbers to actual numbers
        salary: formData.salary ? parseFloat(formData.salary) : null,
        // Convert dates to ISO format
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        joiningDate: formData.joiningDate ? new Date(formData.joiningDate).toISOString() : null,
        // Ensure createUser is boolean
        createUser: Boolean(formData.createUser)
      };

      // Call the API
      const response = await employeeService.createEmployee(submitData);
      
      // Clear saved data on successful submission
      clearFormData();
      
      // Show success message and redirect
      toast.success('Employee created successfully!');
      router.push('/hr/employees');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.field] = err.message;
        });
        setErrors(validationErrors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error(error.message || 'Failed to create employee. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manual save function (optional)
  const handleManualSave = useCallback(() => {
    const dataToSave = {
      formData,
      currentStep,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    setLastSaved(new Date());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    toast.success('Form progress saved');
  }, [formData, currentStep]);
  

  // Render step content
  const renderStepContent = useCallback(() => {
     if (!isDataLoaded) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    switch(currentStep) {
      case 1:
        return (
          <PersonalInfoForm 
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ContactInfoForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ProfessionalInfoForm 
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <BankingInfoForm 
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <DocumentsForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  }, [currentStep, formData, errors, handleInputChange, isDataLoaded]);

  const handleRecover = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData.formData || defaultFormData);
        setCurrentStep(parsedData.currentStep || 1);
        toast.success('Form data recovered successfully');
      }
    } catch (error) {
      console.error('Error recovering form data:', error);
      toast.error('Failed to recover form data');
    } finally {
      setShowRecoveryModal(false);
    }
  };

  const handleDiscard = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowRecoveryModal(false);
    toast.info('Previous form data discarded');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb rightContent={null} />

      {/* Save Status Indicator */}
      <div className="px-6 pt-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {isSaved && (
              <span className="text-green-600 dark:text-green-400">✓ Saved</span>
            )}
            {lastSaved && (
              <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleManualSave}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              Save Progress
            </button>
            <button
              onClick={clearFormData}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 my-6">
        <ProgressIndicator 
          steps={STEPS}
          currentStep={currentStep}
        />
      </div>

      {/* Form Container */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Step Content */}
            <div className="p-8">
              {renderStepContent()}
            </div>

            {/* Form Navigation */}
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
              <FormNavigation
                currentStep={currentStep}
                totalSteps={STEPS.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                canProceed={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Modal */}
      <FormRecoveryModal
        isOpen={showRecoveryModal}
        onRecover={handleRecover}
        onDiscard={handleDiscard}
      />

    </div>
  );
}