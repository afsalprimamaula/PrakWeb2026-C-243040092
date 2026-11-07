// src/components/finance/RekapKeuangan.jsx
// Komponen Induk Tugas 3: Aplikasi Catatan Keuangan Mini
import { useState, useEffect } from 'react';
import Kartu from '../ui/Kartu';
import FormKeuangan from './FormKeuangan';
import ItemKeuangan from './ItemKeuangan';

function RekapKeuangan() {
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

  const iconFinance = (
    <div className="icon-finance-circle">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    </div>
  );

  return (
    <div className="finance-container">
      <Kartu
        judul="Catatan Keuangan Mini"
        subjudul="Kelola keuanganmu dengan mudah"
        icon={iconFinance}
        className="kartu-keuangan"
      >
        {/* Ringkasan Total Saldo & Arus Kas */}
        <div className="saldo-card">
          <div className="saldo-left">
            <span className="saldo-label">Total Saldo Saat Ini</span>
            <span
              className="saldo-nominal-besar"
              style={{ color: totalSaldo >= 0 ? '#0f172a' : '#dc2626' }}
            >
              Rp {totalSaldo.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="saldo-divider"></div>

          <div className="saldo-right">
            <div className="saldo-stream stream-masuk">
              <span className="stream-badge-circle stream-circle-masuk">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </span>
              <span className="stream-title">Masuk</span>
              <span className="stream-nominal nominal-masuk">+Rp {totalPemasukan.toLocaleString('id-ID')}</span>
            </div>

            <div className="saldo-stream stream-keluar">
              <span className="stream-badge-circle stream-circle-keluar">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </span>
              <span className="stream-title">Keluar</span>
              <span className="stream-nominal nominal-keluar">-Rp {totalPengeluaran.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Formulir Terkendali */}
        <FormKeuangan onTambahTransaksi={tambahTransaksi} />

        {/* Daftar Transaksi dengan Conditional Rendering */}
        {transaksi.length === 0 ? (
          <p className="kosong">
            Belum ada transaksi. Tambahkan catatan pemasukan/pengeluaran pertama Anda!
          </p>
        ) : (
          <ul className="daftar-keuangan">
            {transaksi.map((t) => (
              <ItemKeuangan
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

export default RekapKeuangan;
