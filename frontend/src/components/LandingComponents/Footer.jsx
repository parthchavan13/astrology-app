import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>About</h4>
          <p>Your trusted platform for astrology consultations & insights.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Pandits</li>
            <li>Horoscope</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="socials">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Astro Web Project. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
