// src/App.jsx
// Sesuai Modul 2 Praktikum Web: React Lanjutan
// Dilengkapi Latihan Mandiri (Tugas 1 & 2) serta Tugas Terstruktur (Tugas 3)
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';
import CatatanKeuangan from './CatatanKeuangan';

function App() {
  // Navigasi tab antara tugas utama modul dan tugas 3
  const [tabAktif, setTabAktif] = useState('tugas');

  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan); // ubah teks JSON kembali menjadi array
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // State untuk filter tugas (Tugas 1: Latihan Mandiri)
  const [filter, setFilter] = useState('semua');

  // Efek A: dijalankan SEKALI saat App pertama kali tampil
  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!');
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // 2. Menambah tugas: buat array BARU berisi tugas lama + tugas baru (immutable)
  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // 3. Mengubah status selesai: salin tugas yang dicentang, biarkan yang lain
  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai }; // salinan dengan status dibalik
      }
      return tugas; // tugas lain tidak berubah
    });
    setDaftarTugas(daftarBaru);
  };

  // 4. Menghapus tugas: ambil semua tugas KECUALI yang id-nya sama
  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // 5. Menghapus semua yang selesai (Tugas 2: Conditional Rendering)
  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // 6. Nilai turunan: dihitung dari state, tidak perlu state baru
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // Filter tugas sebelum ditampilkan di layar (Tugas 1)
  const tugasTerfilter = daftarTugas.filter((tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true; // 'semua'
  });

  return (
    <div className="wadah">
      <h1 className="judul">Praktikum Modul 2</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

      {/* Navigasi Tab Modul */}
      <div className="nav-modul">
        <button
          className={`tab-modul-btn ${tabAktif === 'tugas' ? 'aktif' : ''}`}
          onClick={() => setTabAktif('tugas')}
        >
          Daftar Tugas Praktikum
        </button>
        <button
          className={`tab-modul-btn ${tabAktif === 'keuangan' ? 'aktif' : ''}`}
          onClick={() => setTabAktif('keuangan')}
        >
          Catatan Keuangan Mini (Tugas 3)
        </button>
      </div>

      {tabAktif === 'tugas' ? (
        <>
          {/* Komponen Pemanasan useState */}
          <Penghitung />

          {/* Form Tambah Tugas */}
          <Kartu judul="Tambah Tugas Baru">
            <FormTugas onTambah={tambahTugas} />
          </Kartu>

          {/* Daftar Tugas */}
          <Kartu judul="Daftar Tugas">
            <div className="ringkasan">
              <span>
                {jumlahSelesai} dari {daftarTugas.length} tugas selesai
              </span>

              {/* Tugas 2: Tombol Hapus Semua yang Selesai menggunakan operator && */}
              {jumlahSelesai > 0 && (
                <button
                  className="tombol tombol-merah tombol-kecil"
                  onClick={hapusSemuaSelesai}
                >
                  Hapus Semua yang Selesai
                </button>
              )}
            </div>

            {/* Tugas 1: Filter dengan tiga tombol & className dinamis */}
            <div className="filter-group">
              <button
                className={`tombol-filter ${filter === 'semua' ? 'aktif' : ''}`}
                onClick={() => setFilter('semua')}
              >
                Semua
              </button>
              <button
                className={`tombol-filter ${filter === 'belum' ? 'aktif' : ''}`}
                onClick={() => setFilter('belum')}
              >
                Belum Selesai
              </button>
              <button
                className={`tombol-filter ${filter === 'selesai' ? 'aktif' : ''}`}
                onClick={() => setFilter('selesai')}
              >
                Selesai
              </button>
            </div>

            {/* Conditional rendering dengan ternary: tampilkan pesan jika kosong */}
            {tugasTerfilter.length === 0 ? (
              <p className="kosong">
                {daftarTugas.length === 0
                  ? 'Belum ada tugas. Yuk tambahkan tugas pertamamu!'
                  : 'Tidak ada tugas pada filter ini.'}
              </p>
            ) : (
              <ul className="daftar">
                {tugasTerfilter.map((tugas) => (
                  <ItemTugas
                    key={tugas.id}
                    tugas={tugas}
                    onUbahStatus={ubahStatus}
                    onHapus={hapusTugas}
                  />
                ))}
              </ul>
            )}
          </Kartu>
        </>
      ) : (
        /* Tugas 3: Catatan Keuangan Mini */
        <CatatanKeuangan />
      )}
    </div>
  );
}

export default App;
