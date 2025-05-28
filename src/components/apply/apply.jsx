"use client";
import React, { useState, useEffect } from "react";
import { FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import Navigator from "../navigator";
import SubHeading from "../sub-heading";
import CoursesData from "../../data/courses.json";

const ApplyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [enquiry, setEnquiry] = useState({
    name: "",
    tel: "",
    address: "",
    email: "",
    sponsorTel: "",
    education: "",
    source: "",
    course: "",
  });

  const educationOptions = [
    "High School Diploma",
    "Some College",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Other",
  ];

  const sourceOptions = [
    "Google Search",
    "Social Media",
    "Friend/Family",
    "Online Advertisement",
    "Event or Workshop",
    "Email Newsletter",
    "Other",
  ];

  const [captchaToken, setCaptchaToken] = useState(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE;

  useEffect(() => {
    // Calculate progress based on current step
    setProgress((step / 3) * 100);
  }, [step]);

  const nextStep = () => {
    if (step === 1) {
      if (!enquiry.name || !enquiry.tel || !enquiry.email) {
        toast.error("Please fill all required fields before proceeding");
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(enquiry.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    } else if (step === 2) {
      if (!enquiry.address) {
        toast.error("Please enter your home address");
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA!");
      return;
    }

    if (!enquiry.education || !enquiry.source) {
      toast.error("Please complete all required fields!");
      return;
    }

    setLoading(true);

    try {
      // Verify CAPTCHA
      const captchaResponse = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      const captchaData = await captchaResponse.json();

      if (!captchaData.success) {
        toast.error("CAPTCHA verification failed!");
        setLoading(false);
        return;
      }

      // Submit form data
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Send email notification
      const emailSuccess = await sendEmail();

      // Only show success message after both form submission and email are successful
      if (emailSuccess) {
        toast.success("Registration successful! We'll be in touch soon.");
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const getEmailBdy = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #179FC9; text-align: center;">New Registration On CLH WebSite</h2>
        <p style="font-size: 16px; color: #555;">Hello, you have received a new enquiry from your website.</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
          <p><strong style="color: #179FC9;">Name:</strong> ${enquiry.name}</p>
          <p><strong style="color: #179FC9;">Address:</strong> ${enquiry.address}</p>
          <p><strong style="color: #179FC9;">Tel:</strong> ${enquiry.tel}</p>
          <p><strong style="color: #179FC9;">Email:</strong> ${enquiry.email}</p>
          <p><strong style="color: #179FC9;">Sponsor Tel:</strong> ${enquiry.sponsorTel}</p>
          <p><strong style="color: #179FC9;">Level of Education:</strong> ${enquiry.education}</p>
          <p><strong style="color: #179FC9;">Course:</strong> ${enquiry.course}</p>
          <p><strong style="color: #179FC9;">Source:</strong> ${enquiry.source}</p>
        </div>
        <p style="font-size: 12px; color: #777; text-align: center;">This is an automated email. Please do not reply directly.</p>
      </div>
    `;
  };

  const sendEmail = async () => {
    const emailRequest = {
      emailBdy: getEmailBdy(),
      senderEmail: enquiry.email,
      subject: "New Registration",
    };
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send confirmation email");
      }

      return true; // Indicate success
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.warning(
        "Registration saved, but confirmation email could not be sent"
      );
      return false;
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Name*
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.name}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.tel}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, tel: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address*
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.email}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, email: e.target.value })
                }
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Home Address*
              </label>
              <textarea
                placeholder="Enter your complete home address"
                rows="3"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.address}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sponsor&apos;s Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="Enter sponsor's contact number if applicable"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                value={enquiry.sponsorTel}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, sponsorTel: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 italic">
                This field is optional and can be left blank
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select A Course*
              </label>
              <select
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.course}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, course: e.target.value })
                }
              >
                <option value="">Select a course</option>
                {CoursesData.map((course, index) => (
                  <option key={index} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Highest Level of Education*
              </label>
              <select
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.education}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, education: e.target.value })
                }
              >
                <option value="">Select your education level</option>
                {educationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                How did you hear about CodeLearnersHub?*
              </label>
              <select
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.source}
                onChange={(e) =>
                  setEnquiry({ ...enquiry, source: e.target.value })
                }
              >
                <option value="">Select an option</option>
                {sourceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center my-6">
              <ReCAPTCHA sitekey={siteKey} onChange={setCaptchaToken} />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Calculate which dots should be active
  const getDotStatus = (dotStep) => {
    if (dotStep < step) return "completed";
    if (dotStep === step) return "current";
    return "incomplete";
  };

  return (
    <>
      <Navigator
        links={[
          {
            title: "Application",
            url: "/apply",
          },
        ]}
      />

      <div className="px-[20px] md:px-[50px]">
        {/* Hero Section */}
        <SubHeading text="Join our coding " colourText="journey today." />

        {/* Progress Section */}
        <div className="custom-border px-[15px] py-[25px] md:p-[30px] bg-white">
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <motion.div
              className="h-full bg-[#179FC9] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((dotStep) => (
              <div key={dotStep} className="flex items-center">
                <button
                  type="button"
                  onClick={() => dotStep < step && setStep(dotStep)}
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 transition-all duration-200
                    ${
                      getDotStatus(dotStep) === "completed"
                        ? "bg-[#179FC9] border-[#179FC9] text-white"
                        : getDotStatus(dotStep) === "current"
                        ? "bg-[#179FC9] border-[#179FC9] text-white scale-110"
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }`}
                  disabled={dotStep > step}
                >
                  {getDotStatus(dotStep) === "completed" ? (
                    <FaCheck className="h-4 w-4" />
                  ) : (
                    dotStep
                  )}
                </button>

                {dotStep < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                      dotStep < step ? "bg-[#179FC9]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-[20px] md:text-[24px] font-[600] text-primary mb-2">
              {step === 1
                ? "Personal Information"
                : step === 2
                ? "Contact Details & Course Selection"
                : "Education & Discovery"}
            </h3>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              {step === 1
                ? "Let's start with your basic information"
                : step === 2
                ? "Tell us where to reach you and your course preference"
                : "Help us understand your background and how you found us"}
            </p>
          </div>

          <form
            onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
          >
            <AnimatePresence mode="wait">{renderFormStep()}</AnimatePresence>

            <div className="flex justify-between items-center mt-10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-100 transition-all duration-200 border border-gray-300"
                >
                  <FaArrowLeft size={14} />
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 rounded-lg bg-[#179FC9] text-white flex items-center gap-2 hover:bg-[#011629] transition-all duration-200"
                >
                  <span>Continue</span>
                  <FaArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-[#179FC9] text-white flex items-center gap-2 hover:bg-[#011629] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading || !captchaToken}
                >
                  {loading ? (
                    <BeatLoader color="#ffffff" size={8} />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <FaCheck size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="h-[90px] md:h-[190px] bg-[#179FC9]"></div>
    </>
  );
};

export default ApplyPage;
