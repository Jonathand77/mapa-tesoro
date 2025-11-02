import React, { useState } from 'react'
import Map from './components/Map'
import IntroModal from './components/IntroModal'
import './styles/index.css'

export default function App() {
  // true = mostrar modal de intro al cargar
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="App">
      {/* El mapa puede renderizarse detrás del modal; el overlay del modal lo cubrirá */}
      <Map />

      <IntroModal
        isOpen={showIntro}
        onClose={() => setShowIntro(false)}
      />
    </div>
  )
}