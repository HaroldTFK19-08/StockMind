import { AlertTriangle, CalendarDays, MapPin } from 'lucide-react'

import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { tiposElemento } from '../Data/misElementos'

// Tarjeta de un elemento asignado al aprendiz
const TarjetaElemento = ({ elemento, rutaReportar }) => {
    const tipo = tiposElemento[elemento.tipo]
    const Icono = tipo.icono

    return (
        <article className="flex flex-col rounded-[20px] border border-[#f1f5f9] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#39A900]">
                    <Icono size={22} strokeWidth={1.8} />
                </div>
                <EstadoBadge estado={elemento.estado} />
            </div>

            <h3 className="font-bold text-[#081B28]">{elemento.nombre}</h3>
            <p className="text-sm text-[#64748b]">{tipo.nombre}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                <div>
                    <dt className="text-xs text-[#64748b]">Placa</dt>
                    <dd className="font-semibold text-[#081B28]">{elemento.placa}</dd>
                </div>
                <div>
                    <dt className="text-xs text-[#64748b]">Serial</dt>
                    <dd className="font-semibold text-[#081B28]">{elemento.serial}</dd>
                </div>
            </dl>

            <div className="mt-4 space-y-1.5 text-sm text-[#64748b]">
                <p className="flex items-center gap-2"><MapPin size={15} /> {elemento.ambiente}</p>
                <p className="flex items-center gap-2"><CalendarDays size={15} /> Asignado el {formatearFecha(elemento.asignadoDesde)}</p>
            </div>

            {/* Solo se puede reportar un elemento que está en buen estado */}
            {elemento.estado === 'Buen estado' && (
                <Boton
                    to={rutaReportar}
                    state={{ elementoId: elemento.id }}
                    variante="secundario"
                    icono={AlertTriangle}
                    className="mt-5 rounded-[12px]"
                >
                    Reportar daño
                </Boton>
            )}
        </article>
    )
}

export default TarjetaElemento
