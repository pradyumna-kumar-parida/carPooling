import React from "react";
import SearchRide from "./find-ride/SearchRide";
import FRPopularRoutes from "./find-ride/FRPopularRoutes";
import "../../styles/FindRide.css";

const FindRide = () => {
  return (
    <>
      <div className="fr-container">
        <div className="find-ride-search">
          <h1 className="fr-page-title">Find a ride</h1>
          <SearchRide />
        </div>
        <FRPopularRoutes />
      </div>
    </>
  );
};

export default FindRide;
