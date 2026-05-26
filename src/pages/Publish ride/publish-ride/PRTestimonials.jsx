import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: '5 years of using Carpooling, dozens of journeys, as many meetings and exchanges, not a single disappointment. THANK YOU!',
      author: 'Simon',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 2,
      text: 'Great platform for sharing rides! I\'ve saved so much money and met wonderful people along the way.',
      author: 'Maria',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      id: 3,
      text: 'Easy to use, reliable drivers, and fantastic support team. Highly recommended for long distance travel!',
      author: 'Raj',
      avatar: 'https://i.pravatar.cc/150?img=33'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.section 
      className="pr-testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="pr-testimonials-container">
        <motion.button
          className="pr-testimonial-arrow pr-testimonial-prev"
          onClick={prevTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        <div className="pr-testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="pr-testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="pr-testimonial-avatars">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className={`pr-testimonial-avatar ${index === currentIndex ? 'active' : ''}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: index === currentIndex ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={testimonial.avatar} alt={testimonial.author} loading="eager"/>
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                className="pr-testimonial-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {testimonials[currentIndex].text}
              </motion.p>
              
              <motion.p 
                className="pr-testimonial-author"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {testimonials[currentIndex].author}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          className="pr-testimonial-arrow pr-testimonial-next"
          onClick={nextTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      <div className="pr-testimonial-dots">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`pr-testimonial-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              backgroundColor: index === currentIndex ? '#1e40af' : '#cbd5e0'
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default PRTestimonials;
