import React from "react";
import "../styles/ClueModal.css"; // reutiliza los mismos estilos del modal
import "../styles/RuleModal.css";

export default function RulesModal({ onClose }) {
  return (
    <div className="clue-modal-overlay" onClick={onClose}>
      <div className="clue-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rule-modal-content">
          <h3 className="rule-modal-title">📜 Reglas de la Búsqueda</h3>

          <div className="clue-text">
            1️⃣ Sigue las pistas en orden. Solo una puerta se abre a la vez.
          </div>
          <div className="clue-text">
            2️⃣ Solo puedes completar una pista si ya obtuviste el premio.
          </div>
          <div className="clue-text">
            3️⃣ Si una pista se oculta, el viento del norte sabrá recordarte el
            paso anterior.
          </div>

          <button className="clue-close-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
