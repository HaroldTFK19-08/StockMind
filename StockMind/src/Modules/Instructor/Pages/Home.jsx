import { Link } from 'react-router-dom'
import { AlertOctagon, Building2, ChevronRight, Clock } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'
import { obtenerElementos } from '../../Elementos/Services/elementosService'
import { obtenerReportes } from '../../Reportes/Services/reportesService'
import ListaReportes from '../../Reportes/Components/ListaReportes'
import TarjetaMindBot from '../../../Shared/Components/Cards/TarjetaMindBot'
import GraficoTorta from '../Components/graficoTorta'

const elementoConProblemas = (elemento) => {
    const texto = `${elemento.condicion ?? ''} ${elemento.estado ?? ''}`.toLowerCase()
    return ['dañ', 'dan', 'malo', 'repar'].some((estado) => texto.includes(estado))
}

export default function HomeInstructor() {
    const { usuario: sesion } = useAuth()
    const { datos: perfil, error: errorPerfil } = useCarga(
        () => sesion?.id ? obtenerUsuario(sesion.id) : Promise.resolve(null),
        sesion?.id ?? ''
    )
    const { datos: ambientesDatos, error: errorAmbientes } = useCarga(obtenerAmbientes, 'instructor-ambientes')
    const { datos: elementosDatos, error: errorElementos } = useCarga(obtenerElementos, 'instructor-elementos')
    const { datos: reportesDatos, error: errorReportes } = useCarga(obtenerReportes, 'instructor-reportes')
    const todosAmbientes = ambientesDatos ?? []
    const todosElementos = elementosDatos ?? []
    const todosReportes = reportesDatos ?? []
    const ambientes = todosAmbientes.filter((ambiente) => Number(ambiente.teacher_id) === Number(perfil?.teacher?.id))
    const idsAmbientes = new Set(ambientes.map((ambiente) => Number(ambiente.id)))
    const elementos = todosElementos.filter((elemento) => idsAmbientes.has(Number(elemento.environment_id)))
    const reportes = todosReportes.filter((reporte) => idsAmbientes.has(Number(reporte.ambienteId)))
    const pendientes = reportes.filter((reporte) => reporte.estado === 'Pendiente')
    const elementosDanados = elementos.filter(elementoConProblemas).length
    const datosGrafico = [
        { nombre: 'Ambientes', cantidad: ambientes.length, fill: '#39A900' },
        { nombre: 'Reportes pendientes', cantidad: pendientes.length, fill: '#F4B400' },
        { nombre: 'Elementos dañados', cantidad: elementosDanados, fill: '#F06449' },
    ]
    const errores = [errorPerfil, errorAmbientes, errorElementos, errorReportes].filter(Boolean)

    return (
        <section className="space-y-8">
            {errores.map((error) => <MensajeError key={error}>{error}</MensajeError>)}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#081B28] sm:text-3xl">Hola, {perfil?.nombre_1 ?? sesion?.nombre_1 ?? 'Instructor'}</h2>
                    <p className="mt-1 text-sm text-[#64748b]">Este es el estado de tus ambientes asignados.</p>
                </div>
                <TarjetaMindBot />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Ambientes" valor={ambientes.length} icono={Building2} />
                <StatCard etiqueta="Reportes pendientes" valor={pendientes.length} icono={Clock} color="ambar" />
                <StatCard etiqueta="Elementos con problemas" valor={elementosDanados} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[#081B28]">Reportes por atender</h3>
                        <Link to="/instructor/reportes" className="flex items-center gap-1 text-sm font-semibold text-[#39A900] hover:underline">
                            Ver historial <ChevronRight size={16} />
                        </Link>
                    </div>
                    {pendientes.length ? <ListaReportes reportes={pendientes.slice(0, 5)} compacta /> : (
                        <EstadoVacio titulo="No tienes reportes pendientes" />
                    )}
                </div>
                <GraficoTorta datos={datosGrafico} />
            </div>
        </section>
    )
}
