import React from "react";
import "../../styles/features.css";

const FeaturesSection = () => {
  const features = [
    {
      icon: "📞",
      title: "Talk to Astrologer",
      desc: "Instantly connect with verified astrologers and get personalized guidance.",
    },
    {
      icon: "💬",
      title: "Chat with Expert",
      desc: "Ask your burning questions anytime, anywhere, and receive quick replies.",
    },
    {
      icon: "🔮",
      title: "Horoscope & Kundli",
      desc: "Get daily, weekly, and yearly horoscope readings curated for you.",
    },
    {
      icon: "🪔",
      title: "Puja & Remedies",
      desc: "Perform personalized pujas and receive astrological remedies for success.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Explore our wide range of astrological consultations and services
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
