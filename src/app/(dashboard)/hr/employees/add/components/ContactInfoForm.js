"use client";
import { Mail, Phone, MapPin, User, PhoneCall } from 'lucide-react';
import InputField from '@/components/form/input/InputField';
import SelectField from './SelectField';
import Label from '@/components/form/Label';

export default function ContactInfoForm({ formData, errors, onChange }) {
  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'japan', label: 'Japan' },
    { value: 'china', label: 'China' },
    { value: 'brazil', label: 'Brazil' }
  ];

  const relationOptions = [
    { value: '', label: 'Select Relationship' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'friend', label: 'Friend' },
    { value: 'relative', label: 'Relative' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Contact Information
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Enter contact details and address information
            </p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Contact Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <InputField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="Enter email address"
              error={errors.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" required>
              Phone Number
            </Label>
            <InputField
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="Enter phone number"
              error={errors.phone}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alternatePhone">
              Alternate Phone Number
            </Label>
            <InputField
              id="alternatePhone"
              name="alternatePhone"
              type="tel"
              value={formData.alternatePhone}
              onChange={(e) => onChange('alternatePhone', e.target.value)}
              placeholder="Enter alternate phone"
              error={errors.alternatePhone}
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Address Information
          </h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="permanentAddress" required>
              Permanent Address
            </Label>
            <InputField
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) => onChange('permanentAddress', e.target.value)}
              placeholder="Enter permanent address"
              error={errors.permanentAddress}
              multiline
              rows={2}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsPermanent"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => {
                if (e.target.checked) {
                  onChange('currentAddress', formData.permanentAddress);
                }
              }}
            />
            <Label htmlFor="sameAsPermanent" className="text-sm text-gray-600 dark:text-gray-400">
              Same as permanent address
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAddress">
              Current Address
            </Label>
            <InputField
              id="currentAddress"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={(e) => onChange('currentAddress', e.target.value)}
              placeholder="Enter current address"
              error={errors.currentAddress}
              multiline
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City
              </Label>
              <InputField
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => onChange('city', e.target.value)}
                placeholder="Enter city"
                error={errors.city}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">
                State
              </Label>
              <InputField
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => onChange('state', e.target.value)}
                placeholder="Enter state"
                error={errors.state}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">
                PIN Code
              </Label>
              <InputField
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => onChange('pincode', e.target.value)}
                placeholder="Enter PIN code"
                error={errors.pincode}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country
              </Label>
              <SelectField
                id="country"
                name="country"
                value={formData.country}
                onChange={(value) => onChange('country', value)}
                options={countryOptions}
                error={errors.country}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <PhoneCall className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Emergency Contact
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName" required>
              Contact Name
            </Label>
            <InputField
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) => onChange('emergencyContactName', e.target.value)}
              placeholder="Enter full name"
              error={errors.emergencyContactName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelation" required>
              Relationship
            </Label>
            <SelectField
              id="emergencyContactRelation"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation}
              onChange={(value) => onChange('emergencyContactRelation', value)}
              options={relationOptions}
              error={errors.emergencyContactRelation}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone" required>
              Phone Number
            </Label>
            <InputField
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => onChange('emergencyContactPhone', e.target.value)}
              placeholder="Enter phone number"
              error={errors.emergencyContactPhone}
            />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-green-600 rounded-md flex-shrink-0 mt-0.5">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Contact Information Guidelines
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              Ensure all contact information is up-to-date and accurate. Emergency contact details are crucial for workplace safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}