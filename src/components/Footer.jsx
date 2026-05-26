import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="footer-left" variants={itemVariants}>
        <motion.div className="footer-logo">
          <motion.div>
            <FaCarAlt />
          </motion.div>
          Carpooling
        </motion.div>

        <motion.div
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © 2024 Carpooling India. All rights reserved.
        </motion.div>
      </motion.div>

      <motion.div className="footer-links" variants={itemVariants}>
        {links.map((link, index) => (
          <motion.a key={index} href={link.href} transition={{ duration: 0.2 }}>
            {link.text}
          </motion.a>
        ))}
      </motion.div>

      <motion.div className="footer-social" variants={itemVariants}>
        {socialMedia.map((social, index) => (
          <motion.a
            key={index}
            className="social-icon"
            href={social.href}
            title={social.title}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
      <motion.div
        className="footer-copys"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        © 2024 Carpooling India. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
