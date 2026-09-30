import { useState } from 'react'
import { CircleCheck, Clock, FileText, Printer, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Boton from '../../../Shared/Components/UI/Boton'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ModalDetalleReporte from '../Components/ModalDetalleReporte'
import reportesData, { estadosReporte } from '../Data/reportesData'
import { buscarAmbiente } from '../../Ambientes/Data/ambientesData'
import { buscarCentro } from '../../Centros/Data/centrosData'

const opciones = ['Todos', ...estadosReporte, 'Urgentes']

/**
 * Historial / gestión de reportes.
 * - Instructor: <GestionReportes reportes={reportesDeSusAmbientes} puedeCambiarEstado />
 * - Administrador: <GestionReportes mostrarCentro />
 */
const GestionReportes = ({ reportes: reportesIniciales = reportesData, puedeCambiarEstado = false, mostrarCentro = false }) => {
    const [reportes, setReportes] = useState(reportesIniciales)
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState('Todos')
    const [reporteAbierto, setReporteAbierto] = useState(null)

    const filtrados = reportes.filter((r) => {
        let coincideFiltro = filtro === 'Todos' || r.estado === filtro
        if (filtro === 'Urgentes') coincideFiltro = r.prioridad === 'Alta' && r.estado !== 'Resuelto'
        return coincideFiltro && incluyeTexto(r.id + r.elemento + r.placa + r.aprendiz, busqueda)
    })

    const conteos = { Todos: reportes.length, Urgentes: reportes.filter((r) => r.prioridad === 'Alta' && r.estado !== 'Resuelto').length }
    estadosReporte.forEach((e) => (conteos[e] = contarPor(reportes, 'estado', e)))

    const cambiarEstado = (id, estado) => {
        setReportes(reportes.map((r) => (r.id === id ? { ...r, estado } : r)))
        setReporteAbierto({ ...reporteAbierto, estado })
    }

    return (
        <section>
            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Pendientes" valor={conteos.Pendiente} icono={Clock} color="ambar" />
                <StatCard etiqueta="En revisión" valor={conteos['En revisión']} icono={Wrench} color="azul" />
                <StatCard etiqueta="Resueltos" valor={conteos.Resuelto} icono={CircleCheck} />
                <StatCard etiqueta="Total de reportes" valor={reportes.length} icono={FileText} color="rojo" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Reportes</h2>
                <Boton variante="secundario" icono={Printer} onClick={() => window.print()}>Imprimir / PDF</Boton>
            </div>

            <SearchBar placeholder="Buscar por número, elemento, placa o aprendiz..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={opciones} valor={filtro} onCambiar={setFiltro} conteos={conteos} />

            {filtrados.length > 0 ? (
                <Tabla columnas={['Reporte', 'Elemento', mostrarCentro ? 'Centro / Ambiente' : 'Ambiente', 'Reportado por', 'Fecha', 'Prioridad', 'Estado', '']}>
                    {filtrados.map((reporte) => {
                        const ambiente = buscarAmbiente(reporte.ambienteId)
                        return (
                            <tr key={reporte.id}>
                                <td className="font-semibold text-[#081B28]">{reporte.id}</td>
                                <td>
                                    <p className="font-semibold text-[#081B28]">{reporte.elemento}</p>
                                    <p className="text-xs">{reporte.tipoDano}</p>
                                </td>
                                <td>
                                    {mostrarCentro && <p className="text-xs">{buscarCentro(ambiente.centroId).sigla}</p>}
                                    {ambiente.nombre}
                                </td>
                                <td>{reporte.aprendiz}</td>
                                <td className="whitespace-nowrap">{formatearFecha(reporte.fecha)}</td>
                                <td><EstadoBadge estado={reporte.prioridad} /></td>
                                <td><EstadoBadge estado={reporte.estado} /></td>
                                <td className="text-right">
                                    <Boton variante="secundario" className="px-3 py-1.5" onClick={() => setReporteAbierto(reporte)}>
                                        {puedeCambiarEstado ? 'Gestionar' : 'Ver'}
                                    </Boton>
                                </td>
                            </tr>
                        )
                    })}
                </Tabla>
            ) : (
                <EstadoVacio titulo="No hay reportes con ese filtro" descripcion="Cambia el filtro o busca por otro elemento." />
            )}

            <ModalDetalleReporte
                reporte={reporteAbierto}
                onCerrar={() => setReporteAbierto(null)}
                puedeCambiarEstado={puedeCambiarEstado}
                onCambiarEstado={cambiarEstado}
            />
        </section>
    )
}

export default GestionReportes
