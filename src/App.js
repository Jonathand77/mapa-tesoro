import { useState } from "react";
import Map from "./components/Map";
import IntroModal from "./components/IntroModal";
import ClueModal from "./components/ClueModal";

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const clues = {
    1: "🏰 Aquí empieza tu viaje, valiente exploradora. Busca donde los secretos reposan entre muros y sombras.",
    2: "🐿 Un lugar de descanso, donde la calma canta… tu siguiente pista allí te aguarda.",
    3: "🔑 Solo quien escala la montaña del valor hallará la llave del corazón.",
    4: "🎡 Gira el destino y deja que la diversión te muestre el camino.",
    5: "🏕 Donde las almas se reúnen junto al fuego, hallarás la chispa del siguiente deseo.",
    6: "🌲 El bosque susurra tu nombre... ¿podrás oír su secreto?",
    7: "💧 Donde el agua cae y el tiempo se detiene, allí tu tesoro casi te pertenece.",
    8: "🏡 Has llegado al fin del viaje, donde el amor se revela en su máximo paisaje. 💖"
  };

  return (
    <div className="h-screen bg-teal-700 flex items-center justify-center">
      {showIntro ? (
        <IntroModal onStart={() => setShowIntro(false)} />
      ) : (
        <>
          <Map onSelectPoint={setSelectedPoint} />
          {selectedPoint && (
            <ClueModal
              number={selectedPoint}
              text={clues[selectedPoint]}
              onClose={() => setSelectedPoint(null)}
            />
          )}
        </>
      )}
    </div>
  );
}