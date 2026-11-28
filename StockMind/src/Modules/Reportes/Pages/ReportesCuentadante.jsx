import { useState } from 'react'
import { CalendarDays, CircleCheck, UserRound } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { mensajeError } from '../../../Core/Services/apiUtils'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'

import { actualizarEstadoReporte, obtenerReportes } from '../Services/reportesService'

/**
 * El endpoint de reportes permite gestionar estados. El backend aún no ofrece
 * un endpoint para crear las novedades independientes del Cuentadante.
 */
const ReportesCuentadante = () => {
    const { usuario } = useAuth()
    const { datos: perfil, cargando: cargandoPerfil, error: errorPerfil } = useCarga(
        () => usuario?.id ? obtenerUsuario(usuario.id) : Promise.resolve(null),
        usuario?.id ?? ''
    )
    const { datos: todosReportes = [], cargando: cargandoReportes, error: errorReportes, recargar } =
        useCarga(obtenerReportes, 'reportes-cuentadante')
    const [errorEstado, setErrorEstado] = useState('')
    const [actualizandoId, setActualizandoId] = useState(null)

    const ambientes = (perfil?.danteaccounts ?? [])
        .map((cuenta) => cuenta.environment)
        .filter(Boolean)
    const idsAmbientes = new Set(ambientes.map((ambiente) => Number(ambiente.id)))
    const reportes = (todosReportes ?? [])
        .filter((reporte) => idsAmbientes.has(Number(reporte.ambienteId)) && reporte.estado !== 'Resuelto')
        .map((reporte) => ({
            ...reporte,
            ambiente: ambientes.find((ambiente) => Number(ambiente.id) === Number(reporte.ambienteId))?.nombre
                ?? reporte.ambiente,
        }))

    const marcarSolucionado = async (id) => {
        setErrorEstado('')
        setActualizandoId(id)
        try {
            await actualizarEstadoReporte(id, 'Resuelto')
            recargar()
        } catch (error) {
            setErrorEstado(mensajeError(error))
        } finally {
            setActualizandoId(null)
        }
    }

    return (
        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <div className="space-y-6">
                <Tarjeta titulo="Enviar novedad al administrador">
                    <p className="text-sm leading-6 text-[#64748b]">
                        Esta acción no está disponible todavía: el backend no tiene un endpoint para registrar novedades.
                        No se guardará ni se mostrará un envío simulado.
                    </p>
                </Tarjeta>
            </div>

            <div>
                {(errorPerfil || errorReportes || errorEstado) && (
                    <MensajeError>{errorPerfil || errorReportes || errorEstado}</MensajeError>
                )}
                <h2 className="mb-4 text-lg font-bold text-[#081B28]">Reportes recibidos</h2>
                {cargandoPerfil || cargandoReportes ? (
                    <p className="py-8 text-center text-sm text-[#64748b]">Cargando reportes...</p>
                ) : reportes.length === 0 ? (
                    <EstadoVacio titulo="No hay reportes abiertos" descripcion="Cuando se reporte un daño en uno de tus ambientes, aparecerá aquí." />
                ) : (
                    <div className="space-y-4">
                        {reportes.map((reporte) => (
                            <Tarjeta key={reporte.id}>
                                <div className="flex flex-wrap items-center gap-2">
                                    <EstadoBadge estado={reporte.estado} />
                                    <span className="text-sm text-[#64748b]">{reporte.ambiente}</span>
                                </div>
                                <h3 className="mt-3 font-bold text-[#081B28]">{reporte.elemento}: {reporte.tipoDano.toLowerCase()}</h3>
                                <p className="mt-1 text-sm leading-6 text-[#475569]">{reporte.descripcion}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-4 text-sm text-[#64748b]">
                                        <span className="flex items-center gap-1.5"><UserRound size={15} /> {reporte.aprendiz}</span>
                                        <span className="flex items-center gap-1.5"><CalendarDays size={15} /> {formatearFecha(reporte.fecha)}</span>
                                    </div>
                                    <Boton
                                        variante="secundario"
                                        icono={CircleCheck}
                                        disabled={actualizandoId === reporte.id}
                                        onClick={() => marcarSolucionado(reporte.id)}
                                    >
                                        {actualizandoId === reporte.id ? 'Actualizando...' : 'Marcar como solucionado'}
                                    </Boton>
                                </div>
                            </Tarjeta>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ReportesCuentadante
