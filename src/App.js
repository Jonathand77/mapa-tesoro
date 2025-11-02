import React, { useState } from 'react'
import Map from './components/Map'
import IntroPage from './components/IntroModal' // componente convertido a página
import './styles/index.css'

export default function App() {
  // 'intro' o 'map' — la intro ahora es una pestaña/página propia
  const [view, setView] = useState('intro')

  return (
    <div className="App">
      {view === 'intro' ? (
        <IntroPage onStart={() => setView('map')} />
      ) : (
        <Map onOpenIntro={() => setView('intro')} />
      )}
    </div>
  )
}