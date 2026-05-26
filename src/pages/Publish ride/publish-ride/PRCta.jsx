import React from 'react';
import { motion } from 'framer-motion';

const PRCta = () => {
  return (
    <motion.section
      className="pr-cta"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="pr-cta-content">
        <motion.h2
          className="pr-cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Ready to start sharing rides?
        </motion.h2>
        <motion.p
          className="pr-cta-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Join millions of drivers and start saving on your travel costs today
        </motion.p>
        <motion.button
          className="pr-btn pr-btn-primary"
          whileTap={{ scale: 0.98 }}
        >
          Publish a ride
        </motion.button>
      </div>
    </motion.section>
  );
};

export default PRCta;
