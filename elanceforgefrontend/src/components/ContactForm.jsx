import React, { useState, useCallback, useEffect } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import AnimatedButton from "../components/AnimatedButton";
import emailjs from "@emailjs/browser";

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
  const [resendTimer, setResendTimer] = useState(60);
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [timer, setTimer] = useState(180);

  // OTP EXPIRY TIMER
  useEffect(() => {
    let interval;

    if (showOtpScreen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtpScreen, timer]);

  // RESEND OTP TIMER
  useEffect(() => {
    let interval;

    if (
      showOtpScreen &&
      !canResend &&
      resendTimer > 0
    ) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtpScreen, canResend, resendTimer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (
      name === "name" &&
      numberRegex.test(value)
    ) {
      setError("Numbers are not allowed here");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }, []);

  const handleVerifyEmail = async () => {
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    return setError(
      "Please fill all required fields first"
    );
  }

  if (!emailRegex.test(formData.email)) {
    return setError(
      "Please enter a valid email address"
    );
  }

  try {
    setOtpSending(true);

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const saveOtpResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/otp/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      }
    );

    if (!saveOtpResponse.ok) {
      throw new Error(
        "Failed to save OTP"
      );
    }

    await emailjs.send(
      "otp_elanceforge",
      "template_97nt5uq",
      {
        name: formData.name,
        email: formData.email,
        otp,
      },
      "pAY7O8NKDfuVb9g2q"
    );

    setTimer(180);
    setOtpError("");
    setShowOtpScreen(true);
    setResendTimer(60);
    setCanResend(false);

    setTimeout(() => {
      setCanResend(true);
    }, 60000);

  } catch (error) {
    console.error(error);
    setError("Failed to send OTP");
  } finally {
    setOtpSending(false);
  }
};

const handleVerifyOtp = async () => {
  if (timer <= 0) {
    setOtpError("OTP Expired");
    setEnteredOtp("");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/otp/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: enteredOtp.trim(),
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setOtpVerified(true);
      setOtpError("");
      setShowOtpScreen(false);
      setEnteredOtp("");
    } else {
      setOtpError(data.message || "Invalid OTP");
      setEnteredOtp("");
    }
  } catch (error) {
    console.error(error);
    setOtpError("OTP Verification Failed");
    setEnteredOtp("");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!otpVerified) {
    return setError("Please verify your email first");
  }

  if (formData.message.trim().length < 10) {
    return setError(
      "Message must be at least 10 characters long"
    );
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    setShowThankYou(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log(
          "Admin Email + Auto Reply Sent"
        );
        console.log(response);
      })
      .catch((error) => {
        console.error(
          "EmailJS Error:",
          error
        );
      });

    setTimeout(() => {
      setFormData(initialState);
      setEnteredOtp("");
      setOtpVerified(false);
      setShowOtpScreen(false);
      setShowThankYou(false);
      setOtpError("");
      setTimer(180);
      setError("");
      setResendCount(0);
      setCanResend(false);
      setResendTimer(60);
    }, 10000);

  } catch (err) {
    setError(
      err.message || "Failed to send message"
    );
  } finally {
    setLoading(false);
  }
};

if (showThankYou) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[#0f0f0f] p-8 md:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-300/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[450px]">
          <FaCheckCircle
            size={70}
            className="text-green-500 mb-6"
          />

          <h2 className="text-3xl md:text-4xl font-bold">
            Thank You For Contacting ElanceForge
          </h2>

          <p className="mt-4 text-gray-400 max-w-md">
            We have successfully received your message.
            Our team will contact you shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
    if (showOtpScreen) {
  return (
    <div className="relative">
      {otpError && (
        <div className="fixed top-5 right-5 left-5 sm:left-auto z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-semibold text-center">
          {otpError}
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[#0f0f0f] p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-300/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          <p className="text-orange-400 text-sm font-medium tracking-widest uppercase mb-2">
            Email Verification
          </p>

          <h3 className="text-3xl md:text-4xl font-bold">
            Verify OTP
          </h3>

          <p className="mt-4 text-gray-400">
            OTP has been sent to
            <span className="text-white ml-2 break-all">
              {formData.email}
            </span>
          </p>

          <div className="mt-8">
            <input
              type="text"
              maxLength={6}
              value={enteredOtp}
              onChange={(e) =>
                setEnteredOtp(
                  e.target.value.replace(/\D/g, "")
                )
              }
              placeholder="Enter 6 digit OTP"
              className="w-full h-16 text-center text-2xl tracking-[10px] rounded-2xl border border-white/10 bg-[#1a1a1a] text-white outline-none transition-all duration-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <div className="mt-5 text-center text-orange-400 font-medium">
            OTP Expires In {formatTime()}
          </div>

          <div className="mt-6">
            <AnimatedButton
              type="button"
              color="orange"
              onClick={handleVerifyOtp}
              className="w-full"
            >
              Verify OTP
            </AnimatedButton>
          </div>

          <button
            type="button"
            disabled={!canResend || resendCount >= 2}
            onClick={() => {
              if (resendCount >= 2) return;
              setResendCount((prev) => prev + 1);
              handleVerifyEmail();
            }}
            className={`mt-4 text-sm font-medium w-full text-center ${
              !canResend || resendCount >= 2
                ? "text-gray-500 cursor-not-allowed"
                : "text-orange-400 hover:text-orange-300"
            }`}
          >
            {resendCount >= 2
              ? "Resend Limit Reached"
              : !canResend
              ? `Resend Available In ${resendTimer}s`
              : `Resend OTP (${2 - resendCount} Left)`}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowOtpScreen(false);
              setEnteredOtp("");
              setOtpError("");
              setOtpVerified(false);
              setTimer(180);
              setResendTimer(60);
              setCanResend(false);
              setResendCount(0);
            }}
            className="mt-3 w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white font-medium text-base"
          >
            Back To Form
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="relative">
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
          disabled={otpVerified}
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
            <option key={item} value={item}>
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
        {!otpVerified ? (
          <AnimatedButton
            type="button"
            color="orange"
            disabled={otpSending}
            onClick={handleVerifyEmail}
            className="w-full"
          >
            {otpSending ? (
              "Sending OTP..."
            ) : (
              <span className="flex items-center justify-center gap-2 w-full">
                Verify Email
              </span>
            )}
          </AnimatedButton>
        ) : (
          <AnimatedButton
            type="submit"
            color="orange"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <span className="flex items-center justify-center gap-2 w-full">
                <span>Submit Message</span>
                <FaPaperPlane />
              </span>
            )}
          </AnimatedButton>
        )}
      </div>
    </form>
  </div>
);

};

const Input = ({
  id,
  type = "text",
  ...props
}) => {
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