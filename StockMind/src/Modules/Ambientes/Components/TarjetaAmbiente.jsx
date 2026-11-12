import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ChevronRight, MapPinned, Package, Pencil, Trash2, Users } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import { capitalizar } from '../../../Shared/Utils/texto'
import sala from '../../../assets/ambientes/sala.jpg'

/**
 * Tarjeta de un ambiente (datos del backend).
 * elements_count lo calcula el backend. onEditar y onEliminar son opcionales.
 * El backend no guarda foto del ambiente, por eso se usa una imagen fija.
 */
const TarjetaAmbiente = ({ ambiente, rutaDetalle, onEditar, onEliminar }) => (
    <motion.article
        // Animación de entrada y hover para tarjetas del dominio Ambientes.
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="overflow-hidden rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(8,27,40,0.08)]"
    >
        <div className="relative h-36 overflow-hidden">
            <motion.img
                src={sala}
                alt=""
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            />
            <span className="absolute left-3 top-3">
                <EstadoBadge estado={capitalizar(ambiente.estado)} />
            </span>
        </div>

        <div className="p-5">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="text-lg font-bold text-[#081B28]">{ambiente.nombre}</h3>
                    <p className="text-sm text-[#64748b]">{ambiente.tipo}</p>
                </div>
                <div className="flex shrink-0">
                    {onEditar && <BotonIcono icono={Pencil} etiqueta={`Editar ${ambiente.nombre}`} onClick={onEditar} />}
                    {onEliminar && <BotonIcono icono={Trash2} etiqueta={`Eliminar ${ambiente.nombre}`} variante="peligro" onClick={onEliminar} />}
                </div>
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-[#475569]">
                {ambiente.headquarter && (
                    <p className="flex items-center gap-1.5"><MapPinned size={16} /> {ambiente.headquarter.nombre}</p>
                )}
                <p className="flex items-center gap-1.5"><Package size={16} /> {ambiente.elements_count ?? 0} elementos</p>
                <p className="flex items-center gap-1.5"><Users size={16} /> Capacidad: {ambiente.capacidad}</p>
            </div>

            <Link
                to={rutaDetalle}
                className="mt-5 flex items-center justify-center gap-1 rounded-[12px] border-2 border-[#edf2f7] py-2.5 text-sm font-semibold text-[#081B28] transition-colors hover:border-[#39A900] hover:text-[#2F8F00]"
            >
                Ver inventario <ChevronRight size={16} />
            </Link>
        </div>
    </motion.article>
)

export default TarjetaAmbiente
