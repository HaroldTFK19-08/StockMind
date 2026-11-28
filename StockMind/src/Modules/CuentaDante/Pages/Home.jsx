import { Link } from 'react-router-dom'
import { ArrowLeftRight, Building2, ClipboardCheck, Package } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import { obtenerReportes } from '../../Reportes/Services/reportesService'
import { obtenerAsignaciones } from '../../Asignaciones/Services/asignacionesService'
import { obtenerTraslados } from '../../Traslados/service/TrasladoService'
import TarjetaMindBot from '../../../Shared/Components/Cards/TarjetaMindBot'

const accesos = [
    { titulo: 'Nueva asignación', texto: 'Entrega elementos a un aprendiz', ruta: '/cuentadante/asignaciones', icono: ClipboardCheck },
    { titulo: 'Nuevo traslado', texto: 'Mueve elementos entre ambientes', ruta: '/cuentadante/traslados', icono: ArrowLeftRight },
    { titulo: 'Revisar inventario', texto: 'Busca y filtra tus elementos', ruta: '/cuentadante/elementos', icono: Package },
]

export default function HomeCuentaDante() {
    const { usuario: sesion } = useAuth()
    const { datos: perfil, error: errorPerfil } = useCarga(
        () => sesion?.id ? obtenerUsuario(sesion.id) : Promise.resolve(null),
        sesion?.id ?? ''
    )
    const { datos: elementosDatos, error: errorElementos } = useCarga(obtenerElementos, 'cuentadante-elementos')
    const { datos: reportesDatos, error: errorReportes } = useCarga(obtenerReportes, 'cuentadante-reportes')
    const { datos: asignacionesDatos, error: errorAsignaciones } = useCarga(obtenerAsignaciones, 'cuentadante-asignaciones')
    const { datos: trasladosDatos, error: errorTraslados } = useCarga(obtenerTraslados, 'cuentadante-traslados')
    const elementosTodos = elementosDatos ?? []
    const reportesTodos = reportesDatos ?? []
    const asignacionesTodos = asignacionesDatos ?? []
    const trasladosTodos = trasladosDatos ?? []
    const ambientes = (perfil?.danteaccounts ?? []).map((cuenta) => cuenta.environment).filter(Boolean)
    const idsAmbientes = new Set(ambientes.map((ambiente) => Number(ambiente.id)))
    const elementos = elementosTodos.filter((elemento) => idsAmbientes.has(Number(elemento.environment_id)))
    const idsElementos = new Set(elementos.map((elemento) => Number(elemento.id)))
    const reportes = reportesTodos.filter((reporte) => idsAmbientes.has(Number(reporte.ambienteId)) && reporte.estado !== 'Resuelto')
    const asignaciones = asignacionesTodos.filter((asignacion) => idsElementos.has(Number(asignacion.element_id)))
    const traslados = trasladosTodos.filter((traslado) =>
        idsAmbientes.has(Number(traslado.ambiente_origen_id)) || idsAmbientes.has(Number(traslado.ambiente_destino_id))
    )
    const errores = [errorPerfil, errorElementos, errorReportes, errorAsignaciones, errorTraslados].filter(Boolean)

    return (
        <section className="space-y-8">
            {errores.map((error) => <MensajeError key={error}>{error}</MensajeError>)}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfil?.nombre_1 ?? sesion?.nombre_1 ?? 'Cuentadante'}</h2>
                    <p className="mt-1 text-sm text-[#64748b]">Tienes a cargo {ambientes.length} ambientes y {elementos.length} elementos.</p>
                </div>
                <TarjetaMindBot />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Ambientes a cargo" valor={ambientes.length} icono={Building2} />
                <StatCard etiqueta="Elementos" valor={elementos.length} icono={Package} color="azul" />
                <StatCard etiqueta="Asignaciones" valor={asignaciones.length} icono={ClipboardCheck} color="ambar" />
                <StatCard etiqueta="Traslados" valor={traslados.length} icono={ArrowLeftRight} color="rojo" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {accesos.map((acceso) => {
                    const Icono = acceso.icono
                    return (
                        <Link key={acceso.ruta} to={acceso.ruta} className="flex items-center gap-4 rounded-[20px] border-2 border-[#edf2f7] bg-white p-5 transition-colors hover:border-[#39A900]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#39A900] text-white"><Icono size={20} /></div>
                            <div><p className="font-bold text-[#081B28]">{acceso.titulo}</p><p className="text-sm text-[#64748b]">{acceso.texto}</p></div>
                        </Link>
                    )
                })}
            </div>

            <Tarjeta titulo="Reportes abiertos en tus ambientes" accion={
                <Link to="/cuentadante/reportes" className="text-sm font-semibold text-[#39A900] hover:underline">Ver todos</Link>
            }>
                {reportes.length ? (
                    <ul className="divide-y divide-[#f1f5f9]">
                        {reportes.slice(0, 5).map((reporte) => (
                            <li key={reporte.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                                <div>
                                    <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                                    <p className="text-xs text-[#64748b]">
                                        {ambientes.find((ambiente) => Number(ambiente.id) === Number(reporte.ambienteId))?.nombre ?? 'Sin ambiente'} · {formatearFecha(reporte.fecha)}
                                    </p>
                                </div>
                                <EstadoBadge estado={reporte.estado} />
                            </li>
                        ))}
                    </ul>
                ) : <EstadoVacio titulo="No tienes reportes abiertos" />}
            </Tarjeta>
        </section>
    )
}
