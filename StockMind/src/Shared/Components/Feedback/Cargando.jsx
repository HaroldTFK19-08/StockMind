import { LoaderCircle } from 'lucide-react'

// Indicador que se muestra mientras llegan los datos del backend
const Cargando = ({ texto = 'Cargando...' }) => (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-sm text-[#64748b]">
        <LoaderCircle size={20} className="animate-spin text-[#39A900]" />
        {texto}
    </div>
)

export default Cargando
