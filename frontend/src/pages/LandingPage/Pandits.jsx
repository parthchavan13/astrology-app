import React, { useEffect, useState } from "react";
import "../../styles/pandit.css";
import { useNavigate } from "react-router-dom";
import { FaComments, FaPhoneAlt } from "react-icons/fa";
import Navbar from "../../components/LandingComponents/Navbar";
import Footer from "../../components/LandingComponents/Footer";

const Pandits = () => {
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

  return (
    <div className="panditSection-page">
      <Navbar />
      <section className="panditSection-wrapper">
        <div className="panditSection-container">
          <h2 className="panditSection-title">Our Expert Pandits</h2>
          <p className="panditSection-subtitle">
            Connect with certified pandit for personalized guidance and spiritual insight.
          </p>

          <div className="panditSection-grid">
            {pandit.length > 0 ? (
              pandit.map((pandit) => (
                <div className="panditSection-card" key={pandit._id}>
                  <div className="panditSection-image">
                    <img
                      src={
                        pandit.image
                          ? `http://localhost:5000/${pandit.image.replace(/^(\/)+/, "")}`
                          : "/assets/default-pandit.png"
                      }
                      alt={pandit.name}
                    />
                  </div>

                  <div className="panditSection-details">
                    <h3 className="panditSection-name">{pandit.name}</h3>
                    <p className="panditSection-lang">
                      {pandit.languages?.join(", ") || "Language N/A"}
                    </p>
                    <p className="panditSection-exp">
                      {pandit.experience
                        ? `${pandit.experience} Year${pandit.experience > 1 ? "s" : ""}`
                        : "Experience not mentioned"}
                    </p>
                    <p className="panditSection-skills">
                      {truncateText(pandit.skills?.join(", ") || "Vedic Specialist")}
                    </p>

                    <div className="panditSection-bottom">
                      <span className="panditSection-price">₹5/Min</span>
                      <div className="panditSection-actions">
                        <button
                          className="panditSection-btn chat-btn"
                          o nClick={() => {
                            const userToken = localStorage.getItem("userToken");

                                if (userToken) {
                                  navigate(`/ChatUser/${pandit._id}`);  // 👉 send user to chat window
                                } else {
                                  navigate(`/login`);  // 👉 only go to login if no token
                     }
}}

                        >
                          <FaComments className="panditSection-icon" /> Chat
                        </button>
                        <button
                          className="panditSection-btn call-btn"
                          onClick={() => {
                             const userToken = localStorage.getItem("userToken");

                              if (userToken) {
                                navigate(`/chat/${pandit._id}`);  // 👉 send user to chat window
                              } else {
                                navigate(`/login`);  // 👉 only go to login if no token
                              }
                          }}

                        >
                          <FaPhoneAlt className="panditSection-icon" /> Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading pandit...</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Pandits;
