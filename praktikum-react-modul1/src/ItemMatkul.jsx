// src/ItemMatkul.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiChevronDown, FiBookOpen } from 'react-icons/fi';

/**
 * Komponen ItemMatkul
 * Menerima props item mata kuliah:
 * - kode: string
 * - nama: string
 * - sks: number
 * - hari: string
 * - jam: string
 * - ruang: string
 * - dosen: string
 * - icon: string
 * - kategori: string
 * - nilai: string
 * - onSelect: function
 */
export default function ItemMatkul({
  id,
  kode,
  nama,
  sks,
  hari,
  jam = '08:00 - 10:30',
  ruang = 'Laboratorium Informatika',
  dosen = 'Dosen Pengampu',
  icon = '📚',
  kategori = 'Praktikum',
  nilai = 'A',
  onSelect,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Style untuk badge nilai
  const badgeNilai = {
    A: { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.35)', color: '#34D399' },
    'A-': { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.25)', color: '#6EE7B7' },
    'B+': { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.35)', color: '#FCD34D' },
    B: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.25)', color: '#FDE68A' },
  };

  const currentBadge = badgeNilai[nilai] || badgeNilai['A'];

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && onSelect) {
      onSelect({ id, kode, nama, sks, hari, jam, ruang, dosen, nilai });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`matkul-item ${isExpanded ? 'is-open' : ''}`}
      onClick={handleClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
        {/* Icon Matkul */}
        <div className="matkul-icon-box">{icon}</div>

        {/* Info Utama */}
        <div className="matkul-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span className="matkul-kode">{kode}</span>
            <span style={{ color: 'rgba(148, 163, 184, 0.4)', fontSize: '12px' }}>•</span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>{kategori}</span>
          </div>

          <h4 className="matkul-nama">{nama}</h4>

          <div className="matkul-meta">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <FiCalendar style={{ color: '#6366F1' }} /> {hari}
            </span>
            <span style={{ color: 'rgba(148, 163, 184, 0.4)' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <FiClock style={{ color: '#06B6D4' }} /> {jam}
            </span>
          </div>
        </div>

        {/* SKS, Nilai & Chevron */}
        <div className="matkul-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="sks-chip">{sks} SKS</span>
            <span
              className="nilai-chip"
              style={{
                background: currentBadge.bg,
                border: `1px solid ${currentBadge.border}`,
                color: currentBadge.color,
              }}
            >
              {nilai}
            </span>
          </div>
          <FiChevronDown
            className={`chevron ${isExpanded ? 'open' : ''}`}
            style={{ marginTop: '4px' }}
          />
        </div>
      </div>

      {/* Accordion Detail Ruang & Dosen */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="matkul-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-box">
              <span className="detail-box-emoji">🏫</span>
              <span className="detail-box-lbl">Lokasi Ruangan</span>
              <span className="detail-box-val">{ruang}</span>
            </div>
            <div className="detail-box">
              <span className="detail-box-emoji">👨‍🏫</span>
              <span className="detail-box-lbl">Dosen Pengampu</span>
              <span className="detail-box-val">{dosen}</span>
            </div>
            <div className="detail-box">
              <span className="detail-box-emoji">🎯</span>
              <span className="detail-box-lbl">Status Kelulusan</span>
              <span className="detail-box-val" style={{ color: currentBadge.color, fontWeight: '700' }}>
                Grade {nilai} (Lulus)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
