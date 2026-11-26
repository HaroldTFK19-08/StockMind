import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, MapPinned, Pencil, Trash2 } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import { capitalizar } from '../../../Shared/Utils/texto'

/**
 * Tarjeta de sede (usada en el detalle de centro).
 * Muestra conteos de ambientes/almacenes calculados por el backend.
 */
const TarjetaSede = ({ sede, rutaDetalle, onEditar, onEliminar }) => (
    <motion.article
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex h-full flex-col rounded-[20px] border border-[#e8efe6] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(8,27,40,0.08)]"
    >
        <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39A900]/10 text-[#2F8F00]">
                    <MapPinned size={20} />
                </span>
                <div>
                    <h3 className="text-base font-bold leading-snug text-[#081B28]">{sede.nombre}</h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#64748b]">
                        <MapPin size={14} className="shrink-0" />
                        {sede.direccion}
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
                <EstadoBadge estado={capitalizar(sede.zona)} />
                {onEditar && <BotonIcono icono={Pencil} etiqueta={`Editar ${sede.nombre}`} onClick={onEditar} />}
                {onEliminar && <BotonIcono icono={Trash2} etiqueta={`Eliminar ${sede.nombre}`} variante="peligro" onClick={onEliminar} />}
            </div>
        </div>

        {/* Resumen de ambientes y almacenes */}
        <div className="mt-auto grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-center">
            <div>
                <p className="text-xl font-bold text-[#081B28]">{sede.environments_count ?? 0}</p>
                <p className="text-xs text-[#64748b]">Ambientes</p>
            </div>
            <div>
                <p className="text-xl font-bold text-[#081B28]">{sede.warehouses_count ?? 0}</p>
                <p className="text-xs text-[#64748b]">Almacenes</p>
            </div>
        </div>

        <Link
            to={rutaDetalle}
            className="mt-4 flex items-center justify-center gap-1 rounded-[12px] border border-[#e1ebe0] py-2.5 text-sm font-semibold text-[#081B28] transition-colors hover:border-[#39A900] hover:bg-[#f7fbf6] hover:text-[#2F8F00]"
        >
            Ver ambientes y almacenes <ChevronRight size={16} />
        </Link>
    </motion.article>
)

export default TarjetaSede
