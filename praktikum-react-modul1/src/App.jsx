// src/App.jsx  —  El Sal Fring | Portfolio Akademik & Skill Mahasiswa
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub, FiLinkedin, FiMail, FiPhone, FiInstagram,
  FiExternalLink, FiX, FiMenu, FiCheck,
  FiCode, FiDatabase, FiZap, FiStar, FiAward, FiUser,
  FiChevronRight, FiArrowRight, FiGlobe,
} from 'react-icons/fi';
import {
  HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineSparkles,
  HiOutlineOfficeBuilding, HiOutlineUserGroup,
} from 'react-icons/hi';
import BadgeSkill from './BadgeSkill';
import './App.css';

/* ============================================================
   DATA
   ============================================================ */

const NAV_ITEMS = [
  { id: 'hero',          label: 'Dashboard' },
  { id: 'portofolio',    label: 'Showcase Portofolio' },
  { id: 'qualification', label: 'Organisasi & Skill' },
  { id: 'contact',       label: 'Kontak' },
];

const PROFIL = {
  nama:       'Afsal Prima Maula',
  alias:      'El Sal Fring',
  npm:        '243040092',
  angkatan:   '2024',
  semester:   '3',
  ipk:        '3.87',
  prodi:      'Teknik Informatika',
  univ:       'Universitas Pasundan',
  status:     'Mahasiswa Aktif',
  email:      'afsalprimamaulaa@gmail.com',
  wa:         '6282119238506',
  github:     'https://github.com/afsalprimamaula',
  linkedin:   'https://www.linkedin.com/in/afsalprimamaula',
  instagram:  'https://www.instagram.com/pmafsaal.e',
};

const BADGE_SKILLS = [
  { namaSkill: 'React JS', level: 'Mahir' },
  { namaSkill: 'Next.js', level: 'Menengah' },
  { namaSkill: 'TypeScript', level: 'Menengah' },
  { namaSkill: 'Laravel', level: 'Menengah' },
  { namaSkill: 'PostgreSQL', level: 'Menengah' },
  { namaSkill: 'AI Integration', level: 'Menengah' },
  { namaSkill: 'Node.js', level: 'Pemula' },
  { namaSkill: 'Git & GitHub', level: 'Mahir' },
];

const TECH_CHIPS = [
  'React', 'Next.js', 'TypeScript', 'Laravel',
  'PostgreSQL', 'T-SQL', 'Groq AI', 'Vite',
];

const PROJECTS = [
  {
    id: 1,
    emoji: '🤖',
    title: 'AI Booking Agent',
    desc: 'Aplikasi agen pemesanan berbasis kecerdasan buatan dengan integrasi LLM (Groq API) dan antarmuka responsif yang memungkinkan pengguna memesan layanan secara natural melalui bahasa sehari-hari.',
    techs: ['TypeScript', 'Next.js', 'Groq API', 'Tailwind CSS'],
    repo: 'https://github.com/afsalprimamaula/ai-booking-agent',
    status: 'live',
    kategori: 'Web Apps & AI',
  },
  {
    id: 2,
    emoji: '🏕️',
    title: 'Gedoy Camping Outdoor Platform',
    desc: 'Platform penyewaan alat kemping dan petualangan outdoor berbasis web menggunakan Laravel dengan manajemen inventory, sistem pemesanan, dan backend terintegrasi.',
    techs: ['PHP', 'Laravel', 'Blade', 'MySQL'],
    repo: 'https://github.com/afsalprimamaula/gedoy-camping',
    status: 'live',
    kategori: 'Web Apps & AI',
  },
  {
    id: 3,
    emoji: '🌾',
    title: 'PUSTANI — Pustaka Informasi Petani',
    desc: 'Sistem informasi dan direktori edukasi pertanian terpadu. Membantu petani mengakses informasi agrikultur, teknik budidaya, dan kalender tanam secara digital.',
    techs: ['PHP', 'MySQL', 'CSS3', 'HTML5'],
    repo: 'https://github.com/bilker29/Pustaka-Informasi-Petani-PUSTANI-',
    status: 'collab',
    kategori: 'Web Apps & AI',
  },
  {
    id: 4,
    emoji: '🏭',
    title: 'DNY Filterindo Redesign',
    desc: 'Redesign antarmuka web industri & komersial dengan prinsip UI/UX modern, aksesibilitas tinggi, dan performa optimal untuk perusahaan filter industri.',
    techs: ['JavaScript', 'HTML5', 'CSS3', 'UI/UX'],
    repo: 'https://github.com/afsalprimamaula/dny-filterindo-redesign',
    status: 'live',
    kategori: 'Web Apps & AI',
  },
  {
    id: 5,
    emoji: '🤖',
    title: 'Chatbot Plugin CLI',
    desc: 'Plugin chatbot command-line interface modular untuk otomasi tugas berbasis Node.js, mendukung konfigurasi dinamis dan ekstensi plugin mandiri.',
    techs: ['Node.js', 'JavaScript', 'CLI', 'JSON'],
    repo: 'https://github.com/Ghrysh/chatbot-plugin-cli',
    status: 'collab',
    kategori: 'Web Apps & AI',
  },
  {
    id: 6,
    emoji: '🗄️',
    title: 'Sistem Basis Data & Web Akademik',
    desc: 'Implementasi skema basis data kompleks, query optimization dengan T-SQL & PostgreSQL, dan arsitektur web modular. Mencakup tugas akademik pemrograman web semester 2024.',
    techs: ['T-SQL', 'PostgreSQL', 'PHP', 'Laravel'],
    repo: 'https://github.com/afsalprimamaula/PBD2025_C_243040092',
    status: 'akademik',
    kategori: 'Basis Data & Backend',
  },
];

const QUAL_CARDS = [
  {
    icon: '⚛️', colorClass: 'qi-blue',
    title: 'Pengembangan Web & AI',
    desc: 'Mampu membangun aplikasi web interaktif end-to-end, terintegrasi REST API, AI/LLM, dan arsitektur yang scalable.',
    items: [
      'Full-Stack dengan React + Laravel',
      'Integrasi AI/LLM (Groq, OpenAI)',
      'Database Design & Optimization',
      'Pengalaman 6+ real-world projects',
    ],
  },
  {
    icon: '🎯', colorClass: 'qi-cyan',
    title: 'Manajemen & Kepanitiaan',
    desc: 'Pengalaman dalam koordinasi tim teknis, pengorganisasian acara kampus, serta komunikasi terstruktur dan efektif.',
    items: [
      'Kolaborasi tim lintas divisi',
      'Pengorganisasian Study Jam & workshop',
      'Dokumentasi & technical writing',
      'Kepemimpinan proyek berbasis Agile',
    ],
  },
  {
    icon: '🏆', colorClass: 'qi-green',
    title: 'Problem Solving & Akademik',
    desc: 'Konsistensi akademik IPK 3.87 didukung kemampuan algoritmik dan arsitektur sistem yang kuat untuk kompetisi teknologi.',
    items: [
      'IPK 3.87 / 4.00 (Teknik Informatika)',
      'Algoritma & Struktur Data',
      'Database Architecture & Query Tuning',
      'Siap ikuti PKM, Hackathon & Lomba IT',
    ],
  },
];

const SKILLS_DATA = [
  {
    cat: 'Frontend & UI', icon: '⚛️',
    items: [
      { name: 'React JS & JSX',     pct: 88 },
      { name: 'Next.js App Router', pct: 75 },
      { name: 'TypeScript',         pct: 72 },
      { name: 'Tailwind CSS',       pct: 85 },
    ],
  },
  {
    cat: 'Backend & Database', icon: '🗄️',
    items: [
      { name: 'PHP & Laravel',       pct: 78 },
      { name: 'PostgreSQL / T-SQL',  pct: 74, cyan: true },
      { name: 'MySQL & Eloquent',    pct: 80, cyan: true },
      { name: 'Node.js & Express',   pct: 60, cyan: true },
    ],
  },
];

const CONTACTS = [
  {
    icon: '✉️', bg: 'rgba(99,102,241,0.14)',
    label: 'Email Utama',
    value: 'afsalprimamaulaa@gmail.com',
    href: 'mailto:afsalprimamaulaa@gmail.com',
    btnLabel: 'Kirim Email',
  },
  {
    icon: '💬', bg: 'rgba(16,185,129,0.14)',
    label: 'WhatsApp',
    value: '+62 821 1923 8506',
    href: 'https://wa.me/6282119238506',
    btnLabel: 'Chat Sekarang',
  },
  {
    icon: '🐙', bg: 'rgba(30,30,30,0.6)',
    label: 'GitHub',
    value: 'afsalprimamaula',
    href: 'https://github.com/afsalprimamaula',
    btnLabel: 'Lihat Profil',
  },
  {
    icon: '💼', bg: 'rgba(6,182,212,0.14)',
    label: 'LinkedIn',
    value: 'afsalprimamaula',
    href: 'https://www.linkedin.com/in/afsalprimamaula',
    btnLabel: 'Lihat Profil',
  },
  {
    icon: '📸', bg: 'rgba(245,158,11,0.14)',
    label: 'Instagram',
    value: '@pmafsaal.e',
    href: 'https://www.instagram.com/pmafsaal.e',
    btnLabel: 'Lihat IG',
  },
];

/* ============================================================
   TOAST HOOK
   ============================================================ */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, title, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  }, []);
  const remove = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}

/* ============================================================
   SKILL BAR
   ============================================================ */
function SkillBar({ name, pct, cyan }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className={`skill-bar-fill${cyan ? ' cyan' : ''}`}
          style={{ width: filled ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ activeSection, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <a href="#hero" className="brand">
            <div className="brand-logo">ES</div>
            <div className="brand-text">
              <span className="brand-name">El Sal Fring</span>
              <span className="brand-sub">Informatika UNPAS — Portfolio Akademik & Dev</span>
            </div>
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map(n => (
              <button
                key={n.id}
                className={`nav-link${activeSection === n.id ? ' active' : ''}`}
                onClick={() => onNavClick(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="btn-hubungi" onClick={() => onNavClick('contact')}>
              <FiMail style={{ fontSize: 14 }} /> Hubungi Saya
            </button>
            <button
              className="nav-menu-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              borderTop: '1px solid var(--border)',
              background: 'rgba(15,23,42,0.97)',
            }}
          >
            <div className="container" style={{ padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_ITEMS.map(n => (
                <button
                  key={n.id}
                  className={`nav-link${activeSection === n.id ? ' active' : ''}`}
                  style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  onClick={() => { onNavClick(n.id); setMobileOpen(false); }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection({ onHubungi }) {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="hero-status-pill"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="status-blink" />
              Mahasiswa Aktif — Teknik Informatika UNPAS 2024
            </motion.div>

            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Afsal Prima Maula
            </motion.h1>

            <motion.div
              className="hero-alias"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              El Sal Fring
            </motion.div>

            <motion.div
              className="hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Full-Stack Developer & Informatics Engineering Student
            </motion.div>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Mahasiswa Teknik Informatika Universitas Pasundan yang berfokus pada Full-Stack
              Web Development, Arsitektur Basis Data, dan Integrasi AI. Siap berkontribusi
              aktif dalam organisasi, kegiatan Study Jam, dan kompetisi teknologi.
            </motion.p>

            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button className="btn-primary" onClick={onHubungi}>
                <FiMail /> Hubungi Saya
              </button>
              <a
                className="btn-outline"
                href={PROFIL.github}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub /> Lihat GitHub
              </a>
            </motion.div>

            <motion.div
              className="hero-tech-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {TECH_CHIPS.map(t => (
                <span key={t} className="tech-chip">
                  <span className="mono">{t}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="profile-card">
              <div className="profile-card-glow" />

              {/* Avatar */}
              <div className="avatar-wrap">
                <img
                  src={`https://ui-avatars.com/api/?name=Afsal+Prima+Maula&background=4F46E5&color=fff&size=200&bold=true&format=svg`}
                  alt="Afsal Prima Maula"
                  className="avatar"
                />
                <div className="avatar-ring" />
                <div className="avatar-status" title="Online / Aktif" />
              </div>

              {/* Info rows */}
              <div className="profile-info-list">
                {[
                  { icon: <FiUser />, label: 'Nama Lengkap', value: PROFIL.nama },
                  { icon: <HiOutlineAcademicCap />, label: 'NPM', value: PROFIL.npm, mono: true },
                  { icon: <FiStar />, label: 'Angkatan', value: `${PROFIL.angkatan} · Sem. ${PROFIL.semester}` },
                  { icon: <FiAward />, label: 'IPK / IP', value: `${PROFIL.ipk} / 4.00`, highlight: true },
                  { icon: <FiCode />, label: 'Prodi', value: `${PROFIL.prodi}` },
                  { icon: <HiOutlineOfficeBuilding />, label: 'Universitas', value: PROFIL.univ },
                ].map(row => (
                  <div key={row.label} className="profile-info-row">
                    <span className="pir-icon">{row.icon}</span>
                    <span className="pir-label">{row.label}</span>
                    <span className={`pir-value${row.highlight ? ' highlight' : ''}${row.mono ? ' mono' : ''}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Badge Skills */}
              <div className="profile-badges-title">Lencana Keahlian (BadgeSkill.jsx)</div>
              <div className="profile-badges">
                {BADGE_SKILLS.map(s => (
                  <BadgeSkill key={s.namaSkill} namaSkill={s.namaSkill} level={s.level} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO SECTION
   ============================================================ */
const STATUS_MAP = {
  live:     { label: 'Live',       cls: 'status-live' },
  dev:      { label: 'In Dev',     cls: 'status-dev' },
  collab:   { label: 'Kolaborasi', cls: 'status-collab' },
  akademik: { label: 'Akademik',   cls: 'status-collab' },
};

const FILTER_CATS = ['Semua', 'Web Apps & AI', 'Basis Data & Backend', 'Akademik'];

function ProjectCard({ p, idx }) {
  const st = STATUS_MAP[p.status] || STATUS_MAP.dev;
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
    >
      <div className="pc-header">
        <span className="pc-emoji">{p.emoji}</span>
        <span className={`pc-status ${st.cls}`}>{st.label}</span>
      </div>
      <div>
        <h4 className="pc-title">{p.title}</h4>
        <p className="pc-desc">{p.desc}</p>
      </div>
      <div className="pc-techs">
        {p.techs.map(t => <span key={t} className="pc-tech-tag">{t}</span>)}
      </div>
      <div className="pc-footer">
        <a href={p.repo} target="_blank" rel="noreferrer" className="btn-repo gh">
          <FiGithub /> Lihat Repository
        </a>
        <a href="https://github.com/afsalprimamaula" target="_blank" rel="noreferrer" className="btn-repo demo">
          <FiExternalLink /> Profil GitHub
        </a>
      </div>
    </motion.div>
  );
}

function PortofolioSection() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filtered = activeFilter === 'Semua'
    ? PROJECTS
    : PROJECTS.filter(p =>
        activeFilter === 'Akademik'
          ? p.status === 'akademik'
          : p.kategori === activeFilter
      );

  return (
    <section id="portofolio" className="portfolio-section">
      <div className="container">
        <div className="section-tag"><FiCode /> Showcase Proyek</div>
        <h2 className="section-title">
          Portofolio & <span>Karya Nyata</span>
        </h2>
        <p className="section-sub">
          Kumpulan proyek aktif yang dibangun menggunakan teknologi modern — mulai dari
          aplikasi AI, platform web, hingga sistem basis data kompleks.
        </p>

        <div className="filter-bar">
          {FILTER_CATS.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--t4)', display: 'flex', alignItems: 'center' }}>
            {filtered.length} proyek
          </span>
        </div>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} idx={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   QUALIFICATION SECTION
   ============================================================ */
function QualificationSection() {
  return (
    <section id="qualification">
      <div className="container">
        <div className="section-tag"><HiOutlineUserGroup /> Kesiapan Organisasi & Kompetisi</div>
        <h2 className="section-title">
          Siap Berkontribusi <span>Aktif</span>
        </h2>
        <p className="section-sub">
          Kualifikasi teknis dan soft-skill yang mendukung kontribusi nyata di Himpunan,
          BEM, Study Jam, dan tim kompetisi teknologi (Hackathon / PKM).
        </p>

        <div className="qual-grid">
          {QUAL_CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              className="qual-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className={`qual-card-icon ${card.colorClass}`}>{card.icon}</div>
              <h3 className="qual-card-title">{card.title}</h3>
              <p className="qual-card-desc">{card.desc}</p>
              <ul className="qual-list">
                {card.items.map(item => (
                  <li key={item} className="qual-item">
                    <FiCheck className="qual-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Skill Bars */}
        <div style={{ marginTop: 72 }}>
          <div className="section-tag"><FiZap /> Profil Keahlian Teknis</div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Stack Teknologi & Level
          </h3>
          <p style={{ color: 'var(--t3)', fontSize: 15, marginBottom: 40 }}>
            Gambaran kompetensi teknis berdasarkan pengalaman proyek nyata.
          </p>

          <div className="skill-grid">
            {SKILLS_DATA.map(cat => (
              <div key={cat.cat} className="skill-category">
                <div className="skill-cat-title">{cat.icon} {cat.cat}</div>
                <div className="skill-bars">
                  {cat.items.map(s => (
                    <SkillBar key={s.name} name={s.name} pct={s.pct} cyan={s.cyan} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* BadgeSkill showcase */}
          <div style={{ marginTop: 48, padding: '28px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--t4)', marginBottom: 14 }}>
              Lencana Keahlian Mahasiswa (Komponen BadgeSkill.jsx)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {BADGE_SKILLS.map(s => (
                <BadgeSkill key={s.namaSkill} namaSkill={s.namaSkill} level={s.level} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
function ContactSection({ onToast }) {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [sending, setSending] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.pesan) {
      onToast({ title: 'Form Tidak Lengkap', message: 'Mohon isi semua field terlebih dahulu.', type: 'warning' });
      return;
    }
    setSending(true);
    // Simulate async & open mailto
    setTimeout(() => {
      const subject = encodeURIComponent(`Pesan dari ${form.nama} — Portfolio El Sal Fring`);
      const body = encodeURIComponent(`Nama: ${form.nama}\nEmail: ${form.email}\n\nPesan:\n${form.pesan}`);
      window.open(`mailto:afsalprimamaulaa@gmail.com?subject=${subject}&body=${body}`);
      setSending(false);
      setForm({ nama: '', email: '', pesan: '' });
      onToast({ title: 'Email Siap Dikirim! ✉️', message: 'Client email Anda telah terbuka dengan pesan yang terisi.', type: 'success', duration: 5000 });
    }, 800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-tag"><FiMail /> Hubungi Saya</div>
        <h2 className="section-title">
          Mari <span>Terhubung</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: 48 }}>
          Terbuka untuk peluang kolaborasi organisasi, kepanitiaan Study Jam,
          tim lomba teknologi, maupun diskusi seputar pengembangan web dan AI.
        </p>

        <div className="contact-grid">
          {/* Left: Contact links */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 20 }}>
              Saluran Komunikasi
            </h3>
            <div className="contact-links">
              {CONTACTS.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link-card"
                >
                  <div className="clc-icon" style={{ background: c.bg }}>
                    {c.icon}
                  </div>
                  <div className="clc-info">
                    <div className="clc-label">{c.label}</div>
                    <div className="clc-value">{c.value}</div>
                  </div>
                  <FiChevronRight className="clc-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="contact-form-card">
              <h3 className="form-title">Kirim Pesan Langsung</h3>
              <p className="form-sub">
                Isi form di bawah ini dan klien email Anda akan terbuka dengan pesan yang sudah terisi otomatis.
              </p>
              <form onSubmit={handleSend}>
                <div className="form-group">
                  <label className="form-label">Nama / Organisasi</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Misal: BEM Informatika UNPAS"
                    value={form.nama}
                    onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Anda</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Keperluan / Pesan</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Ceritakan keperluan Anda — rekrutmen organisasi, kolaborasi proyek, undangan lomba, dll."
                    value={form.pesan}
                    onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn-submit" disabled={sending}>
                  {sending ? '⏳ Membuka Email...' : '✉️ Kirim Email Sekarang'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const { toasts, add, remove } = useToast();
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    const ids = ['hero', 'portofolio', 'qualification', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Welcome toast
  useEffect(() => {
    setTimeout(() => {
      add({
        title: 'Selamat Datang! 👋',
        message: 'Portfolio Akademik — Afsal Prima Maula (El Sal Fring)',
        type: 'success', duration: 4000,
      });
    }, 700);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page">
      {/* Ambient background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
      </div>

      {/* Toast */}
      <div className="toast-wrap">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              className={`toast ${t.type}`}
              initial={{ opacity: 0, x: 80, scale: 0.93 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <span className="toast-icon">
                {t.type === 'success' && '✅'}
                {t.type === 'info'    && '💡'}
                {t.type === 'warning' && '⚠️'}
              </span>
              <div className="toast-body">
                <div className="toast-title">{t.title}</div>
                {t.message && <div className="toast-msg">{t.message}</div>}
              </div>
              <button className="toast-x" onClick={() => remove(t.id)}><FiX /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navbar */}
      <Navbar activeSection={activeSection} onNavClick={scrollTo} />

      {/* Sections */}
      <main className="main">
        <HeroSection onHubungi={() => scrollTo('contact')} />
        <div className="section-divider" />
        <PortofolioSection />
        <div className="section-divider" />
        <QualificationSection />
        <div className="section-divider" />
        <ContactSection onToast={add} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <p className="footer-copy">
              © 2026 <strong>Afsal Prima Maula (El Sal Fring)</strong> ·
              NPM 243040092 · Teknik Informatika UNPAS
            </p>
            <div className="footer-links">
              <a href={PROFIL.github}    target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href={PROFIL.linkedin}  target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              <a href={PROFIL.instagram} target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
              <a href={`mailto:${PROFIL.email}`} className="footer-link">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
