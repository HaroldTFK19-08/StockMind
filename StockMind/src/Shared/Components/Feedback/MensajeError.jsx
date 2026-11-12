import { motion } from 'motion/react'
import { CircleAlert } from 'lucide-react'

// Aviso rojo para mostrar un error (por ejemplo, cuando falla una petición).
// Se anima con motion (entrada + leve énfasis) al montarse/cambiar el contenido.
const MensajeError = ({ children }) => (
    <motion.div
        key={String(children)}
        role="alert"
        initial={{ opacity: 0, y: 10, scale: 0.985, x: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1, x: [0, -4, 4, -2, 0] }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex items-start gap-3 overflow-hidden rounded-2xl border border-[#dc2626]/15 bg-white p-4 shadow-[0_8px_24px_rgba(127,29,29,0.06)]"
    >
        <motion.span
            // Ícono con entrada tipo "pop" para llamar la atención del error.
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2] text-[#b42318] ring-4 ring-[#dc2626]/5"
        >
            <CircleAlert size={20} aria-hidden="true" />
        </motion.span>
        <div className="min-w-0 pt-0.5">
            <p className="text-sm font-bold text-[#991b1b]">No se pudo completar</p>
            <p className="mt-1 break-words text-sm leading-5 text-[#7f1d1d]">{children}</p>
        </div>
    </motion.div>
)

export default MensajeError
