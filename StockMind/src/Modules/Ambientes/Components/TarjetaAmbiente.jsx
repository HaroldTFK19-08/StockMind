import { Link } from 'react-router-dom'
import { ChevronRight, Package, Users } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'

/**
 * Tarjeta de un ambiente.
 * elementos: lista de elementos que hay en ese ambiente (para mostrar conteos).
 */
const TarjetaAmbiente = ({ ambiente, elementos, rutaDetalle }) => {
    const enBuenEstado = elementos.filter((e) => e.estado === 'Buen estado').length
    const porcentaje = elementos.length ? Math.round((enBuenEstado / elementos.length) * 100) : 0

    return (
        <article className="overflow-hidden rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
            <div className="relative h-36">
                <img src={ambiente.imagen} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3">
                    <EstadoBadge estado={ambiente.estado} />
                </span>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-[#081B28]">{ambiente.nombre}</h3>
                <p className="text-sm text-[#64748b]">{ambiente.area}</p>

                <div className="mt-4 flex gap-5 text-sm text-[#475569]">
                    <span className="flex items-center gap-1.5"><Package size={16} /> {elementos.length} elementos</span>
                    <span className="flex items-center gap-1.5"><Users size={16} /> {ambiente.capacidad} aprendices</span>
                </div>

                {/* Barra: porcentaje de elementos en buen estado */}
                <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs text-[#64748b]">
                        <span>Elementos en buen estado</span>
                        <span className="font-semibold text-[#081B28]">{porcentaje}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#F4F7FA]">
                        <div className="h-2 rounded-full bg-[#39A900]" style={{ width: `${porcentaje}%` }} />
                    </div>
                </div>

                <Link
                    to={rutaDetalle}
                    className="mt-5 flex items-center justify-center gap-1 rounded-[12px] border-2 border-[#edf2f7] py-2.5 text-sm font-semibold text-[#081B28] hover:border-[#39A900] hover:text-[#2F8F00]"
                >
                    Ver inventario <ChevronRight size={16} />
                </Link>
            </div>
        </article>
    )
}

export default TarjetaAmbiente
