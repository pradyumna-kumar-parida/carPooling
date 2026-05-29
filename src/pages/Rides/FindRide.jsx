import React from "react";
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
          <h1 className="fr-page-title">Find a ride</h1>
          <SearchRide />
        </div>
        <FRPopularRoutes />
      </div>
      <Footer />
    </>
  );
};

export default FindRide;
