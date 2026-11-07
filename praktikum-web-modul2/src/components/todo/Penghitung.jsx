// src/components/todo/Penghitung.jsx
// Sesuai Langkah 3 Modul 2 Praktikum Web: Pengenalan useState & Event Handling
import { useState } from 'react';
import Kartu from '../ui/Kartu';

function Penghitung() {
  // jumlah = nilai saat ini, setJumlah = fungsi untuk mengubahnya, 0 = nilai awal
  const [jumlah, setJumlah] = useState(0);

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const ulangi = () => {
    setJumlah(0);
  };

  const iconPenghitung = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3l12 7.5-6.5 1.5 4 8-3 1.5-4-8-2.5 5.5V3z" />
    </svg>
  );

  const watermarkCursor = (
    <svg width="88" height="88" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3l12 7.5-6.5 1.5 4 8-3 1.5-4-8-2.5 5.5V3z" />
    </svg>
  );

  return (
    <Kartu
      judul="Penghitung Klik"
      subjudul={`Tombol sudah diklik ${jumlah} kali`}
      icon={iconPenghitung}
      watermark={watermarkCursor}
      className="kartu-penghitung"
    >
      {/* Conditional rendering: pesan ini hanya muncul jika jumlah >= 5 */}
      {jumlah >= 5 && (
        <div className="pesan-apresiasi">
          🎉 Wah, kamu rajin sekali mengklik!
        </div>
      )}

      <div className="baris tombol-penghitung-group">
        <button className="tombol tombol-navy" onClick={tambah}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginRight: '6px' }}
          >
            <path d="M4 3l12 7.5-6.5 1.5 4 8-3 1.5-4-8-2.5 5.5V3z" />
          </svg>
          Klik Saya
        </button>
        <button className="tombol tombol-outline" onClick={ulangi}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '6px' }}
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Ulangi
        </button>
      </div>
    </Kartu>
  );
}

export default Penghitung;
