// src/BadgeSkill.jsx
import React from 'react';

const LEVEL_MAP = {
  Pemula: {
    icon: '🌱', color: '#34d399',
    bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)',
  },
  Menengah: {
    icon: '⚡', color: '#fbbf24',
    bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',
  },
  Mahir: {
    icon: '🔥', color: '#a78bfa',
    bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)',
  },
};

export default function BadgeSkill({ namaSkill, level = 'Pemula' }) {
  const s = LEVEL_MAP[level] || LEVEL_MAP.Pemula;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '6px 14px', borderRadius: 9999,
        background: s.bg, border: `1px solid ${s.border}`,
        fontSize: 12, fontWeight: 700, color: s.color,
        transition: 'all 0.2s ease', cursor: 'default',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{s.icon}</span>
      <span style={{ color: '#f1f5f9' }}>{namaSkill}</span>
      <span style={{
        fontSize: 10, padding: '1px 7px', borderRadius: 9999,
        background: 'rgba(0,0,0,0.25)', border: `1px solid ${s.border}`,
        color: s.color, letterSpacing: '0.4px', textTransform: 'uppercase',
      }}>
        {level}
      </span>
    </span>
  );
}
