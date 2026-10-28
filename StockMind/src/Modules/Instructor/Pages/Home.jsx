import { Link } from 'react-router-dom'
import { AlertOctagon, Building2, ChevronRight, Clock } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import { contarPor } from '../../../Shared/Utils/texto'

import GraficoTorta from '../Components/graficoTorta'
import perfilInstructor from '../Data/perfilInstructor'
import { ambientesInstructor, elementosInstructor, reportesInstructor } from '../Data/datosInstructor'
import ListaReportes from '../../Reportes/Components/ListaReportes'

export default function HomeInstructor() {
    const pendientes = reportesInstructor.filter((r) => r.estado === 'Pendiente')
    const totalAmbientes = ambientesInstructor.length
    const totalPendientes = pendientes.length
    const elementosDanados = contarPor(elementosInstructor, 'estado', 'Dañado')
    const datosGrafico = [
        { nombre: 'Ambientes', cantidad: totalAmbientes, fill: '#39A900' },
        { nombre: 'Reportes pendientes', cantidad: totalPendientes, fill: '#F4B400' },
        { nombre: 'Elementos dañados', cantidad: elementosDanados, fill: '#F06449' },
    ]

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfilInstructor.nombres.split(' ')[0]}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Este es el estado de los ambientes de tu centro.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Ambientes" valor={totalAmbientes} icono={Building2} />
                <StatCard etiqueta="Reportes pendientes" valor={totalPendientes} icono={Clock} color="ambar" />
                <StatCard etiqueta="Elementos dañados" valor={elementosDanados} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Reportes por atender</h3>
                        <Link to="/instructor/reportes" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver historial <ChevronRight size={16} />
                        </Link>
                    </div>
                    <ListaReportes reportes={pendientes} compacta />
                </div>

                <GraficoTorta datos={datosGrafico} />
            </div>
        </section>
    )
}
