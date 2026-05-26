import React from "react";
import { motion } from "framer-motion";
import PRHero from "./publish-ride/PRHero";
import PRBenefits from "./publish-ride/PRBenefits";
import PRTestimonials from "./publish-ride/PRTestimonials";
import PRHowItWorks from "./publish-ride/PRHowItWorks";
import PRSupport from "./publish-ride/PRSupport";
import PRFaq from "./publish-ride/PRFaq";
// import PRCta from "./publish-ride/PRCta";
import "../../styles/PublishRide.css";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";

const PublishRide = () => {
  return (
    <>
      <Header />
      <div className="pr-container">
        <PRHero />
        <PRBenefits />
        <PRTestimonials />
        <PRHowItWorks />
        <PRSupport />
        <PRFaq />
        {/* <PRCta /> */}
      </div>
      <Footer />
    </>
  );
};

export default PublishRide;
