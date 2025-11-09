import * as React from "react";
import { Link } from "gatsby";

export default function NotFoundPage() {
  return (
    <main style={{ padding: "5rem", textAlign: "center" }}>
      <h1>Halaman Tidak Ditemukan 😕</h1>
      <p>Sepertinya kamu nyasar. Kembali ke <Link to="/">beranda</Link>.</p>
    </main>
  );
}