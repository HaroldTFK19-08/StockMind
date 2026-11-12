import { motion } from 'motion/react'

/**
 * Caja blanca base para agrupar contenido.
 * titulo y accion (ej. un botón) son opcionales.
 * Usa motion para entrada y microinteracción sin cambiar la estructura del componente.
 */
const Tarjeta = ({ titulo, accion, children, className = '' }) => (
    <motion.section
        // Animación suave al aparecer (coherente con el estilo del proyecto).
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        whileHover={{ y: -3 }}
        className={`rounded-[20px] border border-[#e9efea] bg-white p-6 shadow-[0_8px_24px_rgba(8,27,40,0.04)] transition-[box-shadow,border-color] duration-[220ms] hover:border-[#dce8dd] hover:shadow-[0_14px_32px_rgba(8,27,40,0.07)] ${className}`}
    >
        {(titulo || accion) && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                {titulo && <h2 className="text-base font-bold text-[#081B28]">{titulo}</h2>}
                {accion}
            </div>
        )}
        {children}
    </motion.section>
)

export default Tarjeta
