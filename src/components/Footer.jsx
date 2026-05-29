import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";

const Footer = () => {
  const links = [
    { text: "About Us", href: "#" },
    { text: "How It Works", href: "#" },
    { text: "Help", href: "#" },
    { text: "Contact", href: "#" },
    { text: "Terms", href: "#" },
    { text: "Privacy", href: "#" },
  ];

  const socialMedia = [
    { icon: <FaFacebookF />, title: "Facebook", href: "#" },
    { icon: <FaInstagram />, title: "Instagram", href: "#" },
    { icon: <FaTwitter />, title: "Twitter", href: "#" },
    { icon: <FaLinkedinIn />, title: "LinkedIn", href: "#" },
    { icon: <FaYoutube />, title: "YouTube", href: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <div>
            <FaCarAlt />
          </div>
          Carpooling
        </div>

        <div className="footer-copy">
          © 2026 Carpooling India. All rights reserved.
        </div>
      </div>

      <div className="footer-links">
        {links.map((link, index) => (
          <a key={index} href={link.href}>
            {link.text}
          </a>
        ))}
      </div>

      <div className="footer-social">
        {socialMedia.map((social, index) => (
          <a
            key={index}
            className="social-icon"
            href={social.href}
            title={social.title}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <div className="footer-copys">
        © 2026 Carpooling India. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
