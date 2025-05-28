"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CoursePromoBanner = ({
  bannerImage = "/assets/images/summer-banner.jpg",
  registrationUrl = "/apply", 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Add entrance animation
    setTimeout(() => setIsAnimating(true), 100);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Wait for exit animation
  };

  const handleRegister = () => {
    window.open(registrationUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm" />

      {/* Main banner */}
      <div
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out w-full max-w-5xl px-4 ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        <div className="relative bg-secondary rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          >
            <IoClose className="w-5 h-5 text-white" />
          </button>

          {/* Banner Image Container */}
          <div className="relative w-full">
            <img
              src={bannerImage}
              alt="Course Banner"
              className="w-full h-auto "
            />
          </div>

          {/* Register Button - Outside image, below it */}
          <div className="bg-secondary px-4 py-6 sm:px-6 sm:py-8">
            <div className="text-center">
              <button
                onClick={handleRegister}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg"
              >
                Register Now
              </button>

              {/* Optional: Additional info below button */}
              <p className="text-gray-900 text-sm mt-3">
                🔥 Limited spots available • Early bird pricing ends soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePromoBanner;
