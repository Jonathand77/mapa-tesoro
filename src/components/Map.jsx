import { useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Map.jsx - versión responsiva y precisa
 *
 * Cómo funciona:
 * - Calcula la proporción (aspect ratio) de la imagen cuando carga.
 * - Usa un contenedor relativo con padding-bottom para mantener la proporción.
 * - La <img> y los botones se posicionan absolute dentro del contenedor (top/left en %).
 *
 * Guarda tu imagen en public/map.jpg (o ajusta src).
 */

export default function Map({ onSelectPoint, claimedPoints = [], stops = [], nextAllowed = 1 }) {
  const imgRef = useRef(null);
  const [aspect, setAspect] = useState(null); // height / width
  // Usa `stops` pasadas desde App; si no hay stops, usa fallback con posiciones conocidas
  const points =
    stops && stops.length
      ? stops.map((s) => ({ id: s.id, top: s.top, left: s.left }))
      : [
          { id: 1, top: "72%", left: "37%" },
          { id: 2, top: "62%", left: "17%" },
          { id: 3, top: "48%", left: "31%" },
          { id: 4, top: "49%", left: "63%" },
          { id: 5, top: "36%", left: "49%" },
          { id: 6, top: "28%", left: "24%" },
          { id: 7, top: "18%", left: "51%" },
          { id: 8, top: "23%", left: "77%" },
        ];

  function handleImageLoad(e) {
    const img = e.target;
    if (img.naturalWidth && img.naturalHeight) {
      setAspect(img.naturalHeight / img.naturalWidth);
    }
  }

  // Si la imagen aún no cargó, mostramos un placeholder que ocupará ancho
  // Container styles:
  // - width: 100% (hasta max width)
  // - paddingBottom: aspect * 100% mantiene la relación w:h
  return (
    <div className="w-full flex justify-center px-4">
      <div
        className="relative w-full max-w-4xl"
        style={{
          // Si no hay aspect todavía, damos una altura mínima razonable para evitar colapso
          paddingBottom: aspect ? `${aspect * 100}%` : "60vh",
        }}
      >
        {/* Imagen colocada absolute para ocupar todo el contenedor respetando aspect */}
        <img
          ref={imgRef}
          src="/img/map.jpg"               // Ajusta el nombre si usas otro archivo en public/
          alt="Mapa del Tesoro"
          onLoad={handleImageLoad}
          className="absolute top-0 left-0 w-full h-full object-contain rounded-2xl shadow-xl select-none pointer-events-none"
          draggable={false}
          style={{ display: "block" }}
        />

        {/* Botones posicionados en porcentaje respecto al contenedor */}
        {points.map((p) => {
          const claimed = claimedPoints.includes(p.id);
          const locked = p.id > nextAllowed;
          return (
            <motion.button
              key={p.id}
              onClick={() => {
                if (locked) return;
                onSelectPoint(p.id);
              }}
              className="absolute flex items-center justify-center rounded-full border-2 shadow-lg"
              style={{
                top: p.top,
                left: p.left,
                transform: "translate(-50%, -50%)",
                // tamaño responsivo: usa clamp para que no sean demasiado pequeños ni enormes
                width: "clamp(36px, 4.5vw, 56px)",
                height: "clamp(36px, 4.5vw, 56px)",
                background: claimed ? "#34d399" : locked ? "#e5e7eb" : "#f7c948",
                color: "#000",
                fontWeight: 700,
                zIndex: 30,
                cursor: locked ? "not-allowed" : "pointer",
                borderColor: claimed ? "#065f46" : "#000",
                opacity: locked ? 0.7 : 1,
              }}
              whileHover={locked ? {} : { scale: 1.08 }}
              whileTap={locked ? {} : { scale: 0.95 }}
              aria-label={`Pista ${p.id}${claimed ? " - reclamada" : locked ? ' - bloqueada' : ''}`}
              disabled={locked}
            >
              <span style={{ fontSize: "clamp(14px, 1.6vw, 20px)" }}>{claimed ? "✓" : p.id}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
