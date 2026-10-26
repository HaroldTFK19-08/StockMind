import { Link } from 'react-router-dom'
import { Building2, ChevronRight, MapPin, Package } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'

const TarjetaCentro = ({ centro, totalAmbientes, totalElementos, rutaDetalle }) => (
    <article className="flex flex-col rounded-[20px] border border-[#f1f5f9] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        <div className="mb-5 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#39A900] text-white">
                <Building2 size={22} />
            </div>
            <EstadoBadge estado={centro.estado} />
        </div>

        <p className="text-xs font-bold text-[#2F8F00]">{centro.sigla}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-[#081B28]">{centro.nombre}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748b]"><MapPin size={15} /> {centro.ciudad}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-center">
            <div>
                <p className="text-xl font-bold text-[#081B28]">{totalAmbientes}</p>
                <p className="text-xs text-[#64748b]">Ambientes</p>
            </div>
            <div>
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-[#081B28]"><Package size={16} /> {totalElementos}</p>
                <p className="text-xs text-[#64748b]">Elementos</p>
            </div>
        </div>

        <Link to={rutaDetalle} className="mt-5 flex items-center justify-center gap-1 rounded-[12px] border-2 border-[#edf2f7] py-2.5 text-sm font-semibold text-[#081B28] hover:border-[#39A900] hover:text-[#2F8F00]">
            Ver ambientes <ChevronRight size={16} />
        </Link>
    </article>
)

export default TarjetaCentro
