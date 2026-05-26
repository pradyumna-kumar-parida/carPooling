import React, { useState, useEffect } from "react";
import testimonialImg1 from "../../../assets/Images/testimonial-Img1.jpg";
import testimonialImg2 from "../../../assets/Images/testimonial-Img2.avif";
import testimonialImg3 from "../../../assets/Images/testimonial-Img3.jpg";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // 🔥 RESPONSIVE CARDS CONTROL
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 600) {
        setCardsPerView(1);
      } else if (window.innerWidth < 900) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);

    return () => window.removeEventListener("resize", updateCards);
  }, []);

  // 🔥 DATA
  const testimonials = [
    {
      id: 1,
      text: "Very affordable and comfortable ride! The driver was polite and the car was clean.",
      name: "Rahul",
      location: "Delhi",
      avatar: testimonialImg1,
      rating: 5,
    },
    {
      id: 2,
      text: "Found a great ride from Mumbai to Pune. Saved money and had a pleasant journey.",
      name: "Priya",
      location: "Mumbai",
      avatar: testimonialImg2,
      rating: 5,
    },
    {
      id: 3,
      text: "Offering rides is easy and I've met amazing people while traveling.",
      name: "Amit",
      location: "Bangalore",
      avatar: testimonialImg3,
      rating: 5,
    },
    {
      id: 4,
      text: "Smooth booking process and very reliable service!",
      name: "Ankit",
      location: "Hyderabad",
      avatar: testimonialImg1,
      rating: 4,
    },
    {
      id: 5,
      text: "Affordable rides and great experience overall.",
      name: "Sneha",
      location: "Chennai",
      avatar: testimonialImg2,
      rating: 5,
    },
    {
      id: 6,
      text: "Loved the journey and the people I met!",
      name: "Karan",
      location: "Kolkata",
      avatar: testimonialImg3,
      rating: 5,
    },
  ];

  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  // 🔥 NAVIGATION
  const handleScroll = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
    } else {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const renderStars = (rating) => "★".repeat(rating);

  // 🔥 ANIMATION
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="testimonials-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Our Users Say
      </motion.h2>

      <div className="testimonials-wrapper">
        {/* LEFT BUTTON */}
        <motion.button
          className="arrow-btn"
          onClick={() => handleScroll("prev")}
          disabled={currentIndex === 0}
          whileTap={{ scale: 0.9 }}
        >
          <FaAngleDoubleLeft />
        </motion.button>

        {/* SLIDER */}
        <div className="testimonials-grid-wrapper">
          <motion.div
            className="testimonials-grid"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div className="slide" key={slideIndex}>
                {testimonials
                  .slice(
                    slideIndex * cardsPerView,
                    slideIndex * cardsPerView + cardsPerView,
                  )
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="testimonial-card"
                      variants={cardVariants}
                    >
                      {/* QUOTE ICON */}
                      <div className="quote-icon">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/18094/18094527.png"
                          alt="quote"
                          loading="eager"
                        />
                      </div>

                      {/* TEXT */}
                      <p className="testimonial-text">{item.text}</p>

                      {/* USER */}
                      <div className="reviewer">
                        <div className="avatar-circle">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            loading="eager"
                          />
                        </div>

                        <div className="reviewer-info">
                          <div className="name">
                            {item.name}, <span>{item.location}</span>
                          </div>
                          <div className="stars">
                            {renderStars(item.rating)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT BUTTON */}
        <motion.button
          className="arrow-btn"
          onClick={() => handleScroll("next")}
          disabled={currentIndex === totalSlides - 1}
          whileTap={{ scale: 0.9 }}
        >
          <FaAngleDoubleRight />
        </motion.button>
      </div>

      {/* DOTS */}
      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
