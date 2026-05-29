import React from "react";
import heroImg from "../../../assets/Images/hero-Img.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Travel Smarter
            <br />
            <span>Share the Journey</span>
          </h1>

          <p>
            Connect with verified drivers and travelers for comfortable,
            affordable rides across the country.
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Hero Car" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
