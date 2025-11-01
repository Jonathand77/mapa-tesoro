import { useState, useEffect } from "react";
import Map from "./components/Map";
import IntroModal from "./components/IntroModal";
import ClueModal from "./components/ClueModal";
import stops from "./data/stops.json";

const STORAGE_KEY = "mapaTesoro.claimedPoints";

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [claimedPoints, setClaimedPoints] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist claimed points
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(claimedPoints));
    } catch (e) {
      // ignore
    }
  }, [claimedPoints]);

  const total = stops.length;
  const nextAllowed = claimedPoints.length + 1;

  function handleClaim(pointId) {
    setClaimedPoints((prev) => {
      if (prev.includes(pointId)) return prev;
      return [...prev, pointId];
    });
  }

  function handleSelect(pointId) {
    // Permitir abrir modal solo si es punto reclamado previamente o el siguiente en orden
    if (pointId <= nextAllowed) {
      setSelectedPoint(pointId);
    }
  }

  function handleReset() {
    setClaimedPoints([]);
    localStorage.removeItem(STORAGE_KEY);
    setSelectedPoint(null);
    setShowIntro(true);
  }

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center p-6">
      {showIntro ? (
        <IntroModal onStart={() => setShowIntro(false)} />
      ) : (
        <>
          {/* Progreso */}
          <div className="absolute top-6 right-6 z-40 w-64 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md flex items-center gap-3">
            <div className="w-2/3">
              <div className="text-sm font-semibold">Progreso</div>
              <div className="text-xs text-gray-700">{claimedPoints.length} / {total} completadas</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: `${(claimedPoints.length / total) * 100}%` }} />
              </div>
            </div>
            <div className="w-1/3 text-right">
              {claimedPoints.length === total ? (
                <button onClick={handleReset} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Reiniciar</button>
              ) : (
                <button onClick={() => setShowIntro(true)} className="bg-white text-yellow-600 border border-yellow-400 px-3 py-1 rounded-full text-sm">Instrucciones</button>
              )}
            </div>
          </div>

          <Map onSelectPoint={handleSelect} claimedPoints={claimedPoints} stops={stops} nextAllowed={nextAllowed} />

          {selectedPoint && (
            <ClueModal
              number={selectedPoint}
              text={stops.find((s) => s.id === selectedPoint)?.clue}
              prize={stops.find((s) => s.id === selectedPoint)?.prize}
              isClaimed={claimedPoints.includes(selectedPoint)}
              onClose={() => setSelectedPoint(null)}
              onClaim={() => {
                handleClaim(selectedPoint);
                setSelectedPoint(null);
              }}
            />
          )}

          {/* Modal final cuando todas las paradas estén reclamadas */}
          {claimedPoints.length === total && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-lg text-center shadow-xl">
                <h2 className="text-2xl font-bold mb-3">🎉 ¡Felicidades!</h2>
                <p className="text-gray-700 mb-4">Has completado todas las paradas y reclamado todos los premios. ¡Hora de la sorpresa final!</p>
                <button onClick={handleReset} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400">Reiniciar aventura</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
