"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Checkbox from "@/components/form/input/Checkbox";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Static credentials for HR login
  const hrCredentials = {
    email: "hr@gipl.com",
    password: "hr123"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if credentials match the static HR credentials
    if (formData.email === hrCredentials.email && formData.password === hrCredentials.password) {
      console.log("HR login successful");
      // Redirect to HR dashboard
      router.push("/hr/dashboard");
    } else {
      setError("Invalid email or password. Use hr@gipl.com / hr123");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto">
      <div className="flex flex-col justify-center flex-1">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to access your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-300">
                  {error}
                </div>
              )}
              
              <div>
                <Label htmlFor="email">
                  Email <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <InputField 
                    id="email"
                    name="email"
                    placeholder="your.email@company.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <InputField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="remember"
                    checked={isChecked} 
                    onChange={setIsChecked} 
                  />
                   <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                </div>
              </div>
              
              <div>
                <Button type="submit" className="w-full" size="sm">
                  Sign In
                </Button>
              </div>
            </div>
          </form>

           <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start flex justify-between">
                Can&apos;t remember password?{""}
                <Link
                  href="/forgot-password"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}