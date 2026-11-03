// src/CatatanKeuangan.jsx
// Komponen 3 Tugas 3: Aplikasi Catatan Keuangan Mini
import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';

function CatatanKeuangan() {
  // State transaksi dengan inisialisasi dari localStorage
  const [transaksi, setTransaksi] = useState(() => {
    const dataSimpan = localStorage.getItem('catatan-keuangan');
    if (dataSimpan) {
      return JSON.parse(dataSimpan);
    }
    return [
      { id: 1, keterangan: 'Uang Saku Bulanan', nominal: 500000, jenis: 'pemasukan' },
      { id: 2, keterangan: 'Buku Modul Praktikum', nominal: 75000, jenis: 'pengeluaran' },
    ];
  });

  // Efek samping useEffect untuk menyimpan ke localStorage setiap transaksi berubah
  useEffect(() => {
    localStorage.setItem('catatan-keuangan', JSON.stringify(transaksi));
  }, [transaksi]);

  // Tambah transaksi baru (immutable update menggunakan spread operator)
  const tambahTransaksi = (itemBaru) => {
    setTransaksi([itemBaru, ...transaksi]);
  };

  // Hapus transaksi berdasarkan id (immutable update menggunakan .filter())
  const hapusTransaksi = (id) => {
    setTransaksi(transaksi.filter((t) => t.id !== id));
  };

  // Menghitung total saldo, total pemasukan, dan total pengeluaran otomatis dari state
  const totalPemasukan = transaksi
    .filter((t) => t.jenis === 'pemasukan')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.jenis === 'pengeluaran')
    .reduce((sum, t) => sum + t.nominal, 0);

  const totalSaldo = totalPemasukan - totalPengeluaran;

  return (
    <div>
      <Kartu judul="Catatan Keuangan Mini (Tugas 3)">
        {/* Ringkasan Total Saldo */}
        <div className="saldo-box">
          <div>
            <div className="saldo-label">Total Saldo Saat Ini</div>
            <div
              className="saldo-nominal"
              style={{ color: totalSaldo >= 0 ? '#1B365D' : '#DC2626' }}
            >
              Rp {totalSaldo.toLocaleString('id-ID')}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '13px' }}>
            <div className="pemasukan">Masuk: +Rp {totalPemasukan.toLocaleString('id-ID')}</div>
            <div className="pengeluaran">Keluar: -Rp {totalPengeluaran.toLocaleString('id-ID')}</div>
          </div>
        </div>

        {/* Formulir Terkendali */}
        <FormTransaksi onTambahTransaksi={tambahTransaksi} />

        {/* Daftar Transaksi dengan Conditional Rendering */}
        {transaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Tambahkan catatan pemasukan/pengeluaran pertama Anda!</p>
        ) : (
          <ul className="daftar">
            {transaksi.map((t) => (
              <ItemTransaksi
                key={t.id}
                transaksi={t}
                onHapus={hapusTransaksi}
              />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default CatatanKeuangan;
