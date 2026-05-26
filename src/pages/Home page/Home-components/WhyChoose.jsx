import React from "react";
import chooseUsimg1 from "../../../assets/Images/choose-sec-Img1.png";
import chooseUsimg2 from "../../../assets/Images/choose-sec-Img2.png";
import chooseUsimg3 from "../../../assets/Images/choose-sec-Img3.png";
import chooseUsimg4 from "../../../assets/Images/choose-sec-Img4.webp";
import { motion } from "framer-motion";

const WhyChoose = () => {
  const reasons = [
    {
      id: 1,
      iconClass: "icon-blue",
      icon: chooseUsimg1,
      title: "Verified Profiles",
      description: "Trusted members with verified details.",
    },
    {
      id: 2,
      iconClass: "icon-green",
      icon: chooseUsimg2,
      title: "Ratings & Reviews",
      description: "See real reviews from other travelers.",
    },
    {
      id: 3,
      iconClass: "icon-purple",
      icon: chooseUsimg3,
      title: "Mobile Friendly",
      description: "Book anytime, anywhere, on the go.",
    },
    {
      id: 4,
      iconClass: "icon-yellow",
      icon: chooseUsimg4,
      title: "Instant Booking",
      description: "Quick and easy booking process.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="why-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Why Choose Carpooling?
      </motion.h2>

      <motion.div className="why-grid" variants={containerVariants}>
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            className="why-card"
            variants={cardVariants}
            whileHover={{
              y: -15,
              scale: 1.02,
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className={`icon-wrap ${reason.iconClass}`}
              variants={iconVariants}
            >
              <motion.img
                src={reason.icon}
                alt=""
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                loading="eager"
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {reason.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {reason.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WhyChoose;
