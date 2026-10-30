// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBook,
  FiUser,
  FiZap,
  FiCheck,
  FiX,
  FiBell,
  FiStar,
  FiCalendar,
  FiClock,
  FiGrid,
  FiFolder,
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi';
import KartuProfil from './KartuProfil';
import ItemMatkul from './ItemMatkul';
import PortofolioMini from './PortofolioMini';
import './App.css';

// 1. Data daftar mata kuliah praktikum semester ini
const daftarPraktikum = [
  {
    id: 101,
    kode: 'IF211',
    nama: 'Pemrograman Web (React & Laravel)',
    sks: 3,
    hari: 'Senin',
    jam: '08:00 - 10:30',
    ruang: 'Lab. Rekayasa Web (Lab 1)',
    dosen: 'Dr. Ahmad Wijaya, M.Kom',
    icon: '⚛️',
    kategori: 'Frontend & Fullstack',
    nilai: 'A',
  },
  {
    id: 102,
    kode: 'IF212',
    nama: 'Sistem Basis Data (PostgreSQL)',
    sks: 3,
    hari: 'Rabu',
    jam: '13:00 - 15:30',
    ruang: 'Lab. Basis Data (Lab 3)',
    dosen: 'Dr. Siti Rahayu, M.T',
    icon: '🗄️',
    kategori: 'Database Architecture',
    nilai: 'A',
  },
  {
    id: 103,
    kode: 'IF213',
    nama: 'Rekayasa Perangkat Lunak Terapan',
    sks: 3,
    hari: 'Kamis',
    jam: '10:00 - 12:30',
    ruang: 'Lab. Software Engineering (Lab 2)',
    dosen: 'Prof. Budi Santoso, Ph.D',
    icon: '🔧',
    kategori: 'Software Engineering',
    nilai: 'A-',
  },
  {
    id: 104,
    kode: 'IF214',
    nama: 'Arsitektur Sistem Terdistribusi',
    sks: 2,
    hari: 'Jumat',
    jam: '14:00 - 15:40',
    ruang: 'Lab. Komputasi Awan (Lab 4)',
    dosen: 'Dr. Rina Kartika, M.Sc',
    icon: '🏗️',
    kategori: 'Cloud & Infrastructure',
    nilai: 'A',
  },
];

const DAFTAR_HARI = ['Semua Hari', 'Senin', 'Rabu', 'Kamis', 'Jumat'];

// Custom Hook untuk Toast Notification
function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

export default function App() {
  const { toasts, addToast, removeToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('Semua Hari');
  const [activeTabNav, setActiveTabNav] = useState('dashboard');

  // Trigger notifikasi sambutan saat pertama kali load
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        title: 'Selamat Datang, AFSAL PRIMA MAULA! 👋',
        message: 'Aplikasi Praktikum Pemrograman Web (React JS & Vite) siap diuji.',
        type: 'success',
        duration: 4500,
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [addToast]);

  // Filter data praktikum berdasarkan hari
  const filteredPraktikum =
    activeFilter === 'Semua Hari'
      ? daftarPraktikum
      : daftarPraktikum.filter((item) => item.hari === activeFilter);

  const totalSKS = daftarPraktikum.reduce((sum, item) => sum + item.sks, 0);

  // Event handler interaktivitas
  const handleSelectMatkul = (matkul) => {
    addToast({
      title: `Detail Matkul: ${matkul.kode}`,
      message: `${matkul.nama} • Ruang: ${matkul.ruang}`,
      type: 'info',
      duration: 3500,
    });
  };

  const notifikasiSapaan = () => {
    addToast({
      title: '🚀 Fondasi React Berhasil Dikuasai!',
      message:
        'Komponen, Props, State, dan Event Handling di Modul 1 berjalan secara profesional!',
      type: 'success',
      duration: 5000,
    });
  };

  return (
    <div className="page" style={{ position: 'relative' }}>
      {/* Container Toast Notifications */}
      <div className="toast-wrap">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`toast ${toast.type}`}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <span className="toast-ico">
                {toast.type === 'success' && '✅'}
                {toast.type === 'info' && '💡'}
                {toast.type === 'warning' && '⚠️'}
              </span>
              <div className="toast-body">
                <div className="toast-title">{toast.title}</div>
                {toast.message && <div className="toast-msg">{toast.message}</div>}
              </div>
              <button
                className="toast-x"
                onClick={() => removeToast(toast.id)}
                aria-label="Tutup notifikasi"
              >
                <FiX />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="app-container">
          <div className="navbar-inner">
            <div className="navbar-brand">
              <div className="brand-icon">⚛️</div>
              <div className="brand-text">
                <span className="brand-title">PrakWeb 2026</span>
                <span className="brand-sub">Informatika — React & Vite</span>
              </div>
            </div>

            <nav className="navbar-nav">
              <button
                className={`nav-link-btn ${activeTabNav === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTabNav('dashboard')}
              >
                <FiGrid /> Dashboard
              </button>
              <button
                className={`nav-link-btn ${activeTabNav === 'praktikum' ? 'active' : ''}`}
                onClick={() => setActiveTabNav('praktikum')}
              >
                <FiBook /> Daftar Praktikum
              </button>
              <button
                className={`nav-link-btn ${activeTabNav === 'portofolio' ? 'active' : ''}`}
                onClick={() => setActiveTabNav('portofolio')}
              >
                <FiFolder /> Showcase Portofolio
              </button>
            </nav>

            <span className="nav-badge-pill">Modul 1: React</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="app-container">
          {/* HERO BANNER */}
          <motion.section
            className="hero-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-pill-badge">
              <HiOutlineSparkles /> Laboratorium Informatika • Praktikum Pemrograman Web
            </div>

            <h1 className="hero-title">
              Praktikum <span className="gradient-text">Pemrograman Web</span>
            </h1>

            <p className="hero-subtitle">
              Implementasi komponen modular React JS, integrasi props dinamis, dan
              pemisahan arsitektur komponen secara profesional.
            </p>

            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <span className="stat-num">{daftarPraktikum.length}</span>
                <span className="stat-label">Mata Praktikum</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">{totalSKS}</span>
                <span className="stat-label">Total SKS</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">2024</span>
                <span className="stat-label">Angkatan</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-num">3.87</span>
                <span className="stat-label">Indeks Prestasi</span>
              </div>
            </div>
          </motion.section>

          {/* VIEW SWITCHER BERDASARKAN ACTIVE TAB NAV */}
          {activeTabNav === 'dashboard' && (
            <>
              {/* TWO COLUMN GRID: PROFIL MAHASISWA & DAFTAR PRAKTIKUM */}
              <div className="two-column-layout">
                {/* KOLOM KIRI: KARTU PROFIL MAHASISWA */}
                <section>
                  <div className="section-header">
                    <div className="section-icon-badge purple">
                      <FiUser />
                    </div>
                    <div>
                      <h3 className="section-header-title">Profil Mahasiswa</h3>
                      <p className="section-header-sub">Identitas praktikan terdaftar</p>
                    </div>
                    <div className="section-header-line" />
                  </div>

                  {/* KARTU PROFIL SESUAI REQUEST: AFSAL PRIMA MAULA, ANGKATAN 2024 */}
                  <KartuProfil
                    nama="AFSAL PRIMA MAULA"
                    npm="243040092"
                    kelas="IF - Praktikum Web C"
                    status="Aktif"
                    angkatan="2024"
                    fotoUrl="https://ui-avatars.com/api/?name=Afsal+Prima+Maula&background=4F46E5&color=fff&size=200&bold=true"
                  />
                </section>

                {/* KOLOM KANAN: DAFTAR PRAKTIKUM DENGAN ITEMMATKUL.JSX */}
                <section>
                  <div className="section-header">
                    <div className="section-icon-badge cyan">
                      <FiBook />
                    </div>
                    <div>
                      <h3 className="section-header-title">Daftar Jadwal Praktikum</h3>
                      <p className="section-header-sub">Pemisahan komponen ItemMatkul.jsx</p>
                    </div>
                    <div className="section-header-line" />
                  </div>

                  {/* Filter Hari */}
                  <div className="filter-row">
                    {DAFTAR_HARI.map((hari) => (
                      <button
                        key={hari}
                        className={`filter-btn ${activeFilter === hari ? 'active' : ''}`}
                        onClick={() => setActiveFilter(hari)}
                      >
                        {hari}
                      </button>
                    ))}
                  </div>

                  {/* Iterasi Data Praktikum menggunakan Komponen Mandiri ItemMatkul */}
                  <div className="matkul-list">
                    <AnimatePresence mode="popLayout">
                      {filteredPraktikum.length > 0 ? (
                        filteredPraktikum.map((matkul) => (
                          <ItemMatkul
                            key={matkul.id}
                            {...matkul}
                            onSelect={handleSelectMatkul}
                          />
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            textAlign: 'center',
                            padding: '36px',
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '12px',
                            border: '1px dashed var(--border)',
                            color: 'var(--txt-3)',
                          }}
                        >
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
                          <div>Tidak ada jadwal praktikum di hari {activeFilter}.</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Summary Footer Bar */}
                  {filteredPraktikum.length > 0 && (
                    <div className="summary-bar">
                      <span>
                        Menampilkan <strong>{filteredPraktikum.length}</strong> mata praktikum
                      </span>
                      <span>
                        Beban SKS:{' '}
                        <strong>
                          {filteredPraktikum.reduce((acc, curr) => acc + curr.sks, 0)} SKS
                        </strong>
                      </span>
                    </div>
                  )}
                </section>
              </div>

              {/* TUGAS TERSTRUKTUR: SHOWCASE PORTOFOLIO MINI */}
              <PortofolioMini />
            </>
          )}

          {activeTabNav === 'praktikum' && (
            <section style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="section-header">
                <div className="section-icon-badge cyan">
                  <FiBook />
                </div>
                <div>
                  <h3 className="section-header-title">Seluruh Jadwal Praktikum</h3>
                  <p className="section-header-sub">
                    Iterasi data menggunakan komponen modular ItemMatkul.jsx
                  </p>
                </div>
                <div className="section-header-line" />
              </div>

              <div className="filter-row">
                {DAFTAR_HARI.map((hari) => (
                  <button
                    key={hari}
                    className={`filter-btn ${activeFilter === hari ? 'active' : ''}`}
                    onClick={() => setActiveFilter(hari)}
                  >
                    {hari}
                  </button>
                ))}
              </div>

              <div className="matkul-list">
                {filteredPraktikum.map((matkul) => (
                  <ItemMatkul key={matkul.id} {...matkul} onSelect={handleSelectMatkul} />
                ))}
              </div>
            </section>
          )}

          {activeTabNav === 'portofolio' && (
            <section>
              <PortofolioMini />
            </section>
          )}

          {/* CTA INTERACTIVITY BUTTON */}
          <section className="cta-box">
            <h2 className="cta-title">Uji Interaktivitas Event React JS</h2>
            <p className="cta-sub">
              Klik tombol di bawah ini untuk menguji penanganan state, interaktivitas event,
              serta notifikasi dinamis secara real-time.
            </p>

            <div className="cta-btns">
              <button className="btn-primary" onClick={notifikasiSapaan}>
                <FiZap /> Uji Interaktivitas Event (Klik Disini)
              </button>
              <button
                className="btn-outline"
                onClick={() =>
                  addToast({
                    title: 'Info Praktikum Modul 1',
                    message:
                      'Semua kriteria tugas (BadgeSkill, ItemMatkul, Showcase Portofolio) telah aktif!',
                    type: 'info',
                  })
                }
              >
                <HiOutlineLightBulb /> Cek Kelengkapan Tugas
              </button>
            </div>

            <div className="chip-row">
              <span className="chip">⚛️ React 18.3</span>
              <span className="chip">⚡ Vite Modern Bundler</span>
              <span className="chip">🏷️ BadgeSkill.jsx</span>
              <span className="chip">📦 ItemMatkul.jsx</span>
              <span className="chip">💼 Showcase Portofolio Mini</span>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          Praktikum Pemrograman Web 2026 • <strong>AFSAL PRIMA MAULA</strong> (NPM: 243040092)
        </p>
        <p style={{ marginTop: '6px', fontSize: '11px', opacity: 0.6 }}>
          Laboratorium Teknik Informatika • Modul 1: Pengenalan React JS & Vite
        </p>
      </footer>
    </div>
  );
}
