import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Qualve and how does it work?",
      answer:
        "Qualve is an interactive academic forum for students to share and answer questions related to their studies, designed to allow older students to provide meaningful insight to younger students in common classes. Qualve aims to build authentic discourse to drive positive learning, while also identifying areas of general academic strength and weakness.",
    },
    {
      id: 2,
      question: "Why should I use Qualve?",
      answer:
        "Qualve is your academic companion. With the knowledge of students who were once in your own shoes, puzzling problems and general questions are easy to ask and solve. Qualve allows you to engage with students typically outside of your communication zone. The process of formulating a thoughtful question is a progression to advanced criticial thinking, allowing real learning to occur.",
    },
    {
      id: 3,
      question: "How do I use Qualve?",
      answer:
        "To use Qualve, register with your school email address and verify your account. Then, fill out your personal information, and begin browsing or answering questions!",
    },

    {
      id: 4,
      question: "Is my data secure on Qualve?",
      answer:
        "Privacy is our top priority. All users are monitored to ensure academic integrity and to record analytics.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 pt-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about Qualve.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100"
              >
                <h3 className="pr-4 text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
