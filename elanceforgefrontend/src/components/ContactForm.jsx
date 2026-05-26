import React, { useState, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import AnimatedButton from "../components/AnimatedButton";

const subjectOptions = [
      "Graphic Designing",
      "Video Editing",
      "Motion Graphics",
      "Google / Meta Ads",
      "Digital Marketing",
      "Brand Strategy",
      "Lead Generation",
      "SEO",
      "WordPress Website",
      "Custom Website (MERN)",
];

const initialState = {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const numberRegex = /\d/;

const ContactForm = ({ onClose }) => {

      const [formData, setFormData] = useState(initialState);

      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const [loading, setLoading] = useState(false);

      const handleChange = useCallback((e) => {

            const { name, value } = e.target;

            if ((name === "name" || name === "subject") && numberRegex.test(value)) {

                  setError("Numbers are not allowed here");

                  return;

            }

            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));

            setError("");

      }, []);

      const handleSubmit = async (e) => {

            e.preventDefault();

            if (!emailRegex.test(formData.email)) {
                  return setError("Please enter a valid email address");
            }

            if (formData.message.trim().length < 10) {
                  return setError("Message must be at least 10 characters long");
            }

            setLoading(true);
            setError("");
            setSuccess("");

            try {

                  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                  });

                  const data = await response.json().catch(() => ({}));

                  if (!response.ok) {
                        throw new Error(data.message || "Something went wrong");
                  }


                  // SUCCESS RESPONSE FROM BACKEND

                  setSuccess("Thank You For Contacting ElanceForge ");


                  // FORM RESET INSTANTLY

                  setFormData(initialState);


                  // AUTO HIDE POPUP

                  setTimeout(() => {

                        setSuccess("");

                        if (onClose) {
                              onClose();
                        }

                  }, 3000);

            } catch (err) {

                  setError(err.message || "Failed to send message");

            } finally {

                  setLoading(false);

            }

      };

      return (

            <div className="relative">

                  {/* SUCCESS POPUP */}

                  {success && (

                        <div className="fixed top-5 right-5 left-5 sm:left-auto z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-semibold text-center animate-bounce">

                              {success}

                        </div>

                  )}

                  {/* ERROR POPUP */}

                  {error && (

                        <div className="fixed top-5 right-5 left-5 sm:left-auto z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-semibold text-center">

                              {error}

                        </div>

                  )}

                  <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[#0f0f0f] p-6 md:p-8 text-white shadow-2xl space-y-5"
                  >

                        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-300/10 blur-3xl rounded-full" />

                        <div className="relative z-10">

                              <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-2">
                                    Get In Touch
                              </p>

                              <h3 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
                                    Let’s Build Something Amazing
                              </h3>

                              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                                    Share your ideas and business goals with us.
                                    We’ll help you create impactful digital solutions.
                              </p>

                        </div>

                        <div className="relative z-10 space-y-4">

                              <Input
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                              />

                              <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                              />

                              <Input
                                    id="company"
                                    name="company"
                                    placeholder="Company Name (Optional)"
                                    value={formData.company}
                                    onChange={handleChange}
                              />

                              <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                              >

                                    <option value="">
                                          Select a Subject
                                    </option>

                                    {subjectOptions.map((item) => (

                                          <option
                                                key={item}
                                                value={item}
                                          >

                                                {item}

                                          </option>

                                    ))}

                              </select>

                              <textarea
                                    name="message"
                                    placeholder="Tell us about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-32 resize-none rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                              />

                        </div>

                        <div className="relative z-10">

                              <AnimatedButton
                                    type="submit"
                                    color="orange"
                                    disabled={loading}
                                    className="w-full"
                              >

                                    {loading ? (

                                          "Sending..."

                                    ) : (

                                          <span className="flex items-center justify-center gap-2 w-full">

                                                <span>
                                                      Send Message
                                                </span>

                                                <FaPaperPlane />

                                          </span>

                                    )}

                              </AnimatedButton>

                        </div>

                  </form>

            </div>

      );

};

const Input = ({ id, type = "text", ...props }) => {

      return (

            <input
                  id={id}
                  type={type}
                  className="w-full rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
                  {...props}
            />

      );

};

export default ContactForm;