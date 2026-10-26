import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Ventana emergente.
 * <Modal abierto={abierto} titulo="Nuevo traslado" onCerrar={() => setAbierto(false)}>...</Modal>
 */
const Modal = ({ abierto, titulo, descripcion, onCerrar, children, ancho = 'max-w-[560px]', ocultarBarra = false }) => {
    // Cerrar con la tecla Escape
    useEffect(() => {
        if (!abierto) return
        const alPresionar = (evento) => evento.key === 'Escape' && onCerrar()
        window.addEventListener('keydown', alPresionar)
        return () => window.removeEventListener('keydown', alPresionar)
    }, [abierto, onCerrar])

    if (!abierto) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#081B28]/55 p-3 backdrop-blur-sm sm:items-center sm:p-5" onClick={onCerrar}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={titulo}
                onClick={(evento) => evento.stopPropagation()}
                className={`max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-2xl sm:rounded-[24px] sm:p-7 ${ocultarBarra ? 'scrollbar-hidden' : ''} ${ancho}`}
            >
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-[#edf2f7] pb-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-[#081B28]">{titulo}</h2>
                        {descripcion && <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{descripcion}</p>}
                    </div>
                    <button type="button" onClick={onCerrar} aria-label="Cerrar" className="rounded-xl bg-[#f7f9f6] p-2 text-gray-500 transition-colors hover:bg-[#edf2f7] hover:text-[#081B28]">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
