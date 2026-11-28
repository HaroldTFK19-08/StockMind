import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, Clock, Package, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'
import { obtenerMisElementos } from '../../Elementos/Services/elementosService'
import { obtenerReportes } from '../../Reportes/Services/reportesService'
import ListaReportes from '../../Reportes/Components/ListaReportes'
import TarjetaMindBot from '../../../Shared/Components/Cards/TarjetaMindBot'

export default function HomeAprendiz() {
    const { usuario: sesion } = useAuth()
    const { datos: perfil, error: errorPerfil } = useCarga(
        () => sesion?.id ? obtenerUsuario(sesion.id) : Promise.resolve(null),
        sesion?.id ?? ''
    )
    const { datos: elementosDatos, error: errorElementos } = useCarga(obtenerMisElementos, 'aprendiz-elementos')
    const { datos: reportesDatos, error: errorReportes } = useCarga(obtenerReportes, 'aprendiz-reportes')
    const elementos = elementosDatos ?? []
    const todosReportes = reportesDatos ?? []
    const reportes = perfil?.apprentice?.id
        ? todosReportes.filter((reporte) => Number(reporte.apprentice_id) === Number(perfil.apprentice.id))
        : []
    const pendientes = reportes.filter((reporte) => reporte.estado === 'Pendiente')
    const revision = reportes.filter((reporte) => reporte.estado === 'En revisión')
    const errores = [errorPerfil, errorElementos, errorReportes].filter(Boolean)

    return (
        <section className="space-y-8">
            {errores.map((error) => <MensajeError key={error}>{error}</MensajeError>)}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfil?.nombre_1 ?? sesion?.nombre_1 ?? 'Aprendiz'}</h2>
                    <p className="mt-1 text-sm text-[#64748b]">
                        Ficha {perfil?.apprentice?.coursegroup?.codigo ?? 'sin ficha asignada'}
                    </p>
                </div>
                <TarjetaMindBot />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Elementos a tu cargo" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="Reportes pendientes" valor={pendientes.length} icono={Clock} color="ambar" />
                <StatCard etiqueta="En revisión" valor={revision.length} icono={Wrench} color="azul" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Reportes recientes</h3>
                        <Link to="/aprendiz/reportes" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver todos <ChevronRight size={16} />
                        </Link>
                    </div>
                    {reportes.length ? <ListaReportes reportes={reportes.slice(0, 3)} compacta /> : (
                        <EstadoVacio titulo="Aún no tienes reportes" descripcion="Los reportes que registres aparecerán aquí." />
                    )}
                </div>

                <div className="h-fit rounded-[20px] bg-[#39A900] p-6 text-white">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/15">
                        <AlertTriangle size={21} />
                    </div>
                    <h3 className="text-lg font-bold">¿Algo dejó de funcionar?</h3>
                    <p className="mt-1 text-sm leading-6 text-white/85">Reporta el daño apenas lo notes para que tu instructor lo revise.</p>
                    <Boton to="/aprendiz/reportes/reportarDano" variante="secundario" className="mt-5 w-full border-white">
                        Reportar daño
                    </Boton>
                </div>
            </div>
        </section>
    )
}
