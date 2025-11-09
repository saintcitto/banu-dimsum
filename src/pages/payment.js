import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { QRIS_IMAGE, WHATSAPP_NUMBER } from "../lib/config";

export default function PaymentPage() {
  const {
    items,
    totalPrice,
    customerName,
    tableNumber,
    estimateCookingTime,
    setCustomerName,
    setTableNumber,
  } = useCart();

  const [orderType, setOrderType] = useState("");

  if (items.length === 0)
    return <div className="p-8 text-center">Keranjang kamu kosong.</div>;

  const estimate = estimateCookingTime();

  const sendToWhatsApp = () => {
    const message = encodeURIComponent(
`🧾 *Pesanan Baru - Banu Dimsum*
Nama: ${customerName || "-"}
Jenis Pemesanan: ${orderType || "-"}
Nomor Meja: ${tableNumber || "Online"}
Total: Rp${totalPrice.toLocaleString("id-ID")}
Estimasi Siap: ${estimate} menit`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-xl font-bold text-center mb-5">Pembayaran</h1>

      <label htmlFor="customerName" className="block font-semibold mb-1">Nama Pemesan</label>
      <input
        id="customerName"
        className="border w-full p-2 rounded mb-3"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <label htmlFor="orderType" className="block font-semibold mb-1">Jenis Pemesanan</label>
      <select
        id="orderType"
        className="border w-full p-2 rounded mb-3"
        onChange={(e) => setOrderType(e.target.value)}
      >
        <option value="">Pilih</option>
        <option value="onspot">On the Spot</option>
        <option value="online">Online</option>
      </select>

      {orderType === "onspot" && (
        <>
          <label htmlFor="tableNumber" className="block font-semibold mb-1">Nomor Meja</label>
          <select
            id="tableNumber"
            className="border w-full p-2 rounded mb-3"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          >
            <option value="">Pilih Meja</option>
            {[...Array(20)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </>
      )}

      <p className="text-center mb-4">
        Estimasi pesanan siap dalam <b>{estimate} menit</b>.
      </p>

      <div className="text-center">
        <p className="font-semibold mb-2">Bayar via QRIS</p>
        <img
          src={QRIS_IMAGE}
          alt="QRIS"
          width={200}
          height={200}
          className="mx-auto rounded-lg"
        />
      </div>

      <button
        onClick={sendToWhatsApp}
        className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold"
      >
        Konfirmasi Pembayaran & Kirim ke WhatsApp
      </button>
    </div>
  );
}
