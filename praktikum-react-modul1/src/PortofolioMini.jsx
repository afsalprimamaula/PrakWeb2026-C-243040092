// src/PortofolioMini.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiStar, FiCode } from 'react-icons/fi';

const daftarProyek = [
  {
    id: 1,
    judul: 'Sistem Informasi Akademik Mahasiswa (SIMA)',
    deskripsi:
      'Platform terpadu untuk pengelolaan jadwal praktikum, kartu rencana studi (KRS), serta monitoring absensi dan nilai mahasiswa berbasis web responsif.',
    tagarTeknologi: ['React JS', 'Vite', 'Tailwind CSS', 'Laravel API'],
    tautanGithub: 'https://github.com/afsalprima/sima-akademik',
    demoUrl: 'https://sima-demo.vercel.app',
    status: 'Selesai',
    emoji: '🎓',
  },
  {
    id: 2,
    judul: 'E-Commerce Gadget Store & Checkout',
    deskripsi:
      'Aplikasi toko online elektronik dengan keranjang belanja interaktif, filter kategori dinamis, integrasi payment gateway simulasi, dan invoice otomatis.',
    tagarTeknologi: ['React 18', 'Context API', 'PostgreSQL', 'Express'],
    tautanGithub: 'https://github.com/afsalprima/gadget-store-app',
    demoUrl: 'https://gadgetstore-id.vercel.app',
    status: 'Selesai',
    emoji: '🛒',
  },
  {
    id: 3,
    judul: 'TaskMaster - Kanban Board & Planner',
    deskripsi:
      'Aplikasi manajemen tugas interaktif bertema produktivitas dengan fitur drag-and-drop, filter prioritas kerja, deadline reminder, dan tracking progress.',
    tagarTeknologi: ['React', 'Framer Motion', 'Node.js', 'MongoDB'],
    tautanGithub: 'https://github.com/afsalprima/taskmaster-kanban',
    demoUrl: 'https://taskmaster-planner.vercel.app',
    status: 'Pengembangan',
    emoji: '📋',
  },
  {
    id: 4,
    judul: 'HealthMetrics - Dashboard Pemantau Medis',
    deskripsi:
      'Dashboard analitik data kesehatan yang memvisualisasikan rekam medis berkala, grafik statistik vital pasien, dan rekomendasi gaya hidup otomatis.',
    tagarTeknologi: ['React', 'Chart.js', 'Python FastAPI', 'CSS Modules'],
    tautanGithub: 'https://github.com/afsalprima/health-metrics-dashboard',
    demoUrl: 'https://healthmetrics.vercel.app',
    status: 'Selesai',
    emoji: '🩺',
  },
];

export default function PortofolioMini() {
  return (
    <div className="portfolio-section" id="portofolio">
      <div className="section-hd" style={{ marginBottom: '24px' }}>
        <div className="section-icon-box icon-purple">
          <FiFolder />
        </div>
        <div className="section-hd-text">
          <h3 className="section-hd-title">Showcase Portofolio Mini</h3>
          <p className="section-hd-sub">
            Karya dan proyek aplikasi web unggulan oleh AFSAL PRIMA MAULA
          </p>
        </div>
        <div className="section-line" />
      </div>

      <div className="portfolio-grid">
        {daftarProyek.map((proyek, index) => (
          <motion.div
            key={proyek.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="project-card"
          >
            {/* Header Proyek */}
            <div className="project-card-header">
              <span className="project-emoji">{proyek.emoji}</span>
              <span
                className={`project-status ${
                  proyek.status === 'Selesai' ? 'status-done' : 'status-wip'
                }`}
              >
                {proyek.status}
              </span>
            </div>

            {/* Judul & Deskripsi */}
            <div>
              <h4 className="project-title">{proyek.judul}</h4>
              <p className="project-desc">{proyek.deskripsi}</p>
            </div>

            {/* Tagar Teknologi */}
            <div className="project-tech">
              {proyek.tagarTeknologi.map((tech) => (
                <span key={tech} className="project-tech-tag">
                  #{tech}
                </span>
              ))}
            </div>

            {/* Tombol Tautan GitHub & Demo */}
            <div className="project-footer">
              <a
                href={proyek.tautanGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-repo primary"
              >
                <FiGithub style={{ fontSize: '14px' }} />
                <span>Repositori GitHub</span>
              </a>

              <a
                href={proyek.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-repo"
              >
                <FiExternalLink style={{ fontSize: '13px' }} />
                <span>Live Demo</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
