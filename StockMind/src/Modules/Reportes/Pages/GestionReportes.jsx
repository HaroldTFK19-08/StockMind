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
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { mensajeError } from '../../../Core/Services/apiUtils'
import { formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ModalDetalleReporte from '../Components/ModalDetalleReporte'
import { estadosReporte } from '../Data/reportesData'
import { actualizarEstadoReporte, obtenerReportes } from '../Services/reportesService'
import { useCentros } from '../../Centros/Hooks/Centros'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'

const opciones = ['Todos', ...estadosReporte]

/**
 * Historial / gestión de reportes.
 * - Instructor: <GestionReportes reportes={reportesDeSusAmbientes} puedeCambiarEstado />
 * - Administrador: <GestionReportes mostrarCentro />
 */
const GestionReportes = ({ puedeCambiarEstado = false, mostrarCentro = false }) => {
    const { centros, error: errorCentros } = useCentros()
    const { datos: ambientes = [], error: errorAmbientes } = useCarga(obtenerAmbientes, 'reportes-ambientes')
    const { datos: reportes = [], cargando, error: errorReportes, recargar } = useCarga(obtenerReportes, 'reportes')
    const ambientesCargados = ambientes ?? []
    const reportesCargados = reportes ?? []
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState('Todos')
    const [reporteAbierto, setReporteAbierto] = useState(null)
    const [errorEstado, setErrorEstado] = useState('')

    const filtrados = reportesCargados.filter((r) => {
        let coincideFiltro = filtro === 'Todos' || r.estado === filtro
        return coincideFiltro && incluyeTexto(r.numero + r.elemento + r.placa + r.aprendiz, busqueda)
    })

    const conteos = { Todos: reportesCargados.length }
    estadosReporte.forEach((e) => (conteos[e] = contarPor(reportesCargados, 'estado', e)))

    const cambiarEstado = async (id, estado) => {
        setErrorEstado('')
        try {
            const actualizado = await actualizarEstadoReporte(id, estado)
            setReporteAbierto({ ...reporteAbierto, ...actualizado })
            recargar()
        } catch (error) {
            setErrorEstado(mensajeError(error))
        }
    }

    return (
        <section>
            {(errorReportes || errorAmbientes || (mostrarCentro && errorCentros) || errorEstado) && (
                <MensajeError>{errorReportes || errorAmbientes || errorCentros || errorEstado}</MensajeError>
            )}
            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Pendientes" valor={conteos.Pendiente ?? 0} icono={Clock} color="ambar" />
                <StatCard etiqueta="En revisión" valor={conteos['En revisión'] ?? 0} icono={Wrench} color="azul" />
                <StatCard etiqueta="Resueltos" valor={conteos.Resuelto ?? 0} icono={CircleCheck} />
                <StatCard etiqueta="Total de reportes" valor={reportesCargados.length} icono={FileText} color="rojo" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Reportes</h2>
                <Boton variante="secundario" icono={Printer} onClick={() => window.print()}>Imprimir / PDF</Boton>
            </div>

            <SearchBar placeholder="Buscar por número, elemento, placa o aprendiz..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={opciones} valor={filtro} onCambiar={setFiltro} conteos={conteos} />

            {cargando ? (
                <p className="py-8 text-center text-sm text-[#64748b]">Cargando reportes...</p>
            ) : filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((reporte) => {
                        const ambiente = ambientesCargados.find((item) => Number(item.id) === Number(reporte.ambienteId))
                        const reporteConAmbiente = { ...reporte, ambiente: ambiente?.nombre ?? reporte.ambiente }
                        return (
                            <Tarjeta key={reporte.id} titulo={reporte.numero} className="flex h-full flex-col">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-[#081B28]">{reporte.elemento}</h3>
                                        <p className="text-sm text-[#64748b]">{reporte.tipoDano}</p>
                                    </div>
                                    <EstadoBadge estado={reporte.estado} />
                                </div>
                                <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                    <div className={mostrarCentro ? 'col-span-2' : 'col-span-2'}>
                                        <dt className="text-xs text-[#64748b]">{mostrarCentro ? 'Centro / ambiente' : 'Ambiente'}</dt>
                                        {mostrarCentro && <dd className="font-semibold text-[#081B28]">{centros.find((centro) => Number(centro.id) === Number(ambiente?.headquarter_id))?.nombre ?? 'Centro no disponible'}</dd>}
                                        <dd className="font-semibold text-[#081B28]">{reporteConAmbiente.ambiente}</dd>
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
                                <Boton variante="secundario" className="mt-4 w-full" onClick={() => setReporteAbierto(reporteConAmbiente)}>
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
