// src/components/finance/ItemKeuangan.jsx
// Komponen 2 Tugas 3: Item Transaksi dengan Visual Berwarna Dinamis & Badge
function ItemKeuangan({ transaksi, onHapus }) {
  const isPemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className={`item-keuangan-row ${isPemasukan ? 'row-pemasukan' : 'row-pengeluaran'}`}>
      <div className="item-keuangan-kiri">
        <div className={`indicator-circle ${isPemasukan ? 'circle-pemasukan' : 'circle-pengeluaran'}`}>
          {isPemasukan ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          )}
        </div>
        <span className="keterangan-keuangan">{transaksi.keterangan}</span>
      </div>

      <div className="item-keuangan-kanan">
        <span className={`nominal-keuangan ${isPemasukan ? 'nominal-pemasukan' : 'nominal-pengeluaran'}`}>
          {isPemasukan ? '+ ' : '- '}Rp {transaksi.nominal.toLocaleString('id-ID')}
        </span>

        <span className={`badge-jenis ${isPemasukan ? 'badge-pemasukan' : 'badge-pengeluaran'}`}>
          {isPemasukan ? 'Pemasukan' : 'Pengeluaran'}
        </span>

        <button
          className="tombol-hapus-keuangan"
          onClick={() => onHapus(transaksi.id)}
          title="Hapus transaksi"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default ItemKeuangan;
