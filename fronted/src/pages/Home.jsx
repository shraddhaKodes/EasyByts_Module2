import React from "react";
import Hero from "./miniComponents/Hero";
import About from "./miniComponents/About";
import Contact from "./miniComponents/Contact";
import Navbar from "./miniComponents/Navbar";
import Footer from "./miniComponents/Footer";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-">
      {/* Navbar Fixed at the Top */}
      <Navbar />
        <Hero />
        <About />
        <Contact />
      <Footer />
    </div>
  );
};

export default Home;
