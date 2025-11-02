import React, { useState } from 'react'
import stopsData from '../data/stops.json'
import ClueModal from './ClueModal'
import '../styles/index.css' // o App.css según tu proyecto

export default function Map() {
  const [selected, setSelected] = useState(null)

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

  return (
    <div className="map-wrapper">
      <div className="map-container">
        <img src="/img/map.jpg" alt="Mapa del tesoro" className="map-image" />
        {stops.map(stop => (
          <button
            key={stop.id ?? stop.label}
            className="map-marker"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            onClick={() => setSelected(stop)}
            aria-label={`Parada ${stop.id ?? stop.label} - ${stop.title}`}
          >
            <span className="marker-label">{stop.label}</span>
          </button>
        ))}
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
