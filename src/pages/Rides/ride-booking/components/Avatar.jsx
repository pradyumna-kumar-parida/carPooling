// src/pages/Rides/find-ride/ride-booking/components/Avatar.jsx

import { avatarColor, getInitials } from "../utils/bookingHelpers";

export default function Avatar({ src, name, className, style = {} }) {
  const [bg, text] = avatarColor(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={className}
        loading="lazy"
        style={style}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        background:     bg,
        color:          text,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontWeight:     700,
        fontSize:       "16px",
        ...style,
      }}
    >
      {getInitials(name)}
    </div>
  );
}