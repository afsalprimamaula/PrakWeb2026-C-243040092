// src/components/finance/FormKeuangan.jsx
// Komponen 1 Tugas 3: Formulir Terkendali Tambah Transaksi Keuangan
import { useState } from 'react';

function FormKeuangan({ onTambahTransaksi }) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');
  const [jenis, setJenis] = useState('pemasukan');

  const tidakValid = keterangan.trim() === '' || nominal === '' || Number(nominal) <= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tidakValid) return;

    onTambahTransaksi({
      id: Date.now(),
      keterangan: keterangan.trim(),
      nominal: Number(nominal), // Mengubah teks input menjadi number
      jenis: jenis, // 'pemasukan' atau 'pengeluaran'
    });

    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
  };

  return (
    <form onSubmit={handleSubmit} className="form-keuangan">
      {/* Baris 1: Keterangan transaksi */}
      <div className="input-group">
        <input
          className="input input-full"
          type="text"
          placeholder="Keterangan transaksi (misal: Uang Jajan, Beli Buku)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
      </div>

      {/* Baris 2: Nominal, Jenis, dan Tombol Tambah */}
      <div className="baris baris-keuangan">
        <input
          className="input input-nominal"
          type="number"
          min="1"
          placeholder="Nominal (Rp)"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
        />

        <div className="select-wrapper">
          <select
            className="select-keuangan"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="pemasukan">Pemasukan (+)</option>
            <option value="pengeluaran">Pengeluaran (-)</option>
          </select>
        </div>

        <button
          className="tombol tombol-navy tombol-tambah"
          type="submit"
          disabled={tidakValid}
        >
          <span style={{ fontSize: '15px', marginRight: '4px', fontWeight: 'bold' }}>+</span> Tambah
        </button>
      </div>
    </form>
  );
}

export default FormKeuangan;
