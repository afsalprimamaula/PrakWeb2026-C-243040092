// src/BadgeSkill.jsx
import React from 'react';

/**
 * Komponen BadgeSkill
 * Menerima props:
 * - namaSkill: string (nama keahlian)
 * - level: 'Pemula' | 'Menengah' | 'Mahir'
 */
export default function BadgeSkill({ namaSkill, level = 'Pemula' }) {
  // Mapping warna dinamis berdasarkan level keahlian
  const levelStyles = {
    Pemula: {
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.35)',
      text: '#34D399',
      dot: '#10B981',
      icon: '🌱',
      label: 'Pemula',
    },
    Menengah: {
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.35)',
      text: '#FBBF24',
      dot: '#F59E0B',
      icon: '⚡',
      label: 'Menengah',
    },
    Mahir: {
      bg: 'rgba(99, 102, 241, 0.15)',
      border: 'rgba(99, 102, 241, 0.45)',
      text: '#818CF8',
      dot: '#6366F1',
      icon: '🔥',
      label: 'Mahir',
    },
  };

  const currentStyle = levelStyles[level] || levelStyles['Pemula'];

  return (
    <div
      className="badge-skill"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '9999px',
        backgroundColor: currentStyle.bg,
        border: `1px solid ${currentStyle.border}`,
        color: currentStyle.text,
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.2px',
        transition: 'all 0.25s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <span style={{ fontSize: '13px' }}>{currentStyle.icon}</span>
      <span style={{ color: '#F1F5F9', fontWeight: '600' }}>{namaSkill}</span>
      <span
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          padding: '2px 7px',
          borderRadius: '9999px',
          background: 'rgba(0, 0, 0, 0.25)',
          color: currentStyle.text,
          border: `1px solid ${currentStyle.border}`,
        }}
      >
        {currentStyle.label}
      </span>
    </div>
  );
}
