import React from "react";
import { motion } from "framer-motion";
import SearchRide from "./find-ride/SearchRide";
import FRPopularRoutes from "./find-ride/FRPopularRoutes";
import "../../styles/FindRide.css";
import Header from "../../components/Nav";
import Footer from "../../components/Footer";

const FindRide = () => {
  return (
    <>
      <Header />
      <div className="fr-container">
        {/* <FRSearchBar /> */}
        <div className="find-ride-search">
          <motion.h1
            className="fr-page-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Find a ride
          </motion.h1>
          <SearchRide />
        </div>
        <FRPopularRoutes />
      </div>
      <Footer />
    </>
  );
};

export default FindRide;
