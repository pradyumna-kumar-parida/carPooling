import React from "react";
import { motion } from "framer-motion";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
const PRSupport = () => {
  const supports = [
    {
      id: 1,
      icon: <RiCustomerServiceFill />,
      title: "At your service 24/7",
      description:
        "Our team is at your disposal to answer any questions by email or social media. You can also have a live chat directly with experienced members.",
    },
    {
      id: 2,
      icon: <FaCar />,
      title: "Carpooling at your side",
      description:
        "For just 2 €, benefit from the reimbursement of up to 1,500€ of your excess when you publish a ride as a driver on Carpooling.",
    },
    {
      id: 3,
      icon: <MdSecurity />,
      title: "100% secure information",
      description:
        "Our team is dedicated to the protection of your data which is always 100% confidential thanks to monitoring, storage and encrypted data.",
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="pr-support">
      <motion.h2
        className="pr-support-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        We're here every step of the way
      </motion.h2>

      <motion.div
        className="pr-support-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {supports.map((support) => (
          <motion.div
            key={support.id}
            className="pr-support-card"
            variants={itemVariants}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
            }}
          >
            <motion.div
              className="pr-support-icon"
              transition={{ duration: 0.6 }}
            >
              {support.icon}
            </motion.div>
            <h3 className="pr-support-card-title">{support.title}</h3>
            <p className="pr-support-desc">{support.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PRSupport;
