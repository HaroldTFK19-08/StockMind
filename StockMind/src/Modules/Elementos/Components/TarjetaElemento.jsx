import { Link } from 'react-router-dom'
import { AlertTriangle, CalendarDays, MapPin } from 'lucide-react'

import EstadoElemento from './EstadoElemento'
import { tiposElemento } from '../Data/elementosData'

const formatoFecha = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

const TarjetaElemento = ({ elemento, rutaReportar }) => {
    const tipo = tiposElemento[elemento.tipo]
    const Icono = tipo?.icono

    return (
        <article className="flex flex-col rounded-[20px] border border-[#f1f5f9] bg-white p-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#39A900]">
                    {Icono && <Icono size={22} strokeWidth={1.8} />}
                </div>
                <EstadoElemento estado={elemento.estado} />
            </div>

            <h3 className="text-base font-bold text-[#081B28]">{elemento.nombre}</h3>
            <p className="mt-0.5 text-sm text-[#64748b]">{tipo?.nombre}</p>

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
                <p className="flex items-center gap-2">
                    <MapPin size={15} /> {elemento.ambiente}
                </p>
                <p className="flex items-center gap-2">
                    <CalendarDays size={15} /> Asignado desde el {formatoFecha.format(new Date(`${elemento.asignadoDesde}T00:00:00`))}
                </p>
            </div>

            {rutaReportar && elemento.estado === 'Operativo' && (
                <Link
                    to={rutaReportar}
                    state={{ elementoId: elemento.id }}
                    className="mt-5 flex items-center justify-center gap-2 rounded-[12px] border-2 border-[#edf2f7] px-4 py-2.5 text-sm font-semibold text-[#081B28] transition-colors duration-200 hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#dc2626]"
                >
                    <AlertTriangle size={16} />
                    Reportar daño
                </Link>
            )}
        </article>
    )
}

export default TarjetaElemento
