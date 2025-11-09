export const formatHarga = (harga) => {
  if (typeof harga !== "number") harga = Number(harga) || 0;
  return `Rp${harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};