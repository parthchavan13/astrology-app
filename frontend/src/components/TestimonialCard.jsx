import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="p-4 bg-white border rounded-2xl shadow-sm">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
            fill={i < testimonial.rating ? "#facc15" : "none"}
          />
        ))}
      </div>
      <p className="text-gray-700 text-sm mb-2">{testimonial.comment}</p>
      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
    </div>
  );
}
