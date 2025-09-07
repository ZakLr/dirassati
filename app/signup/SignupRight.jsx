export default function SignupRight() {
  return (
    <div className="w-1/2 bg-gradient-to-br from-[#667eea] to-[#764ba2] flex flex-col justify-center items-center text-white p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-10 h-10 bg-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <img
            src="/signup-image.png"
            alt="Education Illustration"
            className="w-64 h-64 object-contain mx-auto filter drop-shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-bold mb-4 leading-tight">
          Join Our Educational Community
        </h2>

        <p className="text-lg text-white/90 max-w-md leading-relaxed">
          Connect with teachers, track your child's progress, and be part of a
          comprehensive education management system that puts learning first.
        </p>

        {/* Feature Highlights */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-white/90">
            <span className="text-xl">📊</span>
            <span>Real-time progress tracking</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <span className="text-xl">📅</span>
            <span>Easy schedule management</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <span className="text-xl">💬</span>
            <span>Direct communication with teachers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
