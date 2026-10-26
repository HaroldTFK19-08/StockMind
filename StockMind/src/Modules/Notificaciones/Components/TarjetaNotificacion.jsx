import { ArrowLeftRight, Bell, CalendarDays, FileText, Package, UserPlus } from 'lucide-react'
import { formatearFecha } from '../../../Shared/Utils/fechas'

// Ícono según el tipo de notificación
const iconos = {
    reporte: FileText,
    asignacion: Package,
    traslado: ArrowLeftRight,
    usuario: UserPlus,
    sistema: Bell,
}

const TarjetaNotificacion = ({ notificacion, onMarcarLeida }) => {
    const Icono = iconos[notificacion.tipo] ?? Bell

    return (
        <article
            className={`flex gap-4 rounded-[20px] border bg-white p-5 ${
                notificacion.leida ? 'border-[#f1f5f9]' : 'border-[#39A900]/40 shadow-[0_4px_15px_rgba(57,169,0,0.08)]'
            }`}
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#39A900]">
                <Icono size={20} />
            </div>

            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#081B28]">{notificacion.titulo}</h3>
                    {!notificacion.leida && (
                        <span className="rounded-full bg-[#39A900] px-2 py-0.5 text-xs font-semibold text-white">Nueva</span>
                    )}
                </div>
                <p className="mt-1 text-sm leading-6 text-[#475569]">{notificacion.mensaje}</p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#64748b]">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} /> {formatearFecha(notificacion.fecha)}
                    </span>
                    {!notificacion.leida && (
                        <button type="button" onClick={() => onMarcarLeida(notificacion.id)} className="font-semibold text-[#39A900] hover:underline">
                            Marcar como leída
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export default TarjetaNotificacion
