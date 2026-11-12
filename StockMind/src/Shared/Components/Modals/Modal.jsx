import { useEffect, useId } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

/**
 * Ventana emergente.
 * <Modal abierto={abierto} titulo="Nuevo traslado" onCerrar={() => setAbierto(false)}>...</Modal>
 * Usa motion/AnimatePresence para animar apertura y cierre sin cambiar la API del componente.
 */
const Modal = ({ abierto, titulo, descripcion, onCerrar, children, ancho = 'max-w-[560px]', ocultarBarra = false }) => {
    const tituloId = useId()
    const descripcionId = useId()

    // Cerrar con la tecla Escape (solo cuando el modal está abierto).
    useEffect(() => {
        if (!abierto) return
        const alPresionar = (evento) => evento.key === 'Escape' && onCerrar()
        window.addEventListener('keydown', alPresionar)
        return () => window.removeEventListener('keydown', alPresionar)
    }, [abierto, onCerrar])

    return (
        <AnimatePresence>
            {abierto && (
                <motion.div
                    // Fondo/backdrop animado: oscurece el contenido y centra el modal.
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#081B28]/55 p-4 backdrop-blur-[6px] sm:p-6"
                    onClick={onCerrar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={tituloId}
                        aria-describedby={descripcion ? descripcionId : undefined}
                        onClick={(evento) => evento.stopPropagation()}
                        // Contenedor principal del modal:
                        // - Limita la altura al viewport para que el contenido no se corte en pantallas pequeñas.
                        // - Permite desplazamiento interno pero OCULTA la barra visualmente (sin scroll visible).
                        // - Esto ayuda a mostrar formularios completos sin afectar la presentación.
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative max-h-[calc(100vh-2rem)] w-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[28px] border border-[#e4eee2] bg-white p-5 shadow-[0_30px_90px_rgba(8,27,40,0.22)] sm:max-h-[calc(100vh-3rem)] sm:p-7 ${ancho}`}
                    >
                        <motion.div
                            // Barra/acento superior animada: mantiene identidad visual (verdes SENA).
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-x-8 top-0 h-1 origin-left rounded-b-full bg-gradient-to-r from-[#2F8F00] via-[#39A900] to-[#8AFD5D]"
                        />

                        {/* Encabezado del modal: título, descripción y acción de cierre */}
                        <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#edf2f7] pb-5">
                            <div className="min-w-0 pt-1">
                                <h2 id={tituloId} className="text-xl font-bold tracking-tight text-[#081B28] sm:text-2xl">{titulo}</h2>
                                {descripcion && <p id={descripcionId} className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{descripcion}</p>}
                            </div>
                            <motion.button
                                type="button"
                                onClick={onCerrar}
                                aria-label="Cerrar"
                                whileHover={{ rotate: 90, scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="shrink-0 rounded-xl border border-[#e8eee8] bg-[#f8fbf7] p-2 text-[#64748b] transition-colors duration-200 hover:border-[#39A900]/30 hover:bg-[#39A900]/10 hover:text-[#2F8F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                            >
                                <X size={20} aria-hidden="true" />
                            </motion.button>
                        </div>

                        {/* Contenido/formulario del modal */}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
