import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("cartItems");
      const savedName = localStorage.getItem("customerName");
      const savedTable = localStorage.getItem("tableNumber");
      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedName) setCustomerName(savedName);
      if (savedTable) setTableNumber(savedTable);
    } catch (err) {
      console.error("⚠️ Gagal memuat data:", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (customerName) localStorage.setItem("customerName", customerName);
  }, [customerName]);

  useEffect(() => {
    if (tableNumber) localStorage.setItem("tableNumber", tableNumber);
  }, [tableNumber]);

  const addItem = (item) => {
    setItems((prev) => {
      const exist = prev.find((p) => p.slug === item.slug);
      return exist
        ? prev.map((p) =>
            p.slug === item.slug ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (slug) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.slug === slug ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const totalPrice = items.reduce((sum, i) => sum + i.harga * i.quantity, 0);

  const estimateCookingTime = () => {
    const baseTime = 10;
    const perItem = 3;
    const total = baseTime + items.length * perItem;
    return total > 30 ? 30 : total;
  };

  const createWhatsAppLink = () => {
    if (items.length === 0) return "https://wa.me/6282164032299";

    const header = "*Pesanan Baru dari Website Banu Dimsum*";
    const line = "-----------------------------------";

    const orderList = items
      .map(
        (i, index) =>
          `${index + 1}. *${i.nama}*\nJumlah: ${i.quantity}x\nSubtotal: Rp${(
            i.harga * i.quantity
          ).toLocaleString("id-ID")}`
      )
      .join("\n\n");

    const total = `*Total Pembayaran: Rp${totalPrice.toLocaleString("id-ID")}*`;
    const nameInfo = `Nama Pemesan: *${customerName}*`;
    const tableInfo = `Nomor Meja: *${tableNumber}*`;
    const estimateInfo = `Estimasi Siap: *${estimateCookingTime()} menit*`;

    const message = [
      header,
      line,
      orderList,
      line,
      total,
      nameInfo,
      tableInfo,
      estimateInfo,
    ].join("\n");

    const cleanMessage = encodeURIComponent(message);

    return `https://wa.me/6282164032299?text=${cleanMessage}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        totalPrice,
        createWhatsAppLink,
        customerName,
        setCustomerName,
        tableNumber,
        setTableNumber,
        estimateCookingTime,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
