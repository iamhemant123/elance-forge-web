import React, { useState, useCallback } from "react";

const faqData = [
  {
    question: "What is ElanceForge?",
    answer:
      "ElanceForge is a digital solutions agency that helps businesses grow online through custom websites, branding, marketing, and technology-driven strategies focused on real results.",
  },
  {
    question: "What services does ElanceForge offer?",
    answer:
      "We provide website design & development, e-commerce solutions, digital marketing & lead generation, branding & UI/UX design, custom web applications, and ongoing support.",
  },
  {
    question: "Who can work with ElanceForge?",
    answer:
      "We work with startups, entrepreneurs, small businesses, and growing companies across various industries—locally and globally.",
  },
  {
    question: "How is ElanceForge different from other agencies?",
    answer:
      "We don’t sell generic packages. We first understand your business, goals, and audience, then create a tailored solution with full transparency and clear communication.",
  },
  {
    question: "Do you provide custom solutions or fixed packages?",
    answer:
      "We primarily offer custom solutions based on your needs, but we also have affordable starter packages for small businesses and early-stage startups.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Timelines depend on project scope. Basic websites usually take 7–14 days, while business websites or e-commerce platforms take around 2–6 weeks.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on features, complexity, and timeline. After discussing your requirements, we provide a clear and transparent quote with no hidden costs.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes. We provide post-launch support, maintenance, updates, and performance optimization to ensure long-term success.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="bg-gray-200 w-full">
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 w-[120px] h-[6px] bg-orange-600 rounded-full animate-pulse"
        />

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          Frequently <span className="text-orange-600">Asked Questions</span>
        </h2>

        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-orange-600 rounded"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-bold text-orange-600"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
