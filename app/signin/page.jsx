"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
              EduManage
            </h1>
            <p className="text-gray-600 text-sm">Education Management System</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Choose your role to continue</p>
          </div>

          {/* Role Selection Buttons */}
          <div className="space-y-4">
            <button
              className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => router.push(`/signin/parent`)}
            >
              <span>👨‍👩‍👧‍👦</span>
              Parent
            </button>

            <button
              className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => router.push(`/signin/teacher`)}
            >
              <span>👨‍🏫</span>
              Teacher
            </button>

            <button
              className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
              onClick={() => router.push(`/signin/student`)}
            >
              <span>🎓</span>
              Student
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#667eea] hover:text-[#764ba2] font-semibold transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © 2024 EduManage. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
