import React, { useEffect, useState } from "react";
import "../../styles/components/_Loader.scss";
import Logo from "../../assets/logo-banu.jpeg";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="brand-loader">
      <div className="brand-logo">
        <img src={Logo} alt="Banu Dimsum" className="logo-fade" />
      </div>

      <div className="brand-text">
        <h1 className="brand-name">Banu Dimsum</h1>
        <p className="credit-line">crafted by <span>@cittowest</span></p>
      </div>
    </div>
  );
}