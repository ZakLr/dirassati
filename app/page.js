import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
              EduManage
            </h1>
            <p className="text-gray-600 text-lg">Education Management System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Your Educational Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your personalized dashboard and explore comprehensive
            educational management tools
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {/* Admin Dashboard */}
          <Link href="/admin" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform hover:scale-105 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Admin Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive system management, analytics, and administrative
                controls
              </p>
              <div className="mt-4 text-[#667eea] font-semibold group-hover:text-[#764ba2] transition-colors">
                Access Dashboard →
              </div>
            </div>
          </Link>

          {/* Parent Dashboard */}
          <Link href="/parent" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform hover:scale-105 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Parent Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your children's progress, attendance, and academic
                performance
              </p>
              <div className="mt-4 text-[#667eea] font-semibold group-hover:text-[#764ba2] transition-colors">
                Access Dashboard →
              </div>
            </div>
          </Link>

          {/* Student Dashboard */}
          <Link href="/student" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform hover:scale-105 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Student Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                View grades, attendance records, assignments, and class
                schedules
              </p>
              <div className="mt-4 text-[#667eea] font-semibold group-hover:text-[#764ba2] transition-colors">
                Access Dashboard →
              </div>
            </div>
          </Link>

          {/* Teacher Dashboard */}
          <Link href="/teacher" className="block group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform hover:scale-105 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Teacher Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Manage classes, grade assignments, and communicate with students
                and parents
              </p>
              <div className="mt-4 text-[#667eea] font-semibold group-hover:text-[#764ba2] transition-colors">
                Access Dashboard →
              </div>
            </div>
          </Link>
        </div>

        {/* Authentication Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Get Started
            </h3>
            <p className="text-gray-600 mb-6">
              New to EduManage? Create your account or sign in to access your
              dashboard.
            </p>
            <div className="space-y-4">
              <Link
                href="/signin"
                className="block w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block w-full bg-white border-2 border-[#667eea] text-[#667eea] py-3 px-6 rounded-xl font-semibold hover:bg-[#667eea] hover:text-white transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © 2024 EduManage. Empowering Education Through Technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
