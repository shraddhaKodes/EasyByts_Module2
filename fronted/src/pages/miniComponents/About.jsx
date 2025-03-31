import React from "react";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaUsers, FaClock, FaChartBar } from "react-icons/fa";
import Event from "../../assets/Event.avif";

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 sm:px-12 lg:px-24 py-5 text-white bg-gray-600 mt-0 pt-0 " id="about">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide flex items-center justify-center gap-4">
          About  
          <span className="bg-gray-700 text-yellow-400 px-5 py-2 rounded-xl shadow-xl">
            EventSync
          </span>
        </h1>
        <p className="text-gray-300 text-lg uppercase tracking-wide mt-2">
          Streamlining event planning with real-time tracking & collaboration.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 items-center gap-12 my-12">
        
        {/* Image Section */}
        <motion.div 
          initial={{ scale: 0.8, rotate: -5 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ duration: 0.8 }}
          className="flex justify-center relative"
        >
          <div className="backdrop-blur-lg p-2 rounded-lg shadow-lg border border-gray-700">
            <img
              src={Event}
              alt="Event Planning"
              className="rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[450px]"
            />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-left md:text-justify text-lg tracking-wide space-y-6"
        >
          <p>
            <span className="text-yellow-400 font-bold">EventSync</span> is an <strong>advanced event management platform</strong> 
            designed to <strong>simplify planning, collaboration, and real-time event tracking.</strong>
          </p>
          <p>
            Whether it's a corporate event, wedding, or conference, EventSync helps you <strong>organize, schedule, and execute flawlessly.</strong>
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 text-center text-gray-300">
            <motion.div whileHover={{ scale: 1.1 }} className="p-5 bg-gray-700 rounded-xl shadow-lg">
              <FaCalendarCheck className="text-yellow-400 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Seamless Scheduling</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-5 bg-gray-700 rounded-xl shadow-lg">
              <FaUsers className="text-blue-400 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Attendee Management</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-5 bg-gray-700 rounded-xl shadow-lg">
              <FaClock className="text-green-400 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Real-Time Updates</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-5 bg-gray-700 rounded-xl shadow-lg">
              <FaChartBar className="text-purple-400 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Analytics & Insights</p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="backdrop-blur-lg p-5 rounded-xl shadow-lg text-xl font-semibold flex items-center justify-center gap-4 text-yellow-400"
          >
            "Plan smarter, collaborate better, and execute seamlessly."
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
