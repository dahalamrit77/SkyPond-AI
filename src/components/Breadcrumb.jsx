import { Link } from 'react-router-dom'
import C from '../tokens.js'

export function Breadcrumb({ items, tone = "default" }) {
  const isLight = tone === "light";

  const sepStyle = { color: isLight ? "rgba(255,255,255,0.45)" : C.muted, fontSize: 13,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 300 };
  const linkStyle = {
    color: isLight ? "rgba(255,255,255,0.68)" : C.muted,
    fontSize: 13,
    textDecoration: "none",
    fontWeight: 300,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
  };
  const currentStyle = { color: isLight ? "#fff" : C.body, fontSize: 13, fontWeight: 300,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" };

  return (
    <div style={{
      background: "transparent",
      borderBottom: "none",
      padding: "10px 5vw",
      marginTop: 64,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span style={sepStyle}>/</span>}
            {item.href ? (
              <Link
                to={item.href}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isLight ? "#fff" : C.p2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isLight ? "rgba(255,255,255,0.68)" : C.muted;
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span style={currentStyle}>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
