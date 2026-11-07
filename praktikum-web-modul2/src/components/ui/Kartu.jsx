// src/components/ui/Kartu.jsx
// Komponen pembungkus serbaguna (Card UI component)

function Kartu({ judul, subjudul, icon, badge, watermark, children, className = '' }) {
  return (
    <section className={`kartu ${className}`}>
      {watermark && <div className="kartu-watermark">{watermark}</div>}
      {(judul || icon || badge) && (
        <div className="kartu-header">
          <div className="kartu-header-left">
            {icon && <div className="kartu-icon">{icon}</div>}
            <div>
              {judul && <h2 className="kartu-judul">{judul}</h2>}
              {subjudul && <p className="kartu-subjudul">{subjudul}</p>}
            </div>
          </div>
          {badge && <div className="kartu-header-right">{badge}</div>}
        </div>
      )}
      <div className="kartu-body">{children}</div>
    </section>
  );
}

export default Kartu;
