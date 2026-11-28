import { Link } from 'react-router-dom'
import { AlertOctagon, Building2, ChevronRight, Package, Users } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuarios } from '../Services/usuariosService'
import { obtenerCentros } from '../../Centros/Services/centrosService'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import { obtenerReportes } from '../../Reportes/Services/reportesService'

const conProblemas = (elemento) => {
    const condicion = String(elemento.condicion ?? '').toLowerCase()
    const estado = String(elemento.estado ?? '').toLowerCase()
    return ['malo', 'regular', 'dañ', 'dan', 'repar'].some((texto) =>
        condicion.includes(texto) || estado.includes(texto)
    )
}

export default function HomeAdmin() {
    const { usuario } = useAuth()
    const { datos: centrosDatos, error: errorCentros } = useCarga(obtenerCentros, 'admin-centros')
    const { datos: ambientesDatos, error: errorAmbientes } = useCarga(obtenerAmbientes, 'admin-ambientes')
    const { datos: elementosDatos, error: errorElementos } = useCarga(obtenerElementos, 'admin-elementos')
    const { datos: usuariosDatos, error: errorUsuarios } = useCarga(obtenerUsuarios, 'admin-usuarios')
    const { datos: reportesDatos, error: errorReportes } = useCarga(obtenerReportes, 'admin-reportes')
    const centros = centrosDatos ?? []
    const ambientes = ambientesDatos ?? []
    const elementos = elementosDatos ?? []
    const usuarios = usuariosDatos ?? []
    const reportes = reportesDatos ?? []
    const problemas = elementos.filter(conProblemas)
    const pendientes = reportes.filter((reporte) => reporte.estado !== 'Resuelto').slice(0, 5)
    const errores = [errorCentros, errorAmbientes, errorElementos, errorUsuarios, errorReportes].filter(Boolean)

    return (
        <section className="space-y-8">
            {errores.map((error) => <MensajeError key={error}>{error}</MensajeError>)}
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">
                    Hola, {usuario?.nombre_1 ?? 'Administrador'}
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">Resumen del inventario en los centros de formación.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Elementos" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="Centros" valor={centros.length} icono={Building2} color="azul" />
                <StatCard etiqueta="Usuarios" valor={usuarios.length} icono={Users} color="ambar" />
                <StatCard etiqueta="Elementos con problemas" valor={problemas.length} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Elementos que necesitan atención</h3>
                        <Link to="/admin/inventario" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver inventario <ChevronRight size={16} />
                        </Link>
                    </div>
                    {problemas.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {problemas.slice(0, 6).map((elemento) => {
                                const ambiente = ambientes.find((item) => Number(item.id) === Number(elemento.environment_id))
                                const centro = centros.find((item) => Number(item.id) === Number(ambiente?.headquarter_id))
                                return (
                                    <Tarjeta key={elemento.id} className="h-full">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-semibold text-[#39A900]">{elemento.codigo_inventario}</p>
                                                <h4 className="mt-1 font-bold text-[#081B28]">{elemento.nombre}</h4>
                                            </div>
                                            <EstadoBadge estado={elemento.condicion ?? elemento.estado} />
                                        </div>
                                        <dl className="mt-4 space-y-2 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                            <div>
                                                <dt className="text-xs text-[#64748b]">Centro</dt>
                                                <dd className="font-semibold text-[#081B28]">{centro?.nombre ?? 'Centro no disponible'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs text-[#64748b]">Ambiente</dt>
                                                <dd className="font-semibold text-[#081B28]">{ambiente?.nombre ?? 'Sin ambiente'}</dd>
                                            </div>
                                        </dl>
                                    </Tarjeta>
                                )
                            })}
                        </div>
                    ) : (
                        <EstadoVacio titulo="No hay elementos que requieran atención" />
                    )}
                </div>

                <Tarjeta titulo="Reportes abiertos" className="h-fit" accion={
                    <Link to="/admin/reportes" className="text-sm font-semibold text-[#39A900] hover:underline">Ver todos</Link>
                }>
                    {pendientes.length > 0 ? (
                        <ul className="space-y-3">
                            {pendientes.map((reporte) => (
                                <li key={reporte.id} className="rounded-[14px] border border-[#edf2f7] bg-[#F7F9F6] p-3">
                                    <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                                    <p className="mt-0.5 text-xs text-[#64748b]">
                                        {ambientes.find((item) => Number(item.id) === Number(reporte.ambienteId))?.nombre ?? 'Sin ambiente'} · {formatearFecha(reporte.fecha)}
                                    </p>
                                    <EstadoBadge estado={reporte.estado} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EstadoVacio titulo="No hay reportes abiertos" />
                    )}
                </Tarjeta>
            </div>
        </section>
    )
}
