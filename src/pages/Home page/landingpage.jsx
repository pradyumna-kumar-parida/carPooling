import React from "react";

import Header from "../../components/Nav";
import Hero from "../Home page/Home-components/Hero";
import DetailedCards from "../Home page/Home-components/DetailedCards";
import WhyChoose from "../Home page/Home-components/WhyChoose";
import Testimonials from "../Home page/Home-components/Testimonials";
import Footer from "../../components/Footer";
import SearchRide from "../Rides/find-ride/SearchRide";
function Landingpage() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <div className="landingpage-search">
        <SearchRide />
      </div>
      <div className="container" id="find">
        <DetailedCards />
        <WhyChoose />
        <Testimonials />
      </div>

      <Footer />
    </div>
  );
}

export default Landingpage;
