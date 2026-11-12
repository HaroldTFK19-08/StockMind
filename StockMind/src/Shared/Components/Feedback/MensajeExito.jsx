import { CircleCheck } from 'lucide-react'

// Aviso verde que se muestra después de guardar algo
const MensajeExito = ({ children }) => (
    <div
        role="status"
        className="animate-card-enter mb-6 flex items-start gap-3 rounded-2xl border border-[#39A900]/20 bg-white p-4 shadow-[0_8px_24px_rgba(57,169,0,0.07)]"
    >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#39A900]/10 text-[#2F8F00]">
            <CircleCheck size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-0.5">
            <p className="text-sm font-bold text-[#2F8F00]">Operación completada</p>
            <p className="mt-1 break-words text-sm leading-5 text-[#475569]">{children}</p>
        </div>
    </div>
)

export default MensajeExito
