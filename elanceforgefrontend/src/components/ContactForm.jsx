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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if ((name === "name" || name === "subject") && numberRegex.test(value)) {
      setError("Numbers are not allowed here");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setFormData(initialState);

      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white rounded-2xl p-6 space-y-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
      noValidate
    >
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Contact Us
      </h3>

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
        className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select a Subject</option>
        {subjectOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        placeholder="Your Message (min 10 characters)"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 h-24 resize-none"
      />

      <AnimatedButton type="submit" color="orange" className="w-full">
        {loading ? (
          "Sending..."
        ) : (
          <span className="flex items-center justify-center gap-2 w-full">
            <span>Send Message</span>
            <FaPaperPlane />
          </span>
        )}
      </AnimatedButton>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      {success && (
        <p className="text-green-400 text-sm text-center">
          Message sent successfully!
        </p>
      )}
    </form>
  );
};

const Input = ({ id, type = "text", ...props }) => (
  <input
    id={id}
    type={type}
    className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-orange-500"
    {...props}
  />
);

export default ContactForm;
