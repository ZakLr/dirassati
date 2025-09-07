"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

export default function Step1({ nextStep, setParentInfo }) {
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [role, setrole] = useState("parent");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [offersChecked, setOffersChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mock function for dummy data
  async function mockRegisterUser(
    email,
    password,
    phone,
    role,
    first_name,
    last_name
  ) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful registration
    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email,
        first_name,
        last_name,
        role,
        phone_number: phone,
      },
    };
  }

  async function handleNext() {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (!first_name.trim()) {
      newErrors.first_name = "First name is required.";
    }
    if (!last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!termsChecked) {
      newErrors.terms =
        "You must agree to the Terms of use and Privacy Policy.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const res = await mockRegisterUser(
          email,
          password,
          phone,
          role,
          first_name,
          last_name
        );
        console.log("Mock registration successful:", res);
        setParentInfo({
          email,
          password,
          phone,
          termsChecked,
          offersChecked,
          role,
          first_name,
          last_name,
        });
        nextStep();
      } catch (error) {
        console.error("Mock registration failed:", error);
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">Join our educational community</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email address"
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#667eea] focus:ring-[#667eea]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password with Eye toggle */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 characters)"
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#667eea] focus:ring-[#667eea] pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* First Name */}
          <div>
            <Input
              type="text"
              placeholder="First Name"
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#667eea] focus:ring-[#667eea]"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Input
              type="text"
              placeholder="Last Name"
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#667eea] focus:ring-[#667eea]"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              className="w-full h-12 rounded-xl border-gray-200 focus:border-[#667eea] focus:ring-[#667eea]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsChecked}
              onCheckedChange={(checked) => setTermsChecked(checked)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-relaxed"
            >
              By creating an account, you agree to the{" "}
              <span className="text-[#667eea] hover:text-[#764ba2] cursor-pointer font-medium">
                Terms of use
              </span>{" "}
              and{" "}
              <span className="text-[#667eea] hover:text-[#764ba2] cursor-pointer font-medium">
                Privacy Policy
              </span>
              .
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}

          {/* Offers Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="offers"
              checked={offersChecked}
              onCheckedChange={(checked) => setOffersChecked(checked)}
              className="mt-1"
            />
            <label htmlFor="offers" className="text-sm text-gray-600">
              I want to receive emails about our offers and updates.
            </label>
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className="w-full h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:from-[#5a6fd8] hover:to-[#6b4190] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
