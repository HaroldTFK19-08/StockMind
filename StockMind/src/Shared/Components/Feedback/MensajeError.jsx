import { CircleAlert } from 'lucide-react'

// Aviso rojo para mostrar un error (por ejemplo, cuando falla una petición)
const MensajeError = ({ children }) => (
    <div role="alert" className="mb-6 flex items-center gap-3 rounded-[15px] bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-[#dc2626]">
        <CircleAlert size={18} className="shrink-0" />
        {children}
    </div>
)

export default MensajeError
