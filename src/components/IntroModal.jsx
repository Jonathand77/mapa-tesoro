import { motion } from "framer-motion";

export default function IntroModal({ onStart }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4">🌙 La Leyenda del Tesoro del Amor</h1>
      <p className="text-gray-700 italic mb-6">
        “En un reino de sueños y risas sin fin,  
        yace un tesoro oculto, brillante y sutil.  
        Ocho senderos marcan tu destino,  
        y en cada paso hallarás tu camino.”
      </p>
      <button
        onClick={onStart}
        className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400"
      >
        Comenzar Aventura
      </button>
    </motion.div>
  );
}
