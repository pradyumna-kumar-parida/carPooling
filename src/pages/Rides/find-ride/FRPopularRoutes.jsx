import React from 'react';
import { motion } from 'framer-motion';

const FRPopularRoutes = () => {
  const routes = [
    { id: 1, from: 'New Delhi', to: 'Chandigarh' },
    { id: 2, from: 'New Delhi', to: 'Jaipur' },
    { id: 3, from: 'New Delhi', to: 'Agra' },
    { id: 4, from: 'Mumbai', to: 'Pune' },
    { id: 5, from: 'Agra', to: 'New Delhi' },
    { id: 6, from: 'Jaipur', to: 'New Delhi' },
    { id: 7, from: 'Chandigarh', to: 'New Delhi' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="fr-routes-section">
      <div className="fr-routes-wrapper">
        <motion.h2 
          className="fr-routes-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Travel for less on these popular routes
        </motion.h2>

        <motion.div 
          className="fr-routes-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {routes.map((route) => (
            <motion.div
              key={route.id}
              className="fr-route-item"
              variants={itemVariants}
            
            >
              <div className="fr-route-details">
                <span className="fr-route-from">{route.from}</span>
                <span className="fr-route-arrow">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="fr-route-to">{route.to}</span>
              </div>
              <motion.button 
                className="fr-route-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FRPopularRoutes;
