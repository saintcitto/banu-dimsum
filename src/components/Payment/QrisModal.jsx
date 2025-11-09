import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QrisImage from '../../../static/qris-banu.png';
import { useCart } from '../../context/CartContext';
import { formatHarga } from '../../utils/format';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import '../../styles/components/_Modal.scss';
import '../../styles/components/_QrisModal.scss';

const QrisModal = ({ isOpen, onClose }) => {
  const { totalPrice, createWhatsAppLink } = useCart();

  const modalVariants = {
    hidden: { opacity: 0, y: "100vh" },
    visible: { opacity: 1, y: "0", transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, y: "100vh" }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content fixed-layout qris-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Bayar via QRIS</h3>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close QRIS modal">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28-32.19 0-44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
              </button>
            </div>

            <div className="payment-body">
              <div className="qr-section">
                <div className="qr-box">
                  <img src={QrisImage} alt="QRIS Banu Cafe" className="qris-image" />
                </div>
              </div>
              <div className="payment-info">
                <p><strong>Total:</strong> {formatHarga(totalPrice)}</p>
                {/* Timer and Progress Bar removed */}
              </div>
              {/* Progress Bar removed */}
              <button className="paid-btn" onClick={() => {
                const whatsappLink = createWhatsAppLink();
                window.open(whatsappLink, '_blank');
                onClose();
              }}>
                <FaCheckCircle /> Saya sudah bayar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QrisModal;