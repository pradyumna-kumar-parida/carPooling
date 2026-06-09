import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Travel Smarter",
    subtitle: "Share the journey with every ride.",
    description:
      "Connect with verified drivers and travelers for comfortable, affordable trips across the city.",
    buttonText: "Find a Ride",
    buttonPath: "/find-ride",
  },
  {
    id: 2,
    title: "Drive purpose",
    subtitle: "Earn from empty seats.",
    description:
      "Publish your ride, choose your price, and welcome passengers on every route.",
    buttonText: "Offer a Ride",
    buttonPath: "/offer-ride",
  },
  {
    id: 3,
    title: "Safe journeys",
    subtitle: "Verified drivers, real reviews.",
    description:
      "Book confidently with trusted profiles, secure payments and smooth pickup experiences.",
    buttonText: "Book Your Seat",
    buttonPath: "/find-ride",
  },
  {
    id: 4,
    title: "Flexible routes",
    subtitle: "Choose when and where you go.",
    description:
      "Search popular trips, compare prices, and ride together for smarter commute savings.",
    buttonText: "Start Your Trip",
    buttonPath: "/offer-ride",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-content">
        <div key={slide.id} className="hero-text hero-slide">
          <h1>
            {slide.title}
            <br />
            <span>{slide.subtitle}</span>
          </h1>

          <p>{slide.description}</p>

          <button
            className="hero-cta"
            onClick={() => navigate(slide.buttonPath)}
          >
            {slide.buttonText}
          </button>
        </div>

        {/* image removed: banner is now the hero background */}
      </div>
    </section>
  );
};

export default Hero;
