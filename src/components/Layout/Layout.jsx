import React, { useState } from "react";
import Loader from "../Loader/Loader.jsx";
import CartBar from "../Cart/CartBar.jsx";
import CartModal from "../Cart/CartModal.jsx";
import ConfirmationModal from "../Cart/ConfirmationModal.jsx";
import QrisModal from "../Payment/QrisModal.jsx";

export default function Layout({ children }) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false);

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
    setIsConfirmationModalOpen(false); // Ensure confirmation modal is closed
    setIsQrisModalOpen(false); // Ensure QRIS modal is closed
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleProceedToConfirmation = () => {
    setIsCartModalOpen(false); // Close cart modal
    setIsConfirmationModalOpen(true); // Open confirmation modal
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleOpenQris = () => {
    setIsQrisModalOpen(true);
    setIsConfirmationModalOpen(false); // Close confirmation modal
  };

  const handleCloseQris = () => {
    setIsQrisModalOpen(false);
  };

  return (
    <>
      <Loader />
      <div className="layout-wrapper">{children}</div>
      <CartBar onOpen={handleOpenCart} />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        onConfirm={handleProceedToConfirmation}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
        onOpenQris={handleOpenQris}
      />
      <QrisModal
        isOpen={isQrisModalOpen}
        onClose={handleCloseQris}
      />
    </>
  );
}