import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, MapPinned, Pencil, Trash2 } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import { capitalizar } from '../../../Shared/Utils/texto'

/**
 * Tarjeta de una sede (datos del backend).
 * environments_count y warehouses_count los calcula el backend.
 */
const TarjetaSede = ({ sede, rutaDetalle, onEditar, onEliminar }) => (
    <article className="flex flex-col rounded-[20px] border border-[#f1f5f9] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        <div className="mb-5 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#39A900] text-white">
                <MapPinned size={22} />
            </div>
            <div className="flex items-center gap-1">
                <EstadoBadge estado={capitalizar(sede.zona)} />
                {onEditar && <BotonIcono icono={Pencil} etiqueta={`Editar ${sede.nombre}`} onClick={onEditar} />}
                {onEliminar && <BotonIcono icono={Trash2} etiqueta={`Eliminar ${sede.nombre}`} variante="peligro" onClick={onEliminar} />}
            </div>
        </div>

        <h3 className="text-lg font-bold leading-snug text-[#081B28]">{sede.nombre}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748b]"><MapPin size={15} className="shrink-0" /> {sede.direccion}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-center">
            <div>
                <p className="text-xl font-bold text-[#081B28]">{sede.environments_count ?? 0}</p>
                <p className="text-xs text-[#64748b]">Ambientes</p>
            </div>
            <div>
                <p className="text-xl font-bold text-[#081B28]">{sede.warehouses_count ?? 0}</p>
                <p className="text-xs text-[#64748b]">Almacenes</p>
            </div>
        </div>

        <Link to={rutaDetalle} className="mt-5 flex items-center justify-center gap-1 rounded-[12px] border-2 border-[#edf2f7] py-2.5 text-sm font-semibold text-[#081B28] hover:border-[#39A900] hover:text-[#2F8F00]">
            Ver ambientes y almacenes <ChevronRight size={16} />
        </Link>
    </article>
)

export default TarjetaSede
