'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoForm from './components/PersonalInfoForm';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProgressIndicator from './components/ProgressIndicator';
import ContactInfoForm from './components/ContactInfoForm';
import ProfessionalInfoForm from './components/ProfessionalInfoForm';
import BankingInfoForm from './components/BankingInfoForm';
import DocumentsForm from './components/DocumentsForm';
import FormNavigation from './components/FormNavigation';

const STEPS = [
  { id: 1, title: 'Personal Information', component: 'personal' },
  { id: 2, title: 'Contact Information', component: 'contact' },
  { id: 3, title: 'Professional Information', component: 'professional' },
  { id: 4, title: 'Banking Information', component: 'banking' },
  { id: 5, title: 'Documents', component: 'documents' }
];

export default function AddEmployeePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
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
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
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
  };

//   const validateStep = (step) => {
//     const newErrors = {};
    
//     switch(step) {
//       case 1:
//         if (!formData.firstName.trim())   newErrors.firstName = 'First name is required';
//         if (!formData.lastName.trim())   newErrors.lastName = 'Last name is required';
//         if (!formData.dateOfBirth)   newErrors.dateOfBirth = 'Date of birth is required';
//         if (!formData.gender)   newErrors.gender = 'Gender is required';
//         break;
        
//       case 2:
//         if (!formData.email.trim())   newErrors.email = 'Email is required';
//         if (!formData.phone.trim())   newErrors.phone = 'Phone number is required';
//         if (!formData.permanentAddress.trim())   newErrors.permanentAddress = 'Address is required';
//         if (!formData.emergencyContactName.trim())   newErrors.emergencyContactName = 'Emergency contact name is required';
//         if (!formData.emergencyContactPhone.trim())   newErrors.emergencyContactPhone = 'Emergency contact phone is required';
//         break;
        
//       case 3:
//         if (!formData.employeeId.trim())   newErrors.employeeId = 'Employee ID is required';
//         if (!formData.department)   newErrors.department = 'Department is required';
//         if (!formData.designation.trim())   newErrors.designation = 'Designation is required';
//         if (!formData.joiningDate)   newErrors.joiningDate = 'Joining date is required';
//         if (!formData.employmentType)   newErrors.employmentType = 'Employment type is required';
//         break;
        
//       case 4:
//         if (!formData.bankName.trim())   newErrors.bankName = 'Bank name is required';
//         if (!formData.accountNumber.trim())   newErrors.accountNumber = 'Account number is required';
//         if (!formData.ifscCode.trim())   newErrors.ifscCode = 'IFSC code is required';
//         break;
        
//       case 5:
//         if (!formData.aadhaarNumber.trim())   newErrors.aadhaarNumber = 'Aadhaar number is required';
//         if (!formData.panNumber.trim())   newErrors.panNumber = 'PAN number is required';
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  const handleNext = () => {
    // if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
    //   }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      console.log('Employee data to submit:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to employees list or show success message
      router.push('/hr/employees?success=Employee added successfully');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - show toast notification etc.
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

    <Breadcrumb rightContent={null} />

      {/* Progress Indicator */}
      <div className="px-6 my-8">
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
    </div>
  );
}