// src/components/todo/ItemTugas.jsx
// Sesuai Langkah 5 Modul 2 Praktikum Web: Komponen Anak Item Tugas
function ItemTugas({ tugas, onUbahStatus, onHapus }) {
  return (
    <li className={`item-tugas-baris ${tugas.selesai ? 'item-selesai' : 'item-belum'}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={tugas.selesai}
          onChange={() => onUbahStatus(tugas.id)}
        />
        <span className="custom-checkbox">
          {tugas.selesai && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </label>

      {/* className dinamis: dicoret jika tugas sudah selesai */}
      <span
        className={`judul-tugas ${tugas.selesai ? 'selesai-teks' : ''}`}
        onClick={() => onUbahStatus(tugas.id)}
      >
        {tugas.judul}
      </span>

      {tugas.selesai ? (
        <span className="badge-selesai">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '4px' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Selesai
        </span>
      ) : (
        <button
          className="tombol-hapus-item"
          onClick={() => onHapus(tugas.id)}
          title="Hapus tugas"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '4px' }}
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Hapus
        </button>
      )}
    </li>
  );
}

export default ItemTugas;
