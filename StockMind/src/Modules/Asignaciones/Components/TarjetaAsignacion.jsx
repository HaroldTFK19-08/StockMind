import { Eye, Pencil, RotateCcw, Trash2 } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import { formatearFecha } from '../../../Shared/Utils/fechas'

const estados = {
    activa: 'bg-[#ecfdf3] text-[#027a48]',
    devuelta: 'bg-[#eff6ff] text-[#175cd3]',
    vencida: 'bg-[#fef3f2] text-[#b42318]',
}

const fechaLegible = (fecha) => (fecha ? formatearFecha(fecha) : 'Sin registrar')

const TarjetaAsignacion = ({ asignacion, onVer, onEditar, onDevolver, onEliminar }) => (
    <Tarjeta titulo={asignacion.element?.nombre ?? 'Elemento'} className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-[#39A900]">
                Código {asignacion.element?.codigo_inventario ?? asignacion.elementId}
            </p>
            <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${estados[asignacion.estado] ?? 'bg-slate-100 text-slate-700'}`}>
                {asignacion.estado}
            </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
            <div className="col-span-2">
                <dt className="text-xs text-[#64748b]">Aprendiz a cargo</dt>
                <dd className="font-semibold text-[#081B28]">{asignacion.apprenticeName}</dd>
            </div>
            <div className="col-span-2">
                <dt className="text-xs text-[#64748b]">Instructor responsable</dt>
                <dd className="font-semibold text-[#081B28]">{asignacion.teacherName}</dd>
            </div>
            <div>
                <dt className="text-xs text-[#64748b]">Asignado desde</dt>
                <dd className="font-semibold text-[#081B28]">{fechaLegible(asignacion.fecha)}</dd>
            </div>
            <div>
                <dt className="text-xs text-[#64748b]">Devolución esperada</dt>
                <dd className="font-semibold text-[#081B28]">{fechaLegible(asignacion.fechaDevolucionEsperada)}</dd>
            </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Boton variante="secundario" className="grow" icono={Eye} aria-label={`Ver asignación de ${asignacion.apprenticeName}`} onClick={() => onVer(asignacion)}>
                Ver
            </Boton>
            <Boton variante="secundario" className="grow" icono={Pencil} aria-label={`Editar asignación de ${asignacion.apprenticeName}`} onClick={() => onEditar(asignacion)}>
                Editar
            </Boton>
            {['activa', 'vencida'].includes(asignacion.estado) && (
                <Boton variante="secundario" className="grow" icono={RotateCcw} onClick={() => onDevolver(asignacion)}>
                    Registrar devolución
                </Boton>
            )}
            <Boton variante="peligro" className="grow" icono={Trash2} aria-label={`Eliminar asignación de ${asignacion.apprenticeName}`} onClick={() => onEliminar(asignacion)}>
                Eliminar
            </Boton>
        </div>
    </Tarjeta>
)

export default TarjetaAsignacion
