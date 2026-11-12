import { SearchX } from 'lucide-react'

const EstadoVacio = ({ titulo, descripcion, icono: Icono = SearchX, children }) => (
    <div className="animate-card-enter relative flex flex-col items-center overflow-hidden rounded-3xl border border-[#e4eee2] bg-white px-6 py-12 text-center shadow-[0_12px_36px_rgba(8,27,40,0.04)] sm:py-14">
        <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-[#8AFD5D]/10 blur-2xl" />
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#39A900]/35 to-transparent" />
        <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border border-[#39A900]/10 bg-gradient-to-br from-[#39A900]/10 to-[#8AFD5D]/20 text-[#2F8F00] shadow-sm">
            <Icono size={27} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <h3 className="relative text-base font-bold text-[#081B28] sm:text-lg">{titulo}</h3>
        {descripcion && <p className="relative mt-2 max-w-md text-sm leading-6 text-[#64748b]">{descripcion}</p>}
        {children && <div className="relative mt-6">{children}</div>}
    </div>
)

export default EstadoVacio
