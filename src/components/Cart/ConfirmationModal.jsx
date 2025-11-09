import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import EstimateTimer from '../EstimateTimer';
import '../../styles/components/_Modal.scss';
import '../../styles/components/_ConfirmationModal.scss';

const ConfirmationModal = ({ isOpen, onClose, onOpenQris }) => {
  const { items: cartItems, totalPrice, customerName, tableNumber, setCustomerName, setTableNumber, createWhatsAppLink } = useCart();

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleTableChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleCheckout = () => {
    if (!customerName) {
      alert("Mohon isi Nama Pemesan.");
      return;
    }
    if (!tableNumber) {
      alert("Mohon isi Nomor Meja.");
      return;
    }
    // const whatsappLink = createWhatsAppLink(); // Temporarily disable WhatsApp link opening
    // window.open(whatsappLink, '_blank');
    onClose();
    onOpenQris();
  };

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
            className="modal-content fixed-layout confirmation-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Konfirmasi Pesanan</h3>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close confirmation modal">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28-32.19 0-44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
              </button>
            </div>

            <div className="confirmation-body">
              {cartItems.length > 0 && <EstimateTimer items={cartItems} />}

              <div className="modal-customer-info">
                <input
                  type="text"
                  placeholder="Nama Pemesan..."
                  value={customerName}
                  onChange={handleNameChange}
                />
                <input
                  type="text"
                  placeholder="Nomor Meja..."
                  value={tableNumber}
                  onChange={handleTableChange}
                />
              </div>

              <div className="cart-footer">
                <div className="footer-total">
                  <span>Total</span>
                  <span className="total-amount">Rp{totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <button
                  className="footer-checkout-btn"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"></path>
                  </svg>
                  Bayar via QRIS
                </button>
                <p className="text-center text-xs text-gray-600 mt-2">Selesaikan pembayaran QRIS untuk mengaktifkan WhatsApp.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;