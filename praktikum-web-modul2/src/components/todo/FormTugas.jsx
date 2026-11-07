// src/components/todo/FormTugas.jsx
// Sesuai Langkah 4 Modul 2 Praktikum Web: Formulir Terkendali (Controlled Form)
import { useState } from 'react';

function FormTugas({ onTambah }) {
  // State lokal untuk menampung isi input
  const [teks, setTeks] = useState('');

  // Validasi sederhana: tidak boleh kosong dan maksimal 50 karakter
  const terlaluPanjang = teks.length > 50;
  const tidakValid = teks.trim() === '' || terlaluPanjang;

  const tanganiKirim = (event) => {
    event.preventDefault(); // mencegah reload formulir
    if (tidakValid) return; // hentikan jika input tidak valid

    onTambah(teks.trim()); // kirim nilai ke komponen induk (App)
    setTeks(''); // bersihkan input kembali
  };

  return (
    <form onSubmit={tanganiKirim} className="form-tugas">
      <div className="baris baris-input">
        <input
          className="input input-tugas"
          type="text"
          placeholder="Contoh: Kerjakan laporan Modul 2"
          value={teks}
          onChange={(event) => setTeks(event.target.value)}
        />
        <button
          className="tombol tombol-navy tombol-tambah"
          type="submit"
          disabled={tidakValid}
        >
          <span style={{ fontSize: '15px', marginRight: '4px', fontWeight: 'bold' }}>+</span> Tambah
        </button>
      </div>
      {terlaluPanjang && <p className="galat">Judul tugas maksimal 50 karakter.</p>}
    </form>
  );
}

export default FormTugas;
