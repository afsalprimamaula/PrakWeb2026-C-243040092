// src/App.jsx
// Sesuai Modul 2 Praktikum Web: React Lanjutan
// Dilengkapi Latihan Mandiri (Tugas 1 & 2) serta Tugas Terstruktur (Tugas 3)
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './components/ui/Kartu';
import Penghitung from './components/todo/Penghitung';
import FormTugas from './components/todo/FormTugas';
import ItemTugas from './components/todo/ItemTugas';
import RekapKeuangan from './components/finance/RekapKeuangan';

function App() {
  // Navigasi tab antara tugas utama modul dan tugas 3
  const [tabAktif, setTabAktif] = useState('tugas');

  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: 'Install Node js dan Vite', selesai: true },
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
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
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

  // SVG Icons
  const iconTambahTugas = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <polyline points="9 14 12 17 15 11" />
    </svg>
  );

  const iconDaftarTugas = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="14" x2="8.01" y2="14" />
      <line x1="12" y1="14" x2="12.01" y2="14" />
      <line x1="16" y1="14" x2="16.01" y2="14" />
      <line x1="8" y1="18" x2="8.01" y2="18" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );

  return (
    <div className="halaman-wrapper">
      <div className="wadah-aplikasi">
        {/* Header Kartu Biru Tua (Dark Navy Gradient) */}
        <header className="header-utama">
          <div className="header-kiri">
            <div className="header-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
              </svg>
            </div>
            <div className="header-teks">
              <h1 className="header-judul">Praktikum Modul 2</h1>
              <p className="header-subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>
            </div>
          </div>

          <div className="header-kanan">
            <div className="react-atom-icon" title="React 19">
              <svg width="34" height="34" viewBox="-11.5 -10.23174 23 20.46348">
                <circle cx="0" cy="0" r="2.05" fill="#38BDF8" />
                <g stroke="#38BDF8" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </div>
          </div>
        </header>

        {/* Tab Navigasi Modul (Pill Style) */}
        <nav className="nav-tabs-container">
          <button
            className={`tab-pill-btn ${tabAktif === 'tugas' ? 'aktif' : ''}`}
            onClick={() => setTabAktif('tugas')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Daftar Tugas Praktikum</span>
          </button>

          <button
            className={`tab-pill-btn ${tabAktif === 'keuangan' ? 'aktif' : ''}`}
            onClick={() => setTabAktif('keuangan')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>Catatan Keuangan Mini (Tugas 3)</span>
          </button>
        </nav>

        {/* Konten Tab Aktif */}
        {tabAktif === 'tugas' ? (
          <main className="tab-konten">
            {/* 1. Komponen Pemanasan useState */}
            <Penghitung />

            {/* 2. Form Tambah Tugas */}
            <Kartu
              judul="Tambah Tugas Baru"
              icon={iconTambahTugas}
              className="kartu-form-tugas"
            >
              <FormTugas onTambah={tambahTugas} />
            </Kartu>

            {/* 3. Kartu Daftar Tugas */}
            <Kartu
              judul="Daftar Tugas"
              icon={iconDaftarTugas}
              badge={
                <span className="badge-ringkasan-selesai">
                  {jumlahSelesai} dari {daftarTugas.length} tugas selesai
                </span>
              }
              className="kartu-daftar-tugas"
            >
              {/* Tombol Hapus Semua yang Selesai */}
              {jumlahSelesai > 0 && (
                <div className="baris-hapus-selesai">
                  <button
                    className="tombol-hapus-semua"
                    onClick={hapusSemuaSelesai}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Hapus Semua yang Selesai
                  </button>
                </div>
              )}

              {/* Tugas 1: Filter dengan tiga tombol & className dinamis */}
              <div className="filter-pill-group">
                <button
                  className={`filter-pill ${filter === 'semua' ? 'aktif' : ''}`}
                  onClick={() => setFilter('semua')}
                >
                  Semua
                </button>
                <button
                  className={`filter-pill ${filter === 'belum' ? 'aktif' : ''}`}
                  onClick={() => setFilter('belum')}
                >
                  Belum Selesai
                </button>
                <button
                  className={`filter-pill ${filter === 'selesai' ? 'aktif' : ''}`}
                  onClick={() => setFilter('selesai')}
                >
                  Selesai
                </button>
              </div>

              {/* Conditional rendering dengan ternary */}
              {tugasTerfilter.length === 0 ? (
                <p className="kosong">
                  {daftarTugas.length === 0
                    ? 'Belum ada tugas. Yuk tambahkan tugas pertamamu!'
                    : 'Tidak ada tugas pada filter ini.'}
                </p>
              ) : (
                <ul className="daftar-tugas-list">
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
          </main>
        ) : (
          /* Tugas 3: Catatan Keuangan Mini */
          <main className="tab-konten">
            <RekapKeuangan />
          </main>
        )}

        {/* Footer */}
        <footer className="footer-modul">
          <p>© 2025 Praktikum Modul 2 • React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
