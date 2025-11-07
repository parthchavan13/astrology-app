import { useEffect, useState } from "react";
import { getAstrologerProfile } from "../lib/api";
import TestimonialCard from "./TestimonialCard";

export default function AstrologerProfile({ id }) {
  const [astro, setAstro] = useState(null);

  useEffect(() => {
    if (!id) return;
    getAstrologerProfile(id).then(setAstro).catch(console.error);
  }, [id]);

  if (!astro) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-2xl text-center shadow">
        <img
          src={astro.photoUrl}
          alt={astro.name}
          className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow"
        />
        <h2 className="text-2xl font-semibold mt-4">{astro.name}</h2>
        <p className="text-gray-600">{astro.specialization}</p>
        <p className="text-sm text-gray-500">{astro.experience} Years of Experience</p>
        <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full">
          Book One-on-One Session
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio */}
          <div className="p-5 bg-white rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-lg">Biography</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{astro.bio}</p>
          </div>

          {/* Services */}
          <div className="p-5 bg-white rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-lg">Skills & Services</h3>
            <div className="flex flex-wrap gap-2">
              {astro.services.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="p-5 bg-white rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-lg">Client Testimonials</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {astro.testimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="p-5 bg-white rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-lg">Availability</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {astro.availability.map((slot, i) => (
                <span
                  key={i}
                  className="border rounded-lg px-3 py-1 text-sm text-center text-gray-700"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full">
            Book One-on-One Session
          </button>
        </div>
      </div>
    </div>
  );
}
