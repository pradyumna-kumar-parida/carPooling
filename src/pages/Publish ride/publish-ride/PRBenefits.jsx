import React from "react";
import { motion } from "framer-motion";
import { FaCarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
const PRBenefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Drive.",
      description:
        "Keep your plans! Hit the road just as you planned and make the most of your vehicle's empty seats.",
      icon: <FaCarAlt />,
    },
    {
      id: 2,
      title: "Share.",
      description:
        "Travel with good company. Share a carpool ride with travellers from all walks of life.",
      icon: <FaUsers />,
    },
    {
      id: 3,
      title: "Save.",
      description:
        "Tolls, petrol, electricity... Easily divvy up all the costs with other passengers.",
      icon: <MdAttachMoney />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="pr-benefits">
      <motion.h2
        className="pr-benefits-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Drive. Share. Save.
      </motion.h2>

      <motion.div
        className="pr-benefits-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.id}
            className="pr-benefit-card"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
          >
            <motion.div
              className="pr-benefit-icon"
              transition={{ duration: 0.6 }}
            >
              {benefit.icon}
            </motion.div>
            <h3 className="pr-benefit-title">{benefit.title}</h3>
            <p className="pr-benefit-desc">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PRBenefits;
