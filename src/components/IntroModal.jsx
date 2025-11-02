import React from 'react'

// IntroPage renderizado usando el template de pergamino (clases CSS ya definidas)
// Usa la clase .parchment-modal como envoltorio para mostrar la imagen de fondo.
const IntroPage = ({ onStart }) => {
  return (
    <main className="intro-page" role="main" aria-label="Introducción del juego" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding: '28px', boxSizing: 'border-box'}}>
      <section className="parchment-modal" aria-hidden="false">
        {/* Texto centrado dentro del pergamino */}
        <div className="parchment-inner" style={{ fontFamily: "'Pirata One', cursive" }}>
          <h2 className="parchment-title">¡VALERIA!</h2>

          <p>
            En tiempos antiguos, cuando el sol danzaba con el viento,
            los corazones valientes seguían el llamado del sentimiento.
            Se decía que en el día del renacer de un alma pura,
            los dioses escondían un tesoro de dulzura.
          </p>

          <p>
            Mas no era el oro lo que brillaba en su interior,
            sino recuerdos, risas y destellos de amor.
          </p>

          <p>
            Hoy, ese destino toca tu puerta, viajera del encanto,
            y tu misión comienza al primer manto del canto.
            Cada pista que halles será un verso del destino,
            cada reto cumplido, un paso en tu camino.
            Sigue las huellas, escucha tu intuición,
          </p>

          <p>
            y deja que la magia te guíe con devoción. Pues si tu espíritu es firme y tu
            sonrisa no decae, hallarás el tesoro donde el amor jamás yace.
            Así que toma aire, abre tu corazón sincero, y comienza tu aventura...
          </p>

          <p className="parchment-strong">¡el Tesoro de tu Cumpleaños Verdadero!</p>
        </div>

        <footer className="modal-footer" style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <button className="ok-btn" onClick={onStart} aria-label="Comenzar">Comenzar</button>
        </footer>
      </section>
    </main>
  )
}

export default IntroPage

