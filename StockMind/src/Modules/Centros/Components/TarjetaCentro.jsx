import { Link } from 'react-router-dom'
import { Building2, ChevronRight, MapPin, Pencil, Trash2 } from 'lucide-react'

import BotonIcono from '../../../Shared/Components/UI/BotonIcono'

/**
 * Tarjeta de un centro de formación (datos del backend).
 * onEditar y onEliminar son opcionales: si no llegan, no se muestran los botones.
 */
const TarjetaCentro = ({ centro, totalSedes, rutaDetalle, onEditar, onEliminar }) => (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        {/* Foto del centro (se guarda en Cloudinary y el backend devuelve la URL) */}
        <div className="h-36 bg-[#F4F7FA]">
            {centro.foto_centro ? (
                <img src={centro.foto_centro} alt="" className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full items-center justify-center text-[#94a3b8]">
                    <Building2 size={36} />
                </div>
            )}
        </div>

        <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-xs font-bold text-[#2F8F00]">Regional {centro.regional}</p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-[#081B28]">{centro.nombre}</h3>
                </div>
                <div className="flex shrink-0">
                    {onEditar && <BotonIcono icono={Pencil} etiqueta={`Editar ${centro.nombre}`} onClick={onEditar} />}
                    {onEliminar && <BotonIcono icono={Trash2} etiqueta={`Eliminar ${centro.nombre}`} variante="peligro" onClick={onEliminar} />}
                </div>
            </div>

            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748b]"><MapPin size={15} /> {centro.ciudad}</p>

            <p className="mt-4 rounded-[14px] bg-[#F7F9F6] p-3 text-center text-sm text-[#64748b]">
                <span className="text-xl font-bold text-[#081B28]">{totalSedes}</span> {totalSedes === 1 ? 'sede' : 'sedes'}
            </p>

            <Link to={rutaDetalle} className="mt-5 flex items-center justify-center gap-1 rounded-[12px] border-2 border-[#edf2f7] py-2.5 text-sm font-semibold text-[#081B28] hover:border-[#39A900] hover:text-[#2F8F00]">
                Ver sedes <ChevronRight size={16} />
            </Link>
        </div>
    </article>
)

export default TarjetaCentro
