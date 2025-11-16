import React from "react";
import { motion } from "framer-motion";
import "../../styles/hero.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="hero-content container">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Consult India’s Top Astrologers Online</h1>
          <p>
            Get precise predictions, remedies, and cosmic guidance for life, love, and career.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Talk to Astrologer</button>
            <button className="btn-outline">Chat Now</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
