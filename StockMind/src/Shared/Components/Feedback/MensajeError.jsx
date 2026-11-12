import { CircleAlert } from 'lucide-react'

// Aviso rojo para mostrar un error (por ejemplo, cuando falla una petición)
const MensajeError = ({ children }) => (
    <div
        role="alert"
        className="animate-card-enter mb-6 flex items-start gap-3 rounded-2xl border border-[#dc2626]/15 bg-white p-4 shadow-[0_8px_24px_rgba(127,29,29,0.06)]"
    >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2] text-[#b42318]">
            <CircleAlert size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-0.5">
            <p className="text-sm font-bold text-[#991b1b]">No se pudo completar</p>
            <p className="mt-1 break-words text-sm leading-5 text-[#7f1d1d]">{children}</p>
        </div>
    </div>
)

export default MensajeError
