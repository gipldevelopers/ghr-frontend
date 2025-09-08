"use client";
import { Upload, FileText, User, X, Eye, Download, CheckCircle, IdCard, GraduationCap, Check } from 'lucide-react';
import { useState } from 'react';
import InputField from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

export default function DocumentsForm({ formData, errors, onChange }) {
  const [uploadedFiles, setUploadedFiles] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    panDocument: null,
    photo: null,
    resume: null,
    educationCertificates: []
  });

  const handleFileUpload = (field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFiles(prev => ({
        ...prev,
        [field]: {
          file,
          preview: reader.result,
          name: file.name,
          size: file.size,
          type: file.type
        }
      }));
      onChange(field, file);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (field) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: null
    }));
    onChange(field, null);
  };

  const handleEducationCertificateUpload = (files) => {
    const newCertificates = Array.from(files).map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type
      };
    });

    setUploadedFiles(prev => ({
      ...prev,
      educationCertificates: [...prev.educationCertificates, ...newCertificates]
    }));
    onChange('educationCertificates', [...uploadedFiles.educationCertificates, ...newCertificates]);
  };

  const removeEducationCertificate = (index) => {
    const updatedCertificates = uploadedFiles.educationCertificates.filter((_, i) => i !== index);
    setUploadedFiles(prev => ({
      ...prev,
      educationCertificates: updatedCertificates
    }));
    onChange('educationCertificates', updatedCertificates);
  };

  const FileUploadField = ({ label, field, accept, required, description, multiple }) => (
    <div className="space-y-3">
      <Label htmlFor={field} required={required}>
        {label}
      </Label>
      
       {/* For Aadhaar Front & Back (special handling) */}
    {field === 'aadhaarFront' || field === 'aadhaarBack' ? (
      <>
      {uploadedFiles[field] ? (
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                {uploadedFiles[field].name}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                {(uploadedFiles[field].size / 1024 / 1024).toFixed(2)} MB
              </p>
               <p className="text-xs text-gray-500 dark:text-gray-400">
                  {field === 'aadhaarFront' ? 'Front Side' : 'Back Side'}
               </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.open(uploadedFiles[field].preview, '_blank')}
              className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => removeFile(field)}
              className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
          <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Click to upload {field === 'aadhaarFront' ? 'front' : 'back'} side
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {description || 'JPG, PNG up to 10MB'}
            </p>
            <input
              type="file"
              id={field}
              className="hidden"
              accept={accept}
              onChange={(e) => e.target.files[0] && handleFileUpload(field, e.target.files[0])}
              required={required && !uploadedFiles[field]}
            />
          </label>
        )}
      </>
    ) : (
        <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {description || 'PDF, JPG, PNG up to 10MB'}
          </p>
          <input
            type="file"
            id={field}
            className="hidden"
            accept={accept}
            onChange={(e) => e.target.files[0] && handleFileUpload(field, e.target.files[0])}
            required={required}
          />
        </label>
      )}
      
      {errors[field] && (
        <p className="text-sm text-red-600 dark:text-red-400">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Documents & Verification
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Upload required documents for employee verification
            </p>
          </div>
        </div>
      </div>

      {/* Government ID Documents */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <IdCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Government ID Documents
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Aadhaar Number */}
          <div className="space-y-2">
            <Label htmlFor="aadhaarNumber" required>
              Aadhaar Number
            </Label>
            <InputField
              id="aadhaarNumber"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={(e) => onChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 12-digit Aadhaar number"
              error={errors.aadhaarNumber}
              maxLength={12}
              pattern="[0-9]{12}"
            />
          </div>

          {/* PAN Number */}
          <div className="space-y-2">
            <Label htmlFor="panNumber" required>
              PAN Number
            </Label>
            <InputField
              id="panNumber"
              name="panNumber"
              value={formData.panNumber}
              onChange={(e) => onChange('panNumber', e.target.value.toUpperCase())}
              placeholder="Enter PAN number"
              error={errors.panNumber}
              maxLength={10}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              className="uppercase"
            />
          </div>

          {/* Passport Number */}
          <div className="space-y-2">
            <Label htmlFor="passportNumber">
              Passport Number
            </Label>
            <InputField
              id="passportNumber"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={(e) => onChange('passportNumber', e.target.value.toUpperCase())}
              placeholder="Enter passport number"
              error={errors.passportNumber}
              className="uppercase"
            />
          </div>

          {/* Driving License Number */}
          <div className="space-y-2">
            <Label htmlFor="drivingLicense">
              Driving License Number
            </Label>
            <InputField
              id="drivingLicense"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={(e) => onChange('drivingLicense', e.target.value.toUpperCase())}
              placeholder="Enter driving license number"
              error={errors.drivingLicense}
              className="uppercase"
            />
          </div>

          {/* Voter ID Number */}
          <div className="space-y-2">
            <Label htmlFor="voterIdNumber">
              Voter ID Number
            </Label>
            <InputField
              id="voterIdNumber"
              name="voterIdNumber"
              value={formData.voterIdNumber}
              onChange={(e) => onChange('voterIdNumber', e.target.value.toUpperCase())}
              placeholder="Enter voter ID number"
              error={errors.voterIdNumber}
              className="uppercase"
            />
          </div>
        </div>
      </div>

      {/* Document Uploads */}
      {/* Document Uploads */}
<div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
  <div className="flex items-center gap-2 mb-6">
    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    <h3 className="font-medium text-gray-900 dark:text-white">
      Document Uploads
    </h3>
  </div>
  
  <div className="grid grid-cols-1 gap-6">
    {/* Aadhaar Card Front & Back in one row */}
    <div className="space-y-3">
      <Label required>
        Aadhaar Card (Front & Back)
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUploadField
          label="Front Side"
          field="aadhaarFront"
          accept=".jpg,.jpeg,.png"
          required
        />
        <FileUploadField
          label="Back Side"
          field="aadhaarBack"
          accept=".jpg,.jpeg,.png"
          required
        />
      </div>
    </div>

    {/* PAN Card */}
    <FileUploadField
      label="PAN Card"
      field="panDocument"
      accept=".pdf,.jpg,.jpeg,.png"
      required
    />

    {/* Passport Photo */}
    <FileUploadField
      label="Passport Photo"
      field="photo"
      accept=".jpg,.jpeg,.png"
      required
      description="Recent passport size photo (2x2 inches)"
    />

    {/* Resume/CV */}
    <FileUploadField
      label="Resume/CV"
      field="resume"
      accept=".pdf,.doc,.docx"
      description="PDF or Word document"
    />
  </div>
</div>

      {/* Education Certificates */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Education Certificates
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="educationCertificates">
              Upload Education Certificates
            </Label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Upload education certificates (Multiple files allowed)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                PDF, JPG, PNG up to 10MB each
              </p>
              <input
                type="file"
                id="educationCertificates"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => handleEducationCertificateUpload(e.target.files)}
              />
            </label>
          </div>

          {uploadedFiles.educationCertificates.length > 0 && (
            <div className="space-y-2">
              <Label>
                Uploaded Certificates ({uploadedFiles.educationCertificates.length})
              </Label>
              {uploadedFiles.educationCertificates.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                      {cert.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducationCertificate(index)}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Verification Checklist
          </h3>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                I verify that all documents are authentic and belong to the employee
              </span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                I have physically verified the original documents
              </span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                All uploaded documents are clear and readable
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Document Status */}
      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Document Status
          </h3>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Document Status
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {uploadedFiles.aadhaarDocument && uploadedFiles.panDocument && uploadedFiles.photo 
                    ? 'All required documents uploaded' 
                    : 'Pending documents: ' + [
                        !uploadedFiles.aadhaarDocument && 'Aadhaar Card',
                        !uploadedFiles.panDocument && 'PAN Card',
                        !uploadedFiles.photo && 'Photo'
                      ].filter(Boolean).join(', ')
                  }
                </p>
              </div>
            </div>
            
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Download className="w-4 h-4" />
              Download Checklist
            </button>
          </div>
        </div>
      </div> */}

      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Document Status
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {uploadedFiles.aadhaarFront && uploadedFiles.aadhaarBack && uploadedFiles.panDocument && uploadedFiles.photo 
            ? 'All required documents uploaded' 
            : 'Pending documents: ' + [
                !uploadedFiles.aadhaarFront && 'Aadhaar Front',
                !uploadedFiles.aadhaarBack && 'Aadhaar Back',
                !uploadedFiles.panDocument && 'PAN Card',
                !uploadedFiles.photo && 'Photo'
              ].filter(Boolean).join(', ')
          }
        </p>
      </div>
    </div>
    
    <button
      type="button"
      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      <Download className="w-4 h-4" />
      Download Checklist
    </button>
  </div>
</div>

      {/* Info Card */}
      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-orange-600 rounded-md flex-shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
              Document Upload Guidelines
            </p>
            <ul className="text-xs text-orange-700 dark:text-orange-300 mt-1 space-y-1">
              <li>• Ensure documents are clear and all details are visible</li>
              <li>• Maximum file size: 10MB per document</li>
              <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
              <li>• Aadhaar card: Upload both front and back sides</li>
              <li>• Photo: Recent passport size (2x2 inches)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}