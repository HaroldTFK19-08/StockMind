import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, Clock, Package, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Boton from '../../../Shared/Components/UI/Boton'
import { contarPor } from '../../../Shared/Utils/texto'

import perfilAprendiz from '../Data/perfilAprendiz'
import { reportesDelAprendiz } from '../Data/datosAprendiz'
import ListaReportes from '../../Reportes/Components/ListaReportes'
import misElementos from '../../Elementos/Data/misElementos'

export default function HomeAprendiz() {
    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfilAprendiz.nombres.split(' ')[0]}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Ficha {perfilAprendiz.ficha} · Ambiente {perfilAprendiz.ambiente}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Elementos a tu cargo" valor={misElementos.length} icono={Package} />
                <StatCard etiqueta="Reportes pendientes" valor={contarPor(reportesDelAprendiz, 'estado', 'Pendiente')} icono={Clock} color="ambar" />
                <StatCard etiqueta="En revisión" valor={contarPor(reportesDelAprendiz, 'estado', 'En revisión')} icono={Wrench} color="azul" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Reportes recientes</h3>
                        <Link to="/aprendiz/reportes" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver todos <ChevronRight size={16} />
                        </Link>
                    </div>
                    <ListaReportes reportes={reportesDelAprendiz.slice(0, 3)} compacta />
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
