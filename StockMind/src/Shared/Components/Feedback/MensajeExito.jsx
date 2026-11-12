import { motion } from 'motion/react'
import { CircleCheck } from 'lucide-react'

// Aviso verde que se muestra después de guardar algo.
// Se anima con motion al montarse/cambiar el contenido.
const MensajeExito = ({ children }) => (
    <motion.div
        key={String(children)}
        role="status"
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex items-start gap-3 overflow-hidden rounded-2xl border border-[#39A900]/20 bg-white p-4 shadow-[0_8px_24px_rgba(57,169,0,0.07)]"
    >
        <motion.span
            // Ícono con entrada tipo "pop" para destacar el éxito.
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#39A900]/10 text-[#2F8F00] ring-4 ring-[#39A900]/5"
        >
            <CircleCheck size={20} aria-hidden="true" />
        </motion.span>
        <div className="min-w-0 pt-0.5">
            <p className="text-sm font-bold text-[#2F8F00]">Operación completada</p>
            <p className="mt-1 break-words text-sm leading-5 text-[#475569]">{children}</p>
        </div>
    </motion.div>
)

export default MensajeExito
