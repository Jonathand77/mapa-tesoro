import React from 'react'

const IntroModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Introducción del juego"
      >
        <header className="modal-header">
          <h3 style={{ margin: 0 }}>Bienvenido al Tesoro</h3>
        </header>

        <div className="modal-body" style={{ fontFamily: "'Pirata One', cursive" }}>
          <p>
            Prepárate para una emocionante aventura. Explora el mapa, encuentra pistas y descubre
            los tesoros ocultos. Cada número en el mapa es una parada con una pista y un premio.
          </p>
        </div>

        <footer className="modal-footer">
          <button className="ok-btn" onClick={onClose}>Comenzar</button>
        </footer>
      </div>
    </div>
  )
}

export default IntroModal
