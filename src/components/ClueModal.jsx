import { motion } from "framer-motion";

export default function ClueModal({ number, text, onClose, prize, isClaimed, onClaim }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 max-w-sm text-center shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-xl font-bold mb-3">Pista #{number}</h2>
        <p className="text-gray-700 mb-4">{text}</p>
        {prize && (
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <strong>Premio:</strong> <span className="ml-2">{prize}</span>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded-full hover:bg-gray-300"
          >
            Cerrar
          </button>

          <button
            onClick={() => onClaim && onClaim()}
            disabled={isClaimed}
            className={`px-4 py-2 rounded-full font-semibold ${isClaimed ? 'bg-green-200 text-green-800' : 'bg-yellow-500 text-black hover:bg-yellow-400'}`}
          >
            {isClaimed ? 'Premio reclamado ✓' : 'Reclamar premio'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
