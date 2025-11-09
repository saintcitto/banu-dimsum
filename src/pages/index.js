import * as React from "react";
import Layout from "../components/Layout/Layout";
import menuData from "../data/menuData";
import MenuCard from "../components/MenuCard/MenuCard";

export default function HomePage() {
  return (
    <Layout>
      <header className="home-header">
        <h1 className="brand-title">Banu Dimsum</h1>
        <p className="brand-subtitle">
          RASA <span className="highlight">ADALAH</span> SEGALANYA
        </p>
      </header>

      <main id="menu-container" className="menu-container">
        {menuData.map((kategori) => (
          <section
            className="menu-kategori"
            id={kategori.kategori.toLowerCase()}
            key={kategori.kategori}
          >
            <h2 className="kategori-title">{kategori.kategori}</h2>
            <div className="menu-grid">
              {kategori.items.map((item) => (
                <MenuCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}