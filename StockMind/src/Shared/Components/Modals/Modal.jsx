import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Ventana emergente.
 * <Modal abierto={abierto} titulo="Nuevo traslado" onCerrar={() => setAbierto(false)}>...</Modal>
 */
const Modal = ({ abierto, titulo, descripcion, onCerrar, children, ancho = 'max-w-[560px]' }) => {
    // Cerrar con la tecla Escape
    useEffect(() => {
        if (!abierto) return
        const alPresionar = (evento) => evento.key === 'Escape' && onCerrar()
        window.addEventListener('keydown', alPresionar)
        return () => window.removeEventListener('keydown', alPresionar)
    }, [abierto, onCerrar])

    if (!abierto) return null

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#081B28]/50 p-4 sm:items-center" onClick={onCerrar}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={titulo}
                onClick={(evento) => evento.stopPropagation()}
                className={`max-h-[90vh] w-full overflow-y-auto rounded-[20px] bg-white p-6 shadow-xl ${ancho}`}
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-[#081B28]">{titulo}</h2>
                        {descripcion && <p className="mt-1 text-sm text-[#64748b]">{descripcion}</p>}
                    </div>
                    <button type="button" onClick={onCerrar} aria-label="Cerrar" className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
