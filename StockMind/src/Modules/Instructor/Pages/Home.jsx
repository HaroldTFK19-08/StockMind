import { Link } from 'react-router-dom'
import { AlertOctagon, Building2, ChevronRight, Clock } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import { contarPor } from '../../../Shared/Utils/texto'

import perfilInstructor from '../Data/perfilInstructor'
import { ambientesInstructor, elementosInstructor, reportesInstructor } from '../Data/datosInstructor'
import ListaReportes from '../../Reportes/Components/ListaReportes'

export default function HomeInstructor() {
    const pendientes = reportesInstructor.filter((r) => r.estado === 'Pendiente')

    // Para la gráfica: reportes abiertos por ambiente
    const reportesPorAmbiente = ambientesInstructor.map((ambiente) => ({
        nombre: ambiente.nombre,
        total: reportesInstructor.filter((r) => r.ambienteId === ambiente.id && r.estado !== 'Resuelto').length,
    }))
    const maximo = Math.max(1, ...reportesPorAmbiente.map((a) => a.total))

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfilInstructor.nombres.split(' ')[0]}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Este es el estado de los ambientes de tu centro.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Ambientes" valor={ambientesInstructor.length} icono={Building2} />
                <StatCard etiqueta="Reportes pendientes" valor={pendientes.length} icono={Clock} color="ambar" />
                <StatCard etiqueta="Elementos dañados" valor={contarPor(elementosInstructor, 'estado', 'Dañado')} icono={AlertOctagon} color="rojo" />
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

                {/* Gráfica de barras sencilla hecha con divs */}
                <Tarjeta titulo="Reportes abiertos por ambiente" className="h-fit">
                    <ul className="space-y-4">
                        {reportesPorAmbiente.map((ambiente) => (
                            <li key={ambiente.nombre}>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-[#475569]">{ambiente.nombre}</span>
                                    <span className="font-semibold text-[#081B28]">{ambiente.total}</span>
                                </div>
                                <div className="h-2.5 rounded-full bg-[#F4F7FA]">
                                    <div className="h-2.5 rounded-full bg-[#39A900]" style={{ width: `${(ambiente.total / maximo) * 100}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </Tarjeta>
            </div>
        </section>
    )
}
