import { SearchX } from 'lucide-react'

const EstadoVacio = ({ titulo, descripcion, icono: Icono = SearchX, children }) => (
    <div className="flex flex-col items-center rounded-[20px] border-2 border-dashed border-[#e2e8f0] bg-white px-6 py-14 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F7FA] text-[#94a3b8]">
            <Icono size={24} />
        </div>
        <h3 className="text-base font-bold text-[#081B28]">{titulo}</h3>
        {descripcion && <p className="mt-1 max-w-[380px] text-sm text-[#64748b]">{descripcion}</p>}
        {children && <div className="mt-5">{children}</div>}
    </div>
)

export default EstadoVacio
