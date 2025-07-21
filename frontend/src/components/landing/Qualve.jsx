import { Link } from "react-router-dom";

export default function Qualve() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-slate-800 text-transparent md:text-5xl">
            What is Qualve?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            An academic social networking platform designed to bridge learning
            disconnects and foster real conversations between students.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Ask and Answer */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm">
              <div className="mb-6 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-2xl font-bold text-slate-900">
                  Ask and Answer!
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-slate-700">
                Qualve is an academic social networking platform designed to
                bridge learning disconnects and substitute AI usage. We offer
                opportunities for real academic conversations and discussions,
                providing a platform for previously disconnected students to be
                curious and supportive, fostering an exciting new learning
                environment.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-sm">
              <div className="mb-6 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-2xl font-bold text-slate-900">
                  How do I use Qualve?
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      1
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-slate-900">Sign Up</h4>
                      <p className="text-slate-600">
                        Use your student email to verify your account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      2
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-slate-900">
                        Customize Profile
                      </h4>
                      <p className="text-slate-600">
                        Select your academic interests and experiences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      3
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-slate-900">
                        Ask & Answer
                      </h4>
                      <p className="text-slate-600">
                        Search questions or ask your own
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      4
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-slate-900">
                        Stay Connected
                      </h4>
                      <p className="text-slate-600">
                        Check notifications for conversation updates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      5
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-slate-900">
                        Build Reputation
                      </h4>
                      <p className="text-slate-600">
                        Accumulate points and climb the rankings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      6
                    </span>
                    <div className="ml-3">
                      <h4 className="font-semibold text-yellow-800">
                        Get Rewarded
                      </h4>
                      <p className="text-slate-600">
                        Transfer reputation into service hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student to Student */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-sm">
              <div className="mb-6 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="ml-4 text-2xl font-bold text-slate-900">
                  From Student, to Student
                </h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-slate-900">
                    Who do I ask?
                  </h4>
                  <p className="text-slate-700">
                    With so many options to find for academic support, such as
                    parents, teachers, and AI, turn to those who know best,
                    <i>
                      <b> students</b>
                    </i>
                    . Learn from those who were and are in your very own shoes.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-slate-900">
                    Make Connections
                  </h4>
                  <p className="text-slate-700">
                    Create meaningful conversations with like-minded students.
                    Expand your social and academic outreach to help and learn
                    from others.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mx-auto max-w-4xl border-b border-slate-400 pb-24 text-center">
            <div className="">
              <h2 className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-xl font-bold text-transparent md:text-5xl">
                Qualve is at *SCHOOL*
              </h2>
              <p className="mb-6 text-xl text-slate-900">
                We are ecstatic to bring Qualve to your school's students! Join
                us to create an academic community of social support!
              </p>
              <Link to="/register">
                <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl">
                  Join Now!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
