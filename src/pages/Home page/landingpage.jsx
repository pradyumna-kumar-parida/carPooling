import React from "react";

import Header from "../../components/Nav";
import Hero from "../Home page/Home-components/Hero";
import DetailedCards from "../Home page/Home-components/DetailedCards";
import WhyChoose from "../Home page/Home-components/WhyChoose";
import Testimonials from "../Home page/Home-components/Testimonials";
import Footer from "../../components/Footer";
import SearchRide from "../Rides/find-ride/SearchRide";
import { useAuth } from "../../context/AuthContext";
function Landingpage() {
  const role = localStorage.getItem("role");
  const { user } = useAuth()
  console.log("User in landing page:", user);
  return (
    <div className="App">
      <Hero />
      <div className="landingpage-search">
        {role !== "driver" && <SearchRide />}
      </div>
      <div className="container" id="find">
        <DetailedCards />
        <WhyChoose />
        <Testimonials />
      </div>

    </div>
  );
}

export default Landingpage;
