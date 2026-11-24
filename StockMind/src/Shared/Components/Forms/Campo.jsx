import { AnimatePresence, motion } from 'motion/react'

// Clase base para inputs, selects y textareas (consistencia visual en formularios).
// Estilo moderno: superficie suave, bordes sutiles, buen contraste y foco de marca.
export const claseInput =
    'w-full rounded-[14px] border border-[#dfe8e1] bg-[#fcfdfc] px-4 py-3 text-sm text-[#081B28] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-200 placeholder:text-[#94a3b8] hover:border-[#cfe0d1] hover:bg-white focus:border-[#39A900] focus:bg-white focus:shadow-[0_0_0_4px_rgba(57,169,0,0.12)] disabled:cursor-not-allowed disabled:bg-[#f3f6f4] disabled:text-[#64748b]'

/**
 * Etiqueta + campo + mensaje de error.
 * <Campo etiqueta="Nombre" htmlFor="nombre" error={errores.nombre}>
 *     <input id="nombre" className={claseInput} />
 * </Campo>
 */
const Campo = ({ etiqueta, htmlFor, error, children, className = '' }) => (
    <div className={className}>
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[#081B28]">
            {etiqueta}
        </label>
        {children}
        <AnimatePresence initial={false}>
            {error && (
                <motion.p
                    key={String(error)}
                    // Animación del mensaje de error de campo con motion.
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -2, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1.5 overflow-hidden text-sm text-[#dc2626]"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
)

export default Campo
