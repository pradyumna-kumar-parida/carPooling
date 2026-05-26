import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown } from "react-icons/fa6";
const PRFaq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I set the passenger contribution for my ride?',
      answer: 'We recommend a contribution per passenger on your rides (these most likely to get your seats filled) but can still be adjusted within a margin of our recommendation. The contribution is calculated based on the distance and the number of passengers.'
    },
    {
      id: 2,
      question: 'When do I get my money?',
      answer: 'We send you your money within 48 hours after the ride if you travelled as planned. You\'ll get your money by 5 weekdays (not counting weekends and holidays) after we send it.'
    },
    {
      id: 3,
      question: 'What should I do if there\'s an error with my ride?',
      answer: 'You should edit your ride as soon as you spot the error. If you can\'t edit your ride because passengers have already booked, contact them to inform them of the changes.'
    },
    {
      id: 4,
      question: 'How do I cancel a carpool ride as a driver or a rider?',
      answer: 'It only takes a minute to cancel a listed ride. However, if a driver cannot fulfill a ride that has been booked by passengers, it is crucial for the driver to inform passengers in a timely manner to allow the passenger time to adjust their plans. Before cancelling we advise drivers to let passengers know.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="pr-faq">
      <motion.h2
        className="pr-faq-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Everything you need as a driver, in our Help Centre
      </motion.h2>

      <div className="pr-faq-grid">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            className="pr-faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              className={`pr-faq-question ${openFaq === faq.id ? "active" : ""}`}
              onClick={() => toggleFaq(faq.id)}
              whileHover={{ backgroundColor: "#f7f9fb" }}
            >
              <span>{faq.question}</span>
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pr-faq-icon"
                animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaAngleDown />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {openFaq === faq.id && (
                <motion.div
                  className="pr-faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                  <motion.a
                    href="#"
                    className="pr-faq-link"
                    whileHover={{ x: 5 }}
                  >
                    Read more →
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div className="pr-faq-actions">
        <motion.button
          className="pr-btn pr-btn-secondary"
          whileTap={{ scale: 0.98 }}
        >
          See more answers
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PRFaq;
