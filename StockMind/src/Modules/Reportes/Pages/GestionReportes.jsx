import { useState } from 'react'
import { CircleCheck, Clock, FileText, Printer, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ModalDetalleReporte from '../Components/ModalDetalleReporte'
import reportesData, { estadosReporte } from '../Data/reportesData'
import { buscarAmbiente } from '../../Ambientes/Data/ambientesData'
import { useCentros } from '../../Centros/Hooks/Centros'

const opciones = ['Todos', ...estadosReporte, 'Urgentes']

/**
 * Historial / gestión de reportes.
 * - Instructor: <GestionReportes reportes={reportesDeSusAmbientes} puedeCambiarEstado />
 * - Administrador: <GestionReportes mostrarCentro />
 */
const GestionReportes = ({ reportes: reportesIniciales = reportesData, puedeCambiarEstado = false, mostrarCentro = false }) => {
    const { centros, error: errorCentros } = useCentros()
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
            {mostrarCentro && errorCentros && <MensajeError>{errorCentros}</MensajeError>}
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
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((reporte) => {
                        const ambiente = buscarAmbiente(reporte.ambienteId)
                        return (
                            <Tarjeta key={reporte.id} titulo={reporte.id} className="flex h-full flex-col">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-[#081B28]">{reporte.elemento}</h3>
                                        <p className="text-sm text-[#64748b]">{reporte.tipoDano}</p>
                                    </div>
                                    <EstadoBadge estado={reporte.prioridad} />
                                </div>
                                <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                    <div className={mostrarCentro ? 'col-span-2' : 'col-span-2'}>
                                        <dt className="text-xs text-[#64748b]">{mostrarCentro ? 'Centro / ambiente' : 'Ambiente'}</dt>
                                        {mostrarCentro && <dd className="font-semibold text-[#081B28]">{centros.find((centro) => Number(centro.id) === Number(ambiente.centroId))?.nombre ?? 'Centro no disponible'}</dd>}
                                        <dd className="font-semibold text-[#081B28]">{ambiente.nombre}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-[#64748b]">Reportado por</dt>
                                        <dd className="font-semibold text-[#081B28]">{reporte.aprendiz}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-[#64748b]">Fecha</dt>
                                        <dd className="font-semibold text-[#081B28]">{formatearFecha(reporte.fecha)}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-xs text-[#64748b]">Estado</dt>
                                        <dd className="mt-1"><EstadoBadge estado={reporte.estado} /></dd>
                                    </div>
                                </dl>
                                <Boton variante="secundario" className="mt-4 w-full" onClick={() => setReporteAbierto(reporte)}>
                                        {puedeCambiarEstado ? 'Gestionar' : 'Ver'}
                                </Boton>
                            </Tarjeta>
                        )
                    })}
                </div>
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
