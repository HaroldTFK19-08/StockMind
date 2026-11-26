import { motion } from 'motion/react'
import { Eye, Package, Pencil, Trash2, Warehouse } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import { capitalizar } from '../../../Shared/Utils/texto'

/**
 * Tarjeta de almacén dentro del detalle de sede.
 * Recibe acciones por props para mantener el componente presentacional.
 */
const TarjetaAlmacen = ({ almacen, rutaInventario, onConsultar, onEditar, onEliminar }) => {
    const capacidad = Number(almacen.capacidad_elementos) || 0
    const elementos = Number(almacen.elements_count) || 0
    const porcentaje = capacidad > 0 ? Math.min((elementos / capacidad) * 100, 100) : 0

    return (
        <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex h-full flex-col rounded-[20px] border border-[#e8efe6] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(8,27,40,0.08)]"
        >
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39A900]/10 text-[#2F8F00]">
                        <Warehouse size={20} />
                    </span>
                    <div>
                        <h4 className="text-base font-bold text-[#081B28]">{almacen.nombre}</h4>
                        <p className="text-xs text-[#64748b]">Almacén #{almacen.id}</p>
                    </div>
                </div>
                <EstadoBadge estado={capitalizar(almacen.estado)} />
            </div>

            {/* Métricas */}
            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                <div>
                    <dt className="text-xs text-[#64748b]">Elementos</dt>
                    <dd className="font-semibold text-[#081B28]">{elementos}</dd>
                </div>
                <div>
                    <dt className="text-xs text-[#64748b]">Capacidad</dt>
                    <dd className="font-semibold text-[#081B28]">{capacidad}</dd>
                </div>
            </dl>

            {/* Barra de ocupación visual */}
            <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-[#64748b]">
                    <span>Ocupación</span>
                    <span>{Math.round(porcentaje)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e8efe6]">
                    <div
                        className="h-full rounded-full bg-[#39A900] transition-all duration-300"
                        style={{ width: `${porcentaje}%` }}
                    />
                </div>
            </div>

            {/* Acciones */}
            <div className="mt-5 flex flex-wrap items-center justify-end gap-1.5">
                <Boton variante="secundario" icono={Eye} className="px-3 py-1.5 text-xs" onClick={onConsultar}>
                    Ver
                </Boton>
                <Boton
                    to={`${rutaInventario}?almacen=${almacen.id}`}
                    variante="secundario"
                    icono={Package}
                    className="px-3 py-1.5 text-xs"
                >
                    Elementos
                </Boton>
                <BotonIcono icono={Pencil} etiqueta={`Editar ${almacen.nombre}`} onClick={onEditar} />
                <BotonIcono icono={Trash2} etiqueta={`Eliminar ${almacen.nombre}`} variante="peligro" onClick={onEliminar} />
            </div>
        </motion.article>
    )
}

export default TarjetaAlmacen
