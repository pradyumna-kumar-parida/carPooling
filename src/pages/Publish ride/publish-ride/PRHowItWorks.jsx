import React from "react";
import { motion } from "framer-motion";

const PRHowItWorks = () => {
  const steps = [
    {
      id: 1,

      title: "Create a Carpooling account",
      description:
        "Add your profile picture, a few words about you and your phone number to increase trust between members.",
    },
    {
      id: 2,

      title: "Publish your ride",
      description:
        "Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings.",
    },
    {
      id: 3,

      title: "Accept booking requests",
      description:
        "Review passenger profiles and accept their requests to ride with you. That's how easy it is to start saving on travel costs!",
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="pr-how-it-works">
      <motion.h2
        className="pr-how-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Publish your ride in just minutes
      </motion.h2>

      <div className="pr-how-content">
        <motion.div
          className="pr-how-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="pr-video-placeholder">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80"
              alt="How it works"
              className="pr-video-thumbnail"
              loading="eager"
            />
          </div>
        </motion.div>

        <motion.div
          className="pr-how-steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="pr-step"
              variants={itemVariants}
            >
              <motion.div
                className="pr-step-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
              >
                {step.id}
              </motion.div>
              <div className="pr-step-content">
                <h3 className="pr-step-title">{step.title}</h3>
                <p className="pr-step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PRHowItWorks;
