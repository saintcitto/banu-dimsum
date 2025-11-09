import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaClock } from "react-icons/fa";

export default function PaymentModal({ isOpen, onClose, amount, onPaid }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(30);
    setProgress(100);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    setProgress((timeLeft / 30) * 100);
  }, [timeLeft]);

  const handlePaid = () => {
    onPaid();
    onClose();
  };

  const QRISImage = "/qris-banu.png";

  if (typeof window === "undefined") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop visible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) =>
            e.target.classList.contains("modal-backdrop") && onClose()
          }
        >
          <motion.div
            className="modal-content improved"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="modal-header">
              <h3>Bayar via QRIS</h3>
              <button className="modal-close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="payment-body">
              <div className="qr-section">
                <div className="qr-box">
                  <img src={QRISImage} alt="QRIS Banu Cafe" />
                </div>
              </div>

              <div className="payment-info">
                <p>
                  <strong>Total:</strong> Rp{amount.toLocaleString("id-ID")}
                </p>
                <div className="timer">
                  <FaClock /> QR berakhir dalam <strong>{timeLeft}s</strong>
                </div>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <button className="paid-btn" onClick={handlePaid}>
                <FaCheckCircle /> Saya sudah bayar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
