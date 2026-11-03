// src/ItemTransaksi.jsx
// Komponen 2 Tugas 3: Item Transaksi dengan Warna Dinamis & Tombol Hapus

function ItemTransaksi({ transaksi, onHapus }) {
  const isPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>

      {/* Nominal berwarna hijau jika pemasukan dan merah jika pengeluaran */}
      <span className={isPemasukan ? 'pemasukan' : 'pengeluaran'} style={{ textAlign: 'right' }}>
        {isPemasukan ? '+' : '-'} Rp {transaksi.nominal.toLocaleString('id-ID')}
      </span>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;
