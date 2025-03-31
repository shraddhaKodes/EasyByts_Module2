import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen  flex flex-col items-center justify-center text-center px-6 bg-gray-550 pb-2">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray-600"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl text-white space-y-6">
        {/* Tagline */}
        <p className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide shadow-md animate-bounce inline-block">
          🚀 Elevate Your Events with <span className="text-yellow-400">EventSync</span>!
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Seamlessly Manage & Track <br /> Your Events
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-light text-gray-300 opacity-90">
          Stay organized with real-time tracking, collaboration, and insights.
        </p>

        {/* CTA Button */}
        <button
          className="mt-6 px-8 py-1 bg-gray-700 hover:bg-gray-600 text-yellow-400 font-semibold text-lg rounded-lg transition-all duration-300 shadow-md transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

export default Hero;
