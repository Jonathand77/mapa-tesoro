import React, { useState, useRef } from 'react'
import stopsData from '../data/stops.json'
import ClueModal from './ClueModal'
import '../styles/index.css' // o App.css según tu proyecto

export default function Map({ onOpenIntro }) {
  const [selected, setSelected] = useState(null)
  const [debugPoint, setDebugPoint] = useState(null)
  const imgRef = useRef(null)

  // Normaliza la estructura importada: puede ser un array o un objeto { stops: [...] }
  const stops = Array.isArray(stopsData)
    ? stopsData
    : Array.isArray(stopsData?.stops)
    ? stopsData.stops
    : Object.values(stopsData || {}).flat().filter(Boolean)

  if (!Array.isArray(stops) || stops.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <p>No se encontraron paradas en <code>data/stops.json</code>. Revisa el formato (debe ser un array).</p>
      </div>
    )
  }

  function handleMapClick(e) {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (e.shiftKey) {
      const coords = { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }
      setDebugPoint(coords)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${coords.x},${coords.y}`).catch(()=>{})
      }
      setTimeout(()=> setDebugPoint(null), 2500)
    }
  }

  return (
    <div className="map-wrapper">
      <div className="map-container" role="application" aria-label="Mapa del tesoro">
        {/* Botón de información: siempre reabre la pantalla de bienvenida */}
        <button
          className="info-btn"
          aria-label="Información"
          title="Ver introducción"
          onClick={() => onOpenIntro && onOpenIntro()}
        >
          i
        </button>

        <img
          ref={imgRef}
          src="/img/map.jpg"
          alt="Mapa del tesoro"
          className="map-image"
          onClick={handleMapClick}
        />

        {stops.map(stop => (
          <button
            key={stop.id ?? stop.label}
            className="map-marker"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            onClick={() => setSelected(stop)}
            aria-label={`Parada ${stop.id ?? stop.label} - ${stop.title}`}
            title="Haz click para ver la pista"
          >
            <span className="marker-label">{stop.label}</span>
          </button>
        ))}

        {debugPoint && (
          <div
            className="debug-point"
            style={{ left: `${debugPoint.x}%`, top: `${debugPoint.y}%` }}
            title={`coords: ${debugPoint.x}, ${debugPoint.y} (copiado)`}
          />
        )}
      </div>

      {selected && (
        <ClueModal
          stop={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
