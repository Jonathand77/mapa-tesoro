import React, { useState } from "react";
import Map from "./components/Map";
import IntroPage from "./components/IntroModal";
import { ProgressProvider } from "./context/progressContext";
import "./styles/index.css";

export default function App() {
  const [view, setView] = useState("intro");

  return (
    <ProgressProvider> {/* 👈 Aquí envuelves toda la app */}
      <div className="App">
        {view === "intro" ? (
          <IntroPage onStart={() => setView("map")} />
        ) : (
          <Map onOpenIntro={() => setView("intro")} />
        )}
      </div>
    </ProgressProvider>
  );
}
