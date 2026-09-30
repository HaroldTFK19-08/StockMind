import EstadoReporte from './EstadoReporte'
import { etiquetaTipoDano } from '../Data/reportesData'

const formatoFecha = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

/**
 * Lista de reportes. En escritorio se ve como tabla y en móvil como tarjetas.
 * compacta: oculta la descripción (útil para el resumen del Home).
 */
const ListaReportes = ({ reportes = [], compacta = false }) => (
    <div className="overflow-hidden rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        {/* Encabezado (solo escritorio) */}
        <div className="hidden grid-cols-[110px_1.6fr_1.2fr_120px_120px] gap-4 border-b border-[#f1f5f9] bg-[#F7F9F6] px-6 py-3 text-xs font-semibold text-[#64748b] md:grid">
            <span>Reporte</span>
            <span>Elemento</span>
            <span>Tipo de daño</span>
            <span>Fecha</span>
            <span>Estado</span>
        </div>

        <ul className="divide-y divide-[#f1f5f9]">
            {reportes.map((reporte) => (
                <li
                    key={reporte.id}
                    className="grid gap-2 px-5 py-4 md:grid-cols-[110px_1.6fr_1.2fr_120px_120px] md:items-center md:gap-4 md:px-6"
                >
                    <div className="flex items-center justify-between md:block">
                        <span className="text-sm font-bold text-[#081B28]">{reporte.id}</span>
                        <span className="md:hidden">
                            <EstadoReporte estado={reporte.estado} />
                        </span>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                        <p className="text-xs text-[#64748b]">Placa {reporte.placa}</p>
                        {!compacta && (
                            <p className="mt-1 text-sm text-[#475569]">{reporte.descripcion}</p>
                        )}
                    </div>

                    <p className="text-sm text-[#475569]">{etiquetaTipoDano(reporte.tipoDano)}</p>

                    <p className="text-sm text-[#64748b]">
                        {formatoFecha.format(new Date(`${reporte.fecha}T00:00:00`))}
                    </p>

                    <span className="hidden md:block">
                        <EstadoReporte estado={reporte.estado} />
                    </span>
                </li>
            ))}
        </ul>
    </div>
)

export default ListaReportes
