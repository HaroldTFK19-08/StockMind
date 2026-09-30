import { Link } from 'react-router-dom'
import { ArrowLeftRight, Building2, ClipboardCheck, Package } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import { formatearFecha } from '../../../Shared/Utils/fechas'

import perfilCuentaDante from '../Data/perfilCuentaDante'
import { ambientesCuentaDante, elementosCuentaDante, reportesCuentaDante } from '../Data/datosCuentaDante'
import { nombreAmbiente } from '../../Ambientes/Data/ambientesData'
import asignacionesData from '../../Asignaciones/Data/asignacionesData'
import trasladosData from '../../Traslados/Data/trasladosData'

const accesos = [
    { titulo: 'Nueva asignación', texto: 'Entrega elementos a un aprendiz', ruta: '/cuentadante/asignaciones', icono: ClipboardCheck },
    { titulo: 'Nuevo traslado', texto: 'Mueve elementos entre ambientes', ruta: '/cuentadante/traslados', icono: ArrowLeftRight },
    { titulo: 'Revisar inventario', texto: 'Busca y filtra tus elementos', ruta: '/cuentadante/elementos', icono: Package },
]

export default function HomeCuentaDante() {
    const reportesAbiertos = reportesCuentaDante.filter((r) => r.estado !== 'Resuelto')

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfilCuentaDante.nombres.split(' ')[0]}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Tienes a cargo {ambientesCuentaDante.length} ambientes y {elementosCuentaDante.length} elementos.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Ambientes a cargo" valor={ambientesCuentaDante.length} icono={Building2} />
                <StatCard etiqueta="Elementos" valor={elementosCuentaDante.length} icono={Package} color="azul" />
                <StatCard etiqueta="Asignaciones" valor={asignacionesData.length} icono={ClipboardCheck} color="ambar" />
                <StatCard etiqueta="Traslados" valor={trasladosData.length} icono={ArrowLeftRight} color="rojo" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {accesos.map((acceso) => {
                    const Icono = acceso.icono
                    return (
                        <Link key={acceso.ruta} to={acceso.ruta} className="flex items-center gap-4 rounded-[20px] border-2 border-[#edf2f7] bg-white p-5 transition-colors hover:border-[#39A900]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#39A900] text-white">
                                <Icono size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-[#081B28]">{acceso.titulo}</p>
                                <p className="text-sm text-[#64748b]">{acceso.texto}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <Tarjeta titulo="Reportes abiertos en tus ambientes" accion={<Link to="/cuentadante/reportes" className="text-sm font-semibold text-[#39A900] hover:underline">Ver todos</Link>}>
                <ul className="divide-y divide-[#f1f5f9]">
                    {reportesAbiertos.map((reporte) => (
                        <li key={reporte.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                            <div>
                                <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                                <p className="text-xs text-[#64748b]">{nombreAmbiente(reporte.ambienteId)} · {formatearFecha(reporte.fecha)}</p>
                            </div>
                            <EstadoBadge estado={reporte.estado} />
                        </li>
                    ))}
                </ul>
            </Tarjeta>
        </section>
    )
}
