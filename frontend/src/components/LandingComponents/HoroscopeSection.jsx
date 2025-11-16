import React from "react";
import "../../styles/horoscope.css";

const HoroscopeSection = () => {
  const zodiacs = [
    { icon: "♈️", name: "Aries" },
    { icon: "♉️", name: "Taurus" },
    { icon: "♊️", name: "Gemini" },
    { icon: "♋️", name: "Cancer" },
    { icon: "♌️", name: "Leo" },
    { icon: "♍️", name: "Virgo" },
    { icon: "♎️", name: "Libra" },
    { icon: "♏️", name: "Scorpio" },
    { icon: "♐️", name: "Sagittarius" },
    { icon: "♑️", name: "Capricorn" },
    { icon: "♒️", name: "Aquarius" },
    { icon: "♓️", name: "Pisces" },
  ];

  return (
    <section className="horoscope-section">
      <div className="container">
        <h2 className="section-title">Your Daily Horoscope</h2>
        <p className="section-subtitle">Discover what the stars reveal about your day ✨</p>

        <div className="zodiac-grid">
          {zodiacs.map((zodiac, index) => (
            <div className="zodiac-card" key={index}>
              <div className="zodiac-icon">{zodiac.icon}</div>
              <h3>{zodiac.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoroscopeSection;
