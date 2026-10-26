import { Link } from 'react-router-dom'
import { AlertOctagon, Building2, ChevronRight, Package, Users } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor } from '../../../Shared/Utils/texto'

import perfilAdmin from '../Data/perfilAdmin'
import usuariosData from '../Data/usuariosData'
import centrosData, { buscarCentro } from '../../Centros/Data/centrosData'
import { buscarAmbiente } from '../../Ambientes/Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'
import reportesData from '../../Reportes/Data/reportesData'

export default function HomeAdmin() {
    const urgentes = reportesData.filter((r) => r.prioridad === 'Alta' && r.estado !== 'Resuelto')

    // Elementos dañados o en reparación (los que necesitan atención)
    const conProblemas = inventarioData.filter((e) => e.estado !== 'Buen estado')

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfilAdmin.nombres.split(' ')[0]}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Resumen del inventario en los centros de formación.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Elementos" valor={inventarioData.length} icono={Package} />
                <StatCard etiqueta="Centros" valor={centrosData.length} icono={Building2} color="azul" />
                <StatCard etiqueta="Usuarios" valor={usuariosData.length} icono={Users} color="ambar" />
                <StatCard etiqueta="Elementos dañados" valor={contarPor(inventarioData, 'estado', 'Dañado')} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Elementos que necesitan atención</h3>
                        <Link to="/admin/inventario" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver inventario <ChevronRight size={16} />
                        </Link>
                    </div>
                    <Tabla columnas={['Código', 'Elemento', 'Centro', 'Ambiente', 'Estado']}>
                        {conProblemas.map((elemento) => {
                            const ambiente = buscarAmbiente(elemento.ambienteId)
                            return (
                                <tr key={elemento.id}>
                                    <td className="font-semibold text-[#081B28]">{elemento.id}</td>
                                    <td className="font-semibold text-[#081B28]">{elemento.nombre}</td>
                                    <td>{buscarCentro(ambiente.centroId).sigla}</td>
                                    <td>{ambiente.nombre}</td>
                                    <td><EstadoBadge estado={elemento.estado} /></td>
                                </tr>
                            )
                        })}
                    </Tabla>
                </div>

                <Tarjeta titulo="Reportes urgentes" className="h-fit" accion={<Link to="/admin/reportes" className="text-sm font-semibold text-[#39A900] hover:underline">Ver todos</Link>}>
                    <ul className="space-y-3">
                        {urgentes.map((reporte) => (
                            <li key={reporte.id} className="rounded-[14px] border border-[#fecaca] bg-[#fef2f2]/50 p-3">
                                <p className="text-sm font-semibold text-[#081B28]">{reporte.elemento}</p>
                                <p className="mt-0.5 text-xs text-[#64748b]">{buscarAmbiente(reporte.ambienteId).nombre} · {formatearFecha(reporte.fecha)}</p>
                            </li>
                        ))}
                    </ul>
                </Tarjeta>
            </div>
        </section>
    )
}
