import React from "react";
import notFoundImg from "../assets/Images/404.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 3000);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <img
        src={notFoundImg}
        alt="404 Not Found"
        style={{ maxWidth: "600px", width: "100%" }}
        loading="lazy"
      />
      <h1>Oops! Page Not Found</h1>
    </div>
  );
};

export default NotFound;
