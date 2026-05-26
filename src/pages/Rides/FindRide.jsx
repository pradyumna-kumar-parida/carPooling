import React from "react";
import { motion } from "framer-motion";
import FRSearchBar from "./find-ride/FRSearchBar";
import FRPopularRoutes from "./find-ride/FRPopularRoutes";
import "../../styles/FindRide.css";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";

const FindRide = () => {
  return (
    <>
      <Header />
      <div className="fr-container">
        <FRSearchBar />
        <FRPopularRoutes />
      </div>
      <Footer />
    </>
  );
};

export default FindRide;
