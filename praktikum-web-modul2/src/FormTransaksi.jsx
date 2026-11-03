// src/FormTransaksi.jsx
// Komponen 1 Tugas 3: Formulir Terkendali Tambah Transaksi Keuangan
import { useState } from 'react';

function FormTransaksi({ onTambahTransaksi }) {
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
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          className="input"
          type="text"
          placeholder="Keterangan transaksi (misal: Uang Jajan, Beli Buku)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />

        <div className="baris">
          <input
            className="input"
            type="number"
            min="1"
            placeholder="Nominal (Rp)"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
          />

          <select
            className="select"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="pemasukan">Pemasukan (+)</option>
            <option value="pengeluaran">Pengeluaran (-)</option>
          </select>

          <button className="tombol" type="submit" disabled={tidakValid}>
            Tambah
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormTransaksi;
