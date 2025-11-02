import React from 'react'
import '../styles/index.css'

export default function ClueModal({ stop, onClose }) {
  if (!stop) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{stop.title} — Pista #{stop.label}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          <p><strong>Pista:</strong> {stop.clue}</p>
          <p><strong>Premio:</strong> {stop.prize}</p>
        </div>
        <footer className="modal-footer">
          <button onClick={onClose} className="ok-btn">Cerrar</button>
        </footer>
      </div>
    </div>
  )
}