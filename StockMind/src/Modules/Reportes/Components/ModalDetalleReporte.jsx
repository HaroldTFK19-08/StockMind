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
        <Modal abierto titulo={`Reporte ${reporte.id}`} onCerrar={onCerrar}>
            <div className="mb-5 flex gap-2">
                <EstadoBadge estado={reporte.estado} />
                <EstadoBadge estado={reporte.prioridad} />
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
                {datos.map(([etiqueta, valor]) => (
                    <div key={etiqueta}>
                        <dt className="text-xs text-[#64748b]">{etiqueta}</dt>
                        <dd className="text-sm font-semibold text-[#081B28]">{valor}</dd>
                    </div>
                ))}
            </dl>

            <p className="mt-5 rounded-[14px] bg-[#F7F9F6] p-4 text-sm leading-6 text-[#475569]">{reporte.descripcion}</p>

            {puedeCambiarEstado && (
                <div className="mt-6 border-t border-[#f1f5f9] pt-5">
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
        </Modal>
    )
}

export default ModalDetalleReporte
