import { CircleCheck } from 'lucide-react'

// Aviso verde que se muestra después de guardar algo
const MensajeExito = ({ children }) => (
    <div role="status" className="mb-6 flex items-center gap-3 rounded-[15px] bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#2F8F00]">
        <CircleCheck size={18} />
        {children}
    </div>
)

export default MensajeExito
