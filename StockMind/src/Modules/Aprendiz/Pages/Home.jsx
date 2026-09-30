import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, Clock, Package, Wrench } from 'lucide-react'
import StatCard from '../../../Shared/Components/Cards/StatCard'
import perfilAprendiz from '../Data/perfilAprendiz'
import ListaReportes from '../../Reportes/Components/ListaReportes'
import reportesData from '../../Reportes/Data/reportesData'
import elementosData from '../../Elementos/Data/elementosData'

export default function HomeAprendiz() {
    const pendientes = reportesData.filter((r) => r.estado === 'Pendiente').length
    const enRevision = reportesData.filter((r) => r.estado === 'En revisión').length
    const recientes = reportesData.slice(0, 3)
    return (
        <section className="space-y-8">
            {/* Saludo */}
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">
                    Hola, {perfilAprendiz.nombres.split(' ')[0]}
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">
                    Ficha {perfilAprendiz.ficha} · {perfilAprendiz.ambiente}
                </p>
            </div>
            {/* Resumen */}
            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Elementos a tu cargo" valor={elementosData.length} icono={Package} color="verde" />
                <StatCard etiqueta="Reportes pendientes" valor={pendientes} icono={Clock} color="ambar" />
                <StatCard etiqueta="En revisión" valor={enRevision} icono={Wrench} color="azul" />
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                {/* Reportes recientes */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Reportes recientes</h3>
                        <Link
                            to="/aprendiz/reportes"
                            className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline"
                        >
                            Ver todos <ChevronRight size={16} />
                        </Link>
                    </div>
                    <ListaReportes reportes={recientes} compacta />
                </div>
                {/* Acceso rápido */}
                <div className="flex h-fit flex-col rounded-[20px] bg-[#39A900] p-6 text-white">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/15">
                        <AlertTriangle size={21} />
                    </div>
                    <h3 className="text-lg font-bold">¿Algo dejó de funcionar?</h3>
                    <p className="mt-1 text-sm leading-6 text-white/85">
                        Reporta el daño apenas lo notes para que tu instructor lo revise.
                    </p>
                    <Link
                        to="/aprendiz/reportes/reportarDano"
                        className="mt-5 rounded-[30px] bg-white px-5 py-3 text-center text-sm font-bold text-[#2F8F00] transition-colors duration-200 hover:bg-[#f0fdf4]"
                    >
                        Reportar daño
                    </Link>
                </div>
            </div>
        </section>
    )
}
