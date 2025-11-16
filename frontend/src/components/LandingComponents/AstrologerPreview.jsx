import React, { useEffect, useState } from "react";
import "../../styles/astrologerPreview.css";
import { useNavigate } from "react-router-dom";
import { FaComments, FaPhoneAlt } from "react-icons/fa"; // ✅ icons

const AstrologerPreview = () => {
  const [pandit, setPandits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/pandit/getAllPandits")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pandit)) {
          setPandits(data.pandit.filter((p) => p.status === "approved"));
        }
      })
      .catch((err) => console.error("❌ Error fetching pandit:", err));
  }, []);

  const truncateText = (text, maxLength = 35) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleProtectedNavigate = (path) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  } else {
    navigate(path);
  }
};


  return (
    <section className="astrologer-preview">
      <div className="container">
        <h2 className="section-title">Our Top Astrologers</h2>
        <p className="section-subtitle">
          Talk to verified astrologers in your preferred language
        </p>

        <div className="astrologer-grid">
          {pandit.length > 0 ? (
            pandit.map((pandit) => (
              <div className="astro-card" key={pandit._id}>
                {/* Left profile image */}
                <div className="astro-image">
                  <img
                    src={
                      pandit.image
                        ? `http://localhost:5000/${pandit.image.replace(/^(\/)+/, "")}`
                        : "/assets/default-pandit.png"
                    }
                    alt={pandit.name}
                  />
                </div>

                {/* Right side info */}
                <div className="astro-details">
                  <h3 className="astro-name">{pandit.name}</h3>
                  <p className="astro-lang">
                    {pandit.languages?.join(", ") || "Language N/A"}
                  </p>
                  <p className="astro-exp">
                    {pandit.experience
                      ? `${pandit.experience} Year${pandit.experience > 1 ? "s" : ""}`
                      : "Experience not mentioned"}
                  </p>
                  <p className="astro-skills">
                    {truncateText(pandit.skills?.join(", ") || "Astrology Expert")}
                  </p>

                  <div className="astro-bottom">
                    <span className="astro-price">₹5/Min</span>
                    <div className="astro-actions">
                      <button
                        className="astro-btn chat-btn"
                        onClick={() => handleProtectedNavigate(`/chat/${pandit._id}`)}
                      >
                        <FaComments className="icon chat-icon" /> Chat
                      </button>

                      <button
                        className="astro-btn call-btn"
                        onClick={() => handleProtectedNavigate(`/call/${pandit._id}`)}
                      >
                        <FaPhoneAlt className="icon call-icon" /> Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading astrologers...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AstrologerPreview;
