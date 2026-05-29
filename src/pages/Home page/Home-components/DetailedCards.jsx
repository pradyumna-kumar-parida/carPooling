import React from "react";
import img1 from "../../../assets/Images/empty-seat.jpg";
import img2 from "../../../assets/Images/need-ride.jpg";
import img3 from "../../../assets/Images/driver-image.jpg";
import img4 from "../../../assets/Images/passenger.webp";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DetailedCards = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const cards = [
    // DRIVER CARDS
    ...(role === "driver" || !token
      ? [
          {
            id: 1,
            theme: "",
            title: "Have empty seats?",
            subtitle: "Share your ride & earn money",
            features: [
              "Set your own price",
              "Choose your co-travelers",
              "Travel together, save together",
            ],
            buttonText: "Offer a Ride",
            buttonClass: "btn-blue",
            image: img1,
          },

          // show only when logged in
          ...(token
            ? [
                {
                  id: 3,
                  theme: "green-theme",
                  title: "Publish Your Ride",
                  subtitle: "Start accepting passengers today",
                  features: [
                    "Post your trip easily",
                    "Fill empty seats",
                    "Reduce travel expenses",
                  ],
                  buttonText: "Publish Ride",
                  buttonClass: "btn-green",
                  image: img3,
                },
              ]
            : []),
        ]
      : []),

    // PASSENGER CARDS
    ...(role === "passenger" || !token
      ? [
          {
            id: 2,
            theme: "green-theme",
            title: "Need a ride?",
            subtitle: "Find affordable travel",
            features: [
              "Thousands of routes",
              "Verified drivers",
              "Secure & easy booking",
            ],
            buttonText: "Find a Ride",
            buttonClass: "btn-green",
            image: img2,
          },

          // show only when logged in
          ...(token
            ? [
                {
                  id: 4,
                  theme: "blue-theme",
                  title: "Book Your Seat",
                  subtitle: "Travel safely with trusted drivers",
                  features: [
                    "Instant ride booking",
                    "Comfortable journeys",
                    "Affordable shared travel",
                  ],
                  buttonText: "Book Now",
                  buttonClass: "btn-blue",
                  image: img4,
                },
              ]
            : []),
        ]
      : []),
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.div
      className="detailed-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={`card ${card.theme}`}
          variants={cardVariants}
        >
          <motion.div className="card-content">
            <motion.h2
              className="card-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {card.title}
            </motion.h2>

            <motion.p
              className="card-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {card.subtitle}
            </motion.p>

            <ul className="features-list">
              {card.features.map((feature, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="check-icon"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  ></motion.div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className={`btn ${card.buttonClass}`}
              onClick={() => {
                if (card.buttonText === "Offer a Ride" || "Publish Ride") {
                  navigate("/offer-ride");
                } else {
                  navigate("/find-ride");
                }
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {card.buttonText}
            </motion.button>
          </motion.div>

          <motion.img
            src={card.image}
            alt=""
            className="card-image"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            loading="eager"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DetailedCards;
