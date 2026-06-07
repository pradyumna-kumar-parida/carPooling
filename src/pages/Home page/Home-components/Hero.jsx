import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import findRide from "../../../assets/Images/find-ride-carosel.jpg";
import offerRide from "../../../assets/Images/offer-ride-carosel.jpg";
import bookSeat from "../../../assets/Images/book-seat-carosel.jpg";
import startTrip from "../../../assets/Images/start-trip-carosel.jpg";

const slides = [
  {
    id: 1,
    title: "Travel Smarter",
    subtitle: "Share the journey with every ride.",
    description:
      "Connect with verified drivers and travelers for comfortable, affordable trips across the city.",
    buttonText: "Find a Ride",
    buttonPath: "/find-ride",
    bg:
      "linear-gradient(135deg, rgba(18, 100, 210, 0.12), rgba(7, 82, 170, 0.28)), linear-gradient(180deg, #dbeffc 0%, #f1f8ff 100%)",
    img: findRide,
  },
  {
    id: 2,
    title: "Drive purpose",
    subtitle: "Earn from empty seats.",
    description:
      "Publish your ride, choose your price, and welcome passengers on every route.",
    buttonText: "Offer a Ride",
    buttonPath: "/offer-ride",
    bg:
      "linear-gradient(135deg, rgba(194, 242, 228, 0.4), rgba(120, 205, 187, 0.35)), linear-gradient(180deg, #eefcf6 0%, #f9fffb 100%)",
    img: offerRide,
  },
  {
    id: 3,
    title: "Safe journeys",
    subtitle: "Verified drivers, real reviews.",
    description:
      "Book confidently with trusted profiles, secure payments and smooth pickup experiences.",
    buttonText: "Book Your Seat",
    buttonPath: "/find-ride",
    bg:
      "linear-gradient(135deg, rgba(244, 219, 255, 0.4), rgba(192, 145, 255, 0.25)), linear-gradient(180deg, #fcf4ff 0%, #f5f0ff 100%)",
    img: bookSeat,
  },
  {
    id: 4,
    title: "Flexible routes",
    subtitle: "Choose when and where you go.",
    description:
      "Search popular trips, compare prices, and ride together for smarter commute savings.",
    buttonText: "Start Your Trip",
    buttonPath: "/find-ride",
    bg:
      "linear-gradient(135deg, rgba(255, 243, 205, 0.5), rgba(255, 210, 118, 0.3)), linear-gradient(180deg, #fff9ec 0%, #fffdf5 100%)",
    img: startTrip,
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
    <section className="hero" style={{ "--hero-bg": slide.bg }}>
      <div className="hero-content">
        <div key={slide.id} className="hero-text hero-slide">
          <h1>
            {slide.title}
            <br />
            <span>{slide.subtitle}</span>
          </h1>

          <p>{slide.description}</p>

          <button className="hero-cta" onClick={() => navigate(slide.buttonPath)}>
            {slide.buttonText}
          </button>
        </div>

        <div key={`image-${slide.id}`} className="hero-image hero-slide">
          <img src={slide.img} alt="Hero Car" loading="eager" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
