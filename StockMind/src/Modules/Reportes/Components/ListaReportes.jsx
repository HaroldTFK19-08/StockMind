import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import { formatearFecha } from '../../../Shared/Utils/fechas'

/**
 * Lista de reportes: en escritorio se ve como tabla y en celular como tarjetas.
 * compacta: oculta la descripción (para los resúmenes del inicio).
 */
const ListaReportes = ({ reportes = [], compacta = false }) => (
    <div className="overflow-hidden rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        <div className="hidden grid-cols-[100px_1.6fr_1.2fr_120px_110px] gap-4 bg-[#F7F9F6] px-6 py-3 text-xs font-semibold text-[#64748b] md:grid">
            <span>Reporte</span>
            <span>Elemento</span>
            <span>Tipo de daño</span>
            <span>Fecha</span>
            <span>Estado</span>
        </div>

        <ul className="divide-y divide-[#f1f5f9]">
            {reportes.map((reporte) => (
                <li key={reporte.id} className="grid gap-2 px-5 py-4 md:grid-cols-[100px_1.6fr_1.2fr_120px_110px] md:items-center md:gap-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#081B28]">{reporte.id}</span>
                        <span className="md:hidden"><EstadoBadge estado={reporte.estado} /></span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                        <p className="text-xs text-[#64748b]">Placa {reporte.placa}</p>
                        {!compacta && <p className="mt-1 text-sm text-[#475569]">{reporte.descripcion}</p>}
                    </div>
                    <p className="text-sm text-[#475569]">{reporte.tipoDano}</p>
                    <p className="text-sm text-[#64748b]">{formatearFecha(reporte.fecha)}</p>
                    <span className="hidden md:block"><EstadoBadge estado={reporte.estado} /></span>
                </li>
            ))}
        </ul>
    </div>
)

export default ListaReportes
