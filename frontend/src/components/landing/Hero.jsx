import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 px-8 text-center text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white blur-xl"></div>
        <div className="absolute bottom-20 right-20 h-32 w-32 rounded-full bg-white blur-xl"></div>
        <div className="absolute left-1/4 top-1/2 h-16 w-16 rounded-full bg-white blur-lg"></div>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Main heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Build Your
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Academic Network
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-blue-100 md:text-2xl">
          Ask and answer <i>real</i> questions from <i>real</i> students. <br />
          Foster learning in <i>your</i> classes.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/register">
            <button className="transform rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
