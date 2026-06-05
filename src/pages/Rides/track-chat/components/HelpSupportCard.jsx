import React from "react";
import { BiSupport } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";

const HelpSupportCard = () => (
  <div className="chatpanel-card">
    <h3 className="card-title" style={{ marginBottom: 14 }}>
      Help & Support
    </h3>
    <div className="support-btns">
      <button className="support-btn support-btn-outline">
        <IoShareSocialOutline size={18} />
        Share Ride
      </button>

      <button className="support-btn support-btn-outline">
        <BiSupport size={18} />
        Support
      </button>
    </div>
  </div>
);

export default HelpSupportCard;
