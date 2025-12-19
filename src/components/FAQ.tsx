import React, { useState } from "react";

const faqs = [
  {
    question: "How much does a Destination Wedding in India cost?",
    answer:
      "The cost depends on the location, guest count, and services included. On average, luxury Indian weddings can range from $50,000 to several hundred thousand dollars.",
  },
  {
    question: "How do I start to plan my Indian Wedding?",
    answer:
      "Start by choosing your destination city or state in India, then connect with a wedding planner who can help with venues, legalities, and cultural traditions.",
  },
  {
    question: "How long do Indian Wedding ceremonies take?",
    answer:
      "Traditional Indian wedding ceremonies usually last 2–3 hours, but the overall celebration often spans 2–5 days with multiple events.",
  },
  {
    question: "Can foreigners get married in India?",
    answer:
      "Yes! Foreigners can legally marry in India with proper documentation. Wedding planners usually guide you through the process.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-6">
            Check out the most frequently asked questions for<br />a wedding in India
            as a guide to help you organize<br /> your dream Indian wedding.
          </p>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition border ${
                  isOpen ? "border-black" : "border-gray-200"
                }`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <div
                  className={`mt-2 text-gray-600 transition-all duration-300 ease-in-out transform origin-top ${
                    isOpen
                      ? "opacity-100 scale-y-100 max-h-96"
                      : "opacity-0 scale-y-0 max-h-0"
                  }`}
                  style={{ overflow: "hidden" }}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
