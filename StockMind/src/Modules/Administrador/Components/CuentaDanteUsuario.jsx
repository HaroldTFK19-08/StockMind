import { formatearFecha } from '../../../Shared/Utils/fechas'

const fechaVisible = (fecha) => {
    if (!fecha) return 'Sin fecha'
    const fechaCorta = String(fecha).slice(0, 10)
    return /^\d{4}-\d{2}-\d{2}$/.test(fechaCorta)
        ? formatearFecha(fechaCorta)
        : 'Fecha no disponible'
}

const CuentaDanteUsuario = ({ usuarioId, cuentas = [] }) => {
    const activas = cuentas.filter((cuenta) => !cuenta.fechaFin)
    const cuentaActiva = activas.length === 1 ? activas[0] : null
    const resumen = activas.length === 0
        ? 'Sin asignación vigente'
        : activas.length > 1
            ? `${activas.length} asignaciones vigentes; se requiere corregir`
            : `${cuentaActiva.ambienteNombre || `Ambiente #${cuentaActiva.ambienteId ?? 'no especificado'}`} · desde ${fechaVisible(cuentaActiva.fechaInicio)}`

    return (
        <section className="mt-4 rounded-[14px] border border-[#e5ece6] bg-white p-3" aria-labelledby={`cuenta-dante-${usuarioId}`}>
            <h4 id={`cuenta-dante-${usuarioId}`} className="text-sm font-bold text-[#081B28]">
                Cuenta DANTE
            </h4>
            <p className="mt-1 text-sm text-[#475569]">{resumen}</p>
            {activas.length === 0 && (
                <p className="mt-1 text-xs text-[#64748b]">
                    Asignar el rol Cuentadante no asigna automáticamente un ambiente.
                </p>
            )}
            {activas.length > 1 && (
                <p className="mt-1 text-xs text-[#92400e]">
                    Debe quedar una sola cuenta vigente para que el módulo de traslados pueda operar.
                </p>
            )}

            {cuentas.length > 0 && (
                <details className="mt-3 border-t border-[#edf2f7] pt-2">
                    <summary className="cursor-pointer text-sm font-semibold text-[#2F8F00]">
                        Historial de ambientes ({cuentas.length})
                    </summary>
                    <ul className="mt-2 space-y-2 text-xs text-[#475569]">
                        {cuentas.map((cuenta) => (
                            <li key={cuenta.id} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                                <span className="font-semibold">
                                    {cuenta.ambienteNombre || `Ambiente #${cuenta.ambienteId ?? 'no especificado'}`}
                                </span>
                                <span>
                                    {fechaVisible(cuenta.fechaInicio)} – {cuenta.fechaFin ? fechaVisible(cuenta.fechaFin) : 'Vigente'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </section>
    )
}

export default CuentaDanteUsuario
