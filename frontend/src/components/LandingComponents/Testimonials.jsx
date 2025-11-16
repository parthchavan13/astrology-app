import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Riya Sharma",
      text: "The astrologer was incredibly accurate and kind. Helped me gain clarity in my career path.",
    },
    {
      name: "Amit Verma",
      text: "Got instant insights that matched my situation perfectly. Highly recommended!",
    },
    {
      name: "Sneha Patel",
      text: "Loved the experience! The remedies actually worked and improved my relationship.",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="section-title">Our Testimonies</h2>
      <p className="section-subtitle">What Our Users Say</p>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="testimonial-slider"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i} className="testimonial-slide">
            <p>"{r.text}"</p>
            <h4>- {r.name}</h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
