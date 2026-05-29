import React from "react";
import img1 from "../../../assets/Images/empty-seat.jpg";
import img2 from "../../../assets/Images/need-ride.jpg";
import img3 from "../../../assets/Images/driver-image.jpg";
import img4 from "../../../assets/Images/passenger.webp";
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

  return (
    <div className="detailed-container">
      {cards.map((card) => (
        <div key={card.id} className={`card ${card.theme}`}>
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>

            <p className="card-subtitle">{card.subtitle}</p>

            <ul className="features-list">
              {card.features.map((feature, index) => (
                <li key={index}>
                  <div className="check-icon"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`btn ${card.buttonClass}`}
              onClick={() => {
                if (card.buttonText === "Offer a Ride" || "Publish Ride") {
                  navigate("/offer-ride");
                } else {
                  navigate("/find-ride");
                }
              }}
            >
              {card.buttonText}
            </button>
          </div>

          <img
            src={card.image}
            alt=""
            className="card-image"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default DetailedCards;
