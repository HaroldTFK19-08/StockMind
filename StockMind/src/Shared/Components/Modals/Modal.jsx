import { useEffect, useId } from 'react'
import { X } from 'lucide-react'

/**
 * Ventana emergente.
 * <Modal abierto={abierto} titulo="Nuevo traslado" onCerrar={() => setAbierto(false)}>...</Modal>
 */
const Modal = ({ abierto, titulo, descripcion, onCerrar, children, ancho = 'max-w-[560px]', ocultarBarra = false }) => {
    const tituloId = useId()
    const descripcionId = useId()

    // Cerrar con la tecla Escape
    useEffect(() => {
        if (!abierto) return
        const alPresionar = (evento) => evento.key === 'Escape' && onCerrar()
        window.addEventListener('keydown', alPresionar)
        return () => window.removeEventListener('keydown', alPresionar)
    }, [abierto, onCerrar])

    if (!abierto) return null

    return (
        <div
            className="animate-modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[#081B28]/60 p-3 backdrop-blur-[5px] sm:items-center sm:p-5"
            onClick={onCerrar}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={tituloId}
                aria-describedby={descripcion ? descripcionId : undefined}
                onClick={(evento) => evento.stopPropagation()}
                className={`animate-modal-enter relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-[#e4eee2] bg-white p-5 shadow-[0_28px_90px_rgba(8,27,40,0.28)] sm:rounded-[28px] sm:p-7 ${ocultarBarra ? '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden' : ''} ${ancho}`}
            >
                <div className="animate-modal-accent absolute inset-x-8 top-0 h-1 origin-left rounded-b-full bg-gradient-to-r from-[#2F8F00] via-[#39A900] to-[#8AFD5D]" />
                <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#edf2f7] pb-5">
                    <div className="min-w-0 pt-1">
                        <h2 id={tituloId} className="text-xl font-bold tracking-tight text-[#081B28] sm:text-2xl">{titulo}</h2>
                        {descripcion && <p id={descripcionId} className="mt-1.5 text-sm leading-relaxed text-[#64748b]">{descripcion}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar"
                        className="shrink-0 rounded-xl border border-[#e8eee8] bg-[#f8fbf7] p-2 text-[#64748b] transition duration-200 hover:rotate-90 hover:border-[#39A900]/30 hover:bg-[#39A900]/10 hover:text-[#2F8F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
