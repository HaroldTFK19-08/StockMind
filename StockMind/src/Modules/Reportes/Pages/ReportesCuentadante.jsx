import { useState } from 'react'
import { CalendarDays, CircleCheck, Send, UserRound } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { fechaHoy, formatearFecha } from '../../../Shared/Utils/fechas'

import reportesData from '../Data/reportesData'
import ambientesData, { nombreAmbiente } from '../../Ambientes/Data/ambientesData'

const novedadVacia = { ambienteId: '', asunto: '', descripcion: '' }

/**
 * Reportes del Cuentadante:
 * - Enviar una novedad al administrador.
 * - Ver los reportes que llegan de sus ambientes y marcarlos como solucionados.
 */
const ReportesCuentadante = ({ ambientes = ambientesData, reportes: reportesIniciales = reportesData }) => {
    const [reportes, setReportes] = useState(reportesIniciales.filter((r) => r.estado !== 'Resuelto'))
    const [novedad, setNovedad] = useState(novedadVacia)
    const [enviadas, setEnviadas] = useState([])
    const [error, setError] = useState('')

    const cambiarCampo = (evento) => {
        setNovedad({ ...novedad, [evento.target.name]: evento.target.value })
    }

    const enviarNovedad = (evento) => {
        evento.preventDefault()
        if (!novedad.ambienteId || !novedad.asunto.trim() || !novedad.descripcion.trim()) {
            return setError('Completa todos los campos')
        }
        setEnviadas([{ ...novedad, id: Date.now(), fecha: fechaHoy() }, ...enviadas])
        setNovedad(novedadVacia)
        setError('')
    }

    const marcarSolucionado = (id) => {
        setReportes(reportes.map((r) => (r.id === id ? { ...r, estado: 'Resuelto' } : r)))
    }

    return (
        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
            {/* Formulario de novedad */}
            <div className="space-y-6">
                <Tarjeta titulo="Enviar novedad al administrador">
                    {enviadas.length > 0 && <MensajeExito>Novedad enviada</MensajeExito>}
                    <form onSubmit={enviarNovedad} className="space-y-4">
                        <Campo etiqueta="Ambiente" htmlFor="ambienteId">
                            <select id="ambienteId" name="ambienteId" value={novedad.ambienteId} onChange={cambiarCampo} className={claseInput}>
                                <option value="">Selecciona un ambiente</option>
                                {ambientes.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Asunto" htmlFor="asunto">
                            <input id="asunto" name="asunto" value={novedad.asunto} onChange={cambiarCampo} placeholder="Ej: Se necesitan 3 sillas nuevas" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Descripción" htmlFor="descripcion" error={error}>
                            <textarea id="descripcion" name="descripcion" rows={4} value={novedad.descripcion} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Boton type="submit" icono={Send} className="w-full">Enviar novedad</Boton>
                    </form>
                </Tarjeta>

                {enviadas.length > 0 && (
                    <Tarjeta titulo="Novedades enviadas hoy">
                        <ul className="space-y-3">
                            {enviadas.map((n) => (
                                <li key={n.id} className="rounded-[12px] bg-[#F7F9F6] p-3 text-sm">
                                    <p className="font-semibold text-[#081B28]">{n.asunto}</p>
                                    <p className="text-[#64748b]">{nombreAmbiente(n.ambienteId)}</p>
                                </li>
                            ))}
                        </ul>
                    </Tarjeta>
                )}
            </div>

            {/* Reportes recibidos */}
            <div>
                <h2 className="mb-4 text-lg font-bold text-[#081B28]">Reportes recibidos</h2>
                {reportes.length === 0 ? (
                    <EstadoVacio titulo="No hay reportes abiertos" descripcion="Cuando un aprendiz reporte un daño en tus ambientes, aparecerá aquí." />
                ) : (
                    <div className="space-y-4">
                        {reportes.map((reporte) => (
                            <Tarjeta key={reporte.id}>
                                <div className="flex flex-wrap items-center gap-2">
                                    <EstadoBadge estado={reporte.estado} />
                                    {reporte.prioridad === 'Alta' && reporte.estado !== 'Resuelto' && <EstadoBadge estado="Urgente" />}
                                    <span className="text-sm text-[#64748b]">{nombreAmbiente(reporte.ambienteId)}</span>
                                </div>
                                <h3 className="mt-3 font-bold text-[#081B28]">{reporte.elemento}: {reporte.tipoDano.toLowerCase()}</h3>
                                <p className="mt-1 text-sm leading-6 text-[#475569]">{reporte.descripcion}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-4 text-sm text-[#64748b]">
                                        <span className="flex items-center gap-1.5"><UserRound size={15} /> {reporte.aprendiz}</span>
                                        <span className="flex items-center gap-1.5"><CalendarDays size={15} /> {formatearFecha(reporte.fecha)}</span>
                                    </div>
                                    {reporte.estado !== 'Resuelto' && (
                                        <Boton variante="secundario" icono={CircleCheck} onClick={() => marcarSolucionado(reporte.id)}>
                                            Marcar como solucionado
                                        </Boton>
                                    )}
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
