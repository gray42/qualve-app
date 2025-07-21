import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Qualve and how does it work?",
      answer:
        "Qualve is a comprehensive platform designed to streamline your academic workflow. It provides tools for project management, collaboration, and academic tracking to help students and educators achieve better results.",
    },
    {
      id: 2,
      question: "How much does Qualve cost?",
      answer:
        "We offer flexible pricing plans to suit different needs. Our basic plan starts at $9.99/month, with premium features available in our Pro plan at $19.99/month. We also offer student discounts and institutional pricing.",
    },
    {
      id: 3,
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial for all new users. No credit card required. You can explore all features and see how Qualve fits your needs before making any commitment.",
    },
    {
      id: 4,
      question: "Can I integrate Qualve with other tools?",
      answer:
        "Absolutely! Qualve integrates with popular tools like Google Drive, Microsoft Office, Slack, and many learning management systems. Our API also allows for custom integrations.",
    },
    {
      id: 5,
      question: "Is my data secure on Qualve?",
      answer:
        "Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with GDPR and other privacy regulations to ensure your data is always protected.",
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
