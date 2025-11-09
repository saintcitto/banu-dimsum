import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import cookingTimeRules from "../lib/cookingTimeRules";
import "../styles/estimate-timer.scss";

export default function EstimateTimer() {
  const { items } = useCart();
  const [estimate, setEstimate] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  const calculateEstimate = useCallback(() => {
    const baseTime = 5;
    let totalTime = baseTime;

    items.forEach((item) => {
      const kategori = Object.keys(cookingTimeRules).find((key) =>
        item.nama.toLowerCase().includes(key.toLowerCase().split(" ")[0])
      );
      const waktu = cookingTimeRules[kategori] || 10;
      totalTime += waktu * item.quantity;
    });

    return totalTime > 30 ? 30 : totalTime;
  }, [items]); // Add items to the dependency array of useCallback

  useEffect(() => {
    const newEstimate = calculateEstimate();
    setEstimate(newEstimate);
    setProgress((newEstimate / 30) * 100);

    if (newEstimate <= 10) {
      setStatusText("🔥 Proses cepat, pesanan kamu sedang dipanaskan dan plating.");
    } else if (newEstimate <= 20) {
      setStatusText("👨‍🍳 Sedang dikukus dan disiapkan dengan teliti di dapur.");
    } else if (newEstimate <= 30) {
      setStatusText("🍜 Pesanan kompleks, sedang di-grill dan finishing torch, mohon bersabar.");
    } else {
      setStatusText("⏱️ Pesanan padat, antrian dapur sedang penuh. Mohon bersabar ya 🙏");
    }
  }, [calculateEstimate]);

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      className="estimate-timer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="timer-header">
        <FaClock className="clock-icon" />
        <h2 className="title">Estimasi Waktu Siap Masak</h2>
      </div>

      <div className="bar-wrapper">
        <motion.div
          className="bar"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background:
              estimate <= 10
                ? "#22c55e"
                : estimate <= 20
                ? "#facc15"
                : "#ef4444",
          }}
        />
      </div>

      <p className="estimate-text">
        Diperkirakan siap dalam <b>{estimate} menit</b>
      </p>

      <p className="status">{statusText}</p>
    </motion.div>
  );
}
