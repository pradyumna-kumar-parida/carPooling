import React from "react";
import { motion } from "framer-motion";
import "../styles/mobileapp-DL.css";

const MobileApp = () => {
  return (
    <motion.section
      className="ma-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="ma-container">
        <motion.div
          className="ma-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="ma-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Enjoy a better travel experience with the BlaBlaCar app
          </motion.h2>

          <motion.p
            className="ma-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            All your rides and tickets in one place, up-to-date info and
            exclusive mobile-only features.
          </motion.p>

          <motion.div
            className="ma-download-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* App Store Button - Image Placeholder */}
            <motion.a
              href="#appstore"
              className="ma-store-btn ma-appstore"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="ma-store-placeholder">
                {/* Your App Store image will go here */}
                <img
                  src="/path-to-your-appstore-badge.png"
                  alt="Download on App Store"
                  className="ma-store-img"
                  loading="eager"
                />
              </div>
            </motion.a>

            {/* Google Play Button - Image Placeholder */}
            <motion.a
              href="#googleplay"
              className="ma-store-btn ma-playstore"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="ma-store-placeholder">
                {/* Your Google Play image will go here */}
                <img
                  src="/path-to-your-googleplay-badge.png"
                  alt="Get it on Google Play"
                  className="ma-store-img"
                  loading="eager"
                />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Phone Mockup - Image Placeholder */}
        <motion.div
          className="ma-phone-mockup"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="ma-phone-placeholder"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Your phone mockup image will go here */}
            <img
              src="/path-to-your-phone-mockup.png"
              alt="BlaBlaCar App"
              className="ma-phone-img"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MobileApp;
