"use client";
import React, { useState, useEffect } from "react";
import { FaRegTimesCircle, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";
import dotenv from "dotenv";

const RegistrationModal = ({ setIsOpen }) => {
  
  dotenv.config();
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
    
  });

  const educationOptions = [
    "High School Diploma",
    "Some College",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Other"
  ];

  const sourceOptions = [
    "Google Search",
    "Social Media",
    "Friend/Family",
    "Online Advertisement",
    "Event or Workshop",
    "Email Newsletter",
    "Other"
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
    
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
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
        setTimeout(() => setIsOpen(false), 2000);
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
      toast.warning("Registration saved, but confirmation email could not be sent");
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
              <label className="block text-sm font-medium text-gray-700">Your Name*</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.name}
                onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.tel}
                onChange={(e) => setEnquiry({ ...enquiry, tel: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address*</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.email}
                onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">Home Address*</label>
              <textarea
                placeholder="Enter your complete home address"
                rows="3"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.address}
                onChange={(e) => setEnquiry({ ...enquiry, address: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sponsor&apos;s Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="Enter sponsor's contact number if applicable"
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                value={enquiry.sponsorTel}
                onChange={(e) => setEnquiry({ ...enquiry, sponsorTel: e.target.value })}
              />
              <p className="text-xs text-gray-500 italic">This field is optional and can be left blank</p>
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
              <label className="block text-sm font-medium text-gray-700">Highest Level of Education*</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.education}
                onChange={(e) => setEnquiry({ ...enquiry, education: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">How did you hear about CodeLearnersHub?*</label>
              <select
                className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#179FC9] focus:ring-2 focus:ring-[#179FC9]/20 transition-all"
                required
                value={enquiry.source}
                onChange={(e) => setEnquiry({ ...enquiry, source: e.target.value })}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-[95vw] md:w-[800px] rounded-xl shadow-2xl lg:max-h-[100vh] overflow-hidden"
      >
        {/* Dynamic Background Header */}
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <motion.div 
              className="h-full bg-[#179FC9]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="relative h-[220px] md:h-[250px] bg-gradient-to-r from-[#011629] via-[#0a3958] to-[#179FC9] overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white bg-opacity-10"
                  style={{
                    width: `${20 + Math.random() * 100}px`,
                    height: `${20 + Math.random() * 100}px`,
                  }}
                  initial={{
                    x: Math.random() * 800,
                    y: Math.random() * 250,
                    opacity: 0.1 + Math.random() * 0.3,
                  }}
                  animate={{
                    y: [null, Math.random() * 40 - 20],
                    opacity: [null, 0.1 + Math.random() * 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
            
            {/* Header Content */}
            <div className="relative flex h-full">
              <div className="flex-1 flex flex-col justify-center px-8 md:px-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Join Our
                    <span className="text-[#179FC9]"> Journey</span>
                  </h2>
                  <p className="text-white text-sm md:text-base opacity-90 max-w-xs">
                    Take the first step toward mastering coding with CodeLearnersHub
                  </p>
                </motion.div>

                {/* Step indicators */}
                <div className="mt-6 flex items-center space-x-4">
                  {[1, 2, 3].map((dotStep) => (
                    <div key={dotStep} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => dotStep < step && setStep(dotStep)}
                        className={`flex items-center justify-center h-8 w-8 rounded-full border-2 
                          ${getDotStatus(dotStep) === 'completed' ? 'bg-[#179FC9] border-[#179FC9] text-white' : 
                          getDotStatus(dotStep) === 'current' ? 'bg-white border-white text-[#011629]' : 
                          'bg-transparent border-white/50 text-white/50'}`}
                        disabled={dotStep > step}
                      >
                        {getDotStatus(dotStep) === 'completed' ? (
                          <FaCheck className="h-4 w-4" />
                        ) : (
                          dotStep
                        )}
                      </button>
                      
                      {dotStep < 3 && (
                        <div className={`w-12 h-0.5 mx-1 ${dotStep < step ? 'bg-[#179FC9]' : 'bg-white/30'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:block flex-1">
                <motion.div 
                  className="h-full w-full bg-no-repeat bg-cover bg-[url('/assets/images/girl5.png')]"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#179FC9] transition-colors"
            >
              <FaRegTimesCircle size={28} />
            </button>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="px-6 py-8 md:px-10">
          <h3 className="text-xl font-semibold text-[#011629] mb-6">
            {step === 1 ? "Personal Information" : 
             step === 2 ? "Contact Details" : 
             "Education & Discovery"}
          </h3>
          
          <form onSubmit={step === 3 ? handleSubmit : e => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {renderFormStep()}
            </AnimatePresence>
            
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-md flex items-center gap-2 text-gray-600 hover:bg-gray-100 transition-all"
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
                  className="px-6 py-3 rounded-md bg-[#011629] text-white flex items-center gap-2 hover:bg-[#179FC9] transition-all"
                >
                  <span>Continue</span>
                  <FaArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-[#011629] text-white flex items-center gap-2 hover:bg-[#179FC9] transition-all disabled:bg-gray-400"
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
      </motion.div>
    </div>
  );
};

export default RegistrationModal;