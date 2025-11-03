import React from "react";
import "../styles/ClueModal.css";
import { useProgressContext } from "../context/progressContext";

export default function ClueModal({ stop, onClose }) {
  const { currentStage, completeStage } = useProgressContext();
  if (!stop) return null;

  return (
    <div className="clue-modal-overlay" onClick={onClose}>
      <div className="clue-modal" onClick={(e) => e.stopPropagation()}>
        <div className="clue-modal-content">
          <h3 className="clue-modal-title">
            {stop.title} — Pista # {stop.label}
          </h3>

          <div className="clue-text">
            <strong>Pista:</strong> {stop.clue}
          </div>
          <div className="clue-text">{stop.clue2}</div>
          <div className="clue-text">{stop.clue3}</div>
          <div className="clue-text">{stop.clue4}</div>
          <div className="clue-prize">
            <strong>Premio:</strong> {stop.prize}
          </div>

          {parseInt(stop.label) === currentStage && (
            <button
              className="clue-complete-btn"
              onClick={() => {
                completeStage(parseInt(stop.label));
                onClose();
              }}
              aria-label="Marcar como completada"
            >
              ¡Completar pista!
            </button>
          )}
        </div>

        <button
          className="clue-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
