// src/KartuProfil.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiBookOpen,
  FiAward,
  FiCode,
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiCalendar,
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineBadgeCheck } from 'react-icons/hi';
import BadgeSkill from './BadgeSkill';

const daftarKeahlian = [
  { namaSkill: 'React JS & JSX', level: 'Menengah' },
  { namaSkill: 'JavaScript ES6+', level: 'Mahir' },
  { namaSkill: 'HTML5 & Modern CSS', level: 'Mahir' },
  { namaSkill: 'Tailwind CSS', level: 'Menengah' },
  { namaSkill: 'PHP & Laravel', level: 'Menengah' },
  { namaSkill: 'PostgreSQL Database', level: 'Pemula' },
  { namaSkill: 'Git & GitHub', level: 'Menengah' },
  { namaSkill: 'UI/UX Prototyping', level: 'Pemula' },
];

export default function KartuProfil({
  nama = 'AFSAL PRIMA MAULA',
  npm = '243040092',
  kelas = 'IF-C Praktikum',
  status = 'Aktif',
  angkatan = '2024',
  fotoUrl,
}) {
  const [activeTab, setActiveTab] = useState('profil');
  const isActive = status === 'Aktif';

  return (
    <motion.div
      className="profile-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Profil Header: Avatar + Identitas */}
      <div className="profile-top">
        <div className="avatar-wrap">
          <img
            src={
              fotoUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                nama
              )}&background=4F46E5&color=fff&size=180&bold=true`
            }
            alt={`Foto ${nama}`}
            className="avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                nama
              )}&background=4F46E5&color=fff&size=180&bold=true`;
            }}
          />
          <div className="avatar-ring" />
        </div>

        <div className="profile-info">
          <div className="profile-name">
            <span>{nama}</span>
            <HiOutlineBadgeCheck className="verified-icon" title="Mahasiswa Terverifikasi" />
          </div>

          <div className="profile-npm">
            <span>NPM: </span>
            <strong style={{ color: '#F1F5F9' }}>{npm}</strong>
          </div>

          <div className="profile-pills">
            <span className="pill">
              <HiOutlineAcademicCap style={{ color: '#818CF8' }} /> {kelas}
            </span>
            <span className={`pill ${isActive ? 'green' : ''}`}>
              <span className="online-dot" />
              {status}
            </span>
            <span className="pill">
              <FiCalendar style={{ color: '#06B6D4' }} /> Angkatan {angkatan}
            </span>
          </div>

          <div className="social-btns">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              title="GitHub Profile"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              title="LinkedIn Profile"
            >
              <FiLinkedin />
            </a>
            <a
              href="#portofolio"
              className="social-btn"
              title="Portofolio Web"
            >
              <FiGlobe />
            </a>
          </div>
        </div>
      </div>

      {/* Baris Statistik */}
      <div className="profile-stats-row">
        <div className="pstat">
          <span className="pstat-val">4</span>
          <span className="pstat-lbl">Praktikum</span>
        </div>
        <div className="pstat">
          <span className="pstat-val">11</span>
          <span className="pstat-lbl">Total SKS</span>
        </div>
        <div className="pstat">
          <span className="pstat-val">{angkatan}</span>
          <span className="pstat-lbl">Angkatan</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'profil' ? 'active' : ''}`}
          onClick={() => setActiveTab('profil')}
        >
          <FiUser /> Biodata
        </button>
        <button
          className={`tab-btn ${activeTab === 'keahlian' ? 'active' : ''}`}
          onClick={() => setActiveTab('keahlian')}
        >
          <FiAward /> Badge Keahlian
        </button>
        <button
          className={`tab-btn ${activeTab === 'akademik' ? 'active' : ''}`}
          onClick={() => setActiveTab('akademik')}
        >
          <FiCode /> Info Akademik
        </button>
      </div>

      {/* Konten Tab */}
      <div className="tab-content">
        {activeTab === 'profil' && (
          <div>
            <div className="info-row">
              <FiUser className="info-row-icon" />
              <span className="info-row-lbl">Nama Mahasiswa</span>
              <span className="info-row-val">{nama}</span>
            </div>
            <div className="info-row">
              <HiOutlineAcademicCap className="info-row-icon" />
              <span className="info-row-lbl">Program Studi</span>
              <span className="info-row-val">Teknik Informatika</span>
            </div>
            <div className="info-row">
              <FiBookOpen className="info-row-icon" />
              <span className="info-row-lbl">Kelas Praktikum</span>
              <span className="info-row-val">{kelas}</span>
            </div>
            <div className="info-row">
              <FiCalendar className="info-row-icon" />
              <span className="info-row-lbl">Tahun Masuk</span>
              <span className="info-row-val">Tahun {angkatan}</span>
            </div>
          </div>
        )}

        {/* Tab 2: Latihan Mandiri BadgeSkill */}
        {activeTab === 'keahlian' && (
          <div>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
              Daftar keahlian teknis mahasiswa dengan indikator warna dinamis:
            </p>
            <div className="badge-skill-list">
              {daftarKeahlian.map((skill) => (
                <BadgeSkill
                  key={skill.namaSkill}
                  namaSkill={skill.namaSkill}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'akademik' && (
          <div>
            <div className="info-row">
              <FiCode className="info-row-icon" />
              <span className="info-row-lbl">Fakultas</span>
              <span className="info-row-val">Fakultas Teknik</span>
            </div>
            <div className="info-row">
              <FiAward className="info-row-icon" />
              <span className="info-row-lbl">Indeks Prestasi</span>
              <span className="info-row-val" style={{ color: '#34D399' }}>
                3.87 / 4.00 (Cum Laude)
              </span>
            </div>
            <div className="info-row">
              <FiCalendar className="info-row-icon" />
              <span className="info-row-lbl">Status Registrasi</span>
              <span className="info-row-val" style={{ color: '#60A5FA' }}>
                Aktif Mengikuti Perkuliahan
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Daftar Keahlian Singkat Langsung Ditampilkan di Bawah Profil Sesuai Kriteria Tugas */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#94A3B8' }}>
            Highlight Keahlian (BadgeSkill.jsx)
          </span>
          <span style={{ fontSize: '11px', color: '#6366F1' }}>{daftarKeahlian.length} Skills</span>
        </div>
        <div className="badge-skill-list">
          {daftarKeahlian.slice(0, 4).map((skill) => (
            <BadgeSkill
              key={skill.namaSkill}
              namaSkill={skill.namaSkill}
              level={skill.level}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
