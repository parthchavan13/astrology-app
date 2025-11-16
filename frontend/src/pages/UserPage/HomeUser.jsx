import { useParams } from "react-router-dom";
import Navbar from "../../components/LandingComponents/Navbar";
import HeroSection from "../../components/LandingComponents/HeroSection";
import FeaturesSection from "../../components/LandingComponents/FeaturesSection";
import AstrologerPreview from "../../components/LandingComponents/AstrologerPreview";
import HoroscopeSection from "../../components/LandingComponents/HoroscopeSection";
import Testimonials from "../../components/LandingComponents/Testimonials";
import Footer from "../../components/LandingComponents/Footer";

const HomeUser = () => {
  return (
    <div className="home-container">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AstrologerPreview />
      <HoroscopeSection />
      <Testimonials />
      <Footer />
    </div>
  );
  const { _id } = res.data;
  console.log("User ID from URL:", _id);

  // Fetch user details or render their dashboard here
};

export default HomeUser;
