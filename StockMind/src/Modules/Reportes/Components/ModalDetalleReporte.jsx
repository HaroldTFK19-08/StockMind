import Modal from '../../../Shared/Components/Modals/Modal'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { nombreAmbiente } from '../../Ambientes/Data/ambientesData'
import { estadosReporte } from '../Data/reportesData'

/**
 * Detalle de un reporte. Si puedeCambiarEstado es true, muestra botones para cambiarlo.
 */
const ModalDetalleReporte = ({ reporte, onCerrar, puedeCambiarEstado, onCambiarEstado }) => {
    if (!reporte) return null

    const datos = [
        ['Elemento', `${reporte.elemento} (${reporte.placa})`],
        ['Ambiente', nombreAmbiente(reporte.ambienteId)],
        ['Reportado por', reporte.aprendiz],
        ['Fecha', formatearFecha(reporte.fecha)],
        ['Tipo de daño', reporte.tipoDano],
    ]

    return (
        <Modal abierto titulo={`Reporte ${reporte.id}`} onCerrar={onCerrar} ancho="max-w-[720px]">
            {/* Detalle del reporte:
                - Presenta información clave en tarjetas/secciones legibles.
                - Mantiene acciones de cambio de estado cuando el usuario tiene permiso. */}
            <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                    {/* Badges de estado y prioridad para lectura rápida */}
                    <EstadoBadge estado={reporte.estado} />
                    <EstadoBadge estado={reporte.prioridad} />
                </div>

                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del reporte</h3>
                    <dl className="grid gap-4 sm:grid-cols-2">
                        {datos.map(([etiqueta, valor]) => (
                            <div key={etiqueta} className="rounded-xl border border-[#edf2f7] bg-white p-3">
                                <dt className="text-xs font-medium uppercase tracking-wide text-[#64748b]">{etiqueta}</dt>
                                <dd className="mt-1 text-sm font-semibold text-[#081B28]">{valor}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Descripción</h3>
                    <p className="rounded-xl bg-[#F7F9F6] p-4 text-sm leading-6 text-[#475569]">{reporte.descripcion}</p>
                </section>

                {puedeCambiarEstado && (
                    <div className="rounded-2xl border border-[#edf2f7] p-4 sm:p-5">
                        {/* Acciones de gestión: permite actualizar el estado del reporte */}
                        <p className="mb-3 text-sm font-semibold text-[#081B28]">Cambiar estado</p>
                        <div className="flex flex-wrap gap-2">
                            {estadosReporte.map((estado) => (
                                <Boton
                                    key={estado}
                                    variante={estado === reporte.estado ? 'primario' : 'secundario'}
                                    onClick={() => onCambiarEstado(reporte.id, estado)}
                                >
                                    {estado}
                                </Boton>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default ModalDetalleReporte
