import { useState } from 'react'
import { ArrowLeftRight, ArrowRight, Package, Plus, Truck } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import Modal from '../../../Shared/Components/Modals/Modal'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { fechaHoy, formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ModalNuevoTraslado from '../Components/ModalNuevoTraslado'
import trasladosData from '../Data/trasladosData'
import ambientesData from '../../Ambientes/Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'
import FotoElemento from '../../Elementos/Components/FotoElemento'

// Traslados de elementos entre ambientes (Cuentadante)
const Traslados = ({ ambientes = ambientesData }) => {
    const [traslados, setTraslados] = useState(trasladosData)
    const [busqueda, setBusqueda] = useState('')
    const [detalle, setDetalle] = useState(null)
    const [modalNuevo, setModalNuevo] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const totalElementos = traslados.reduce((suma, t) => suma + t.elementos.length, 0)

    const filtrados = traslados.filter((t) => incluyeTexto(t.id + t.motivo + t.origen + t.destino, busqueda))

    const guardarTraslado = (nuevo) => {
        const id = `TR-${String(traslados.length + 1).padStart(3, '0')}`
        setTraslados([{ ...nuevo, id, fecha: fechaHoy(), estado: 'En tránsito' }, ...traslados])
        setMensaje(`Traslado ${id} registrado`)
    }

    const marcarRecibido = (id) => {
        setTraslados(traslados.map((t) => (t.id === id ? { ...t, estado: 'Completado' } : t)))
        setDetalle(null)
        setMensaje(`El traslado ${id} quedó completado`)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Traslados registrados" valor={traslados.length} icono={ArrowLeftRight} />
                <StatCard etiqueta="En tránsito" valor={contarPor(traslados, 'estado', 'En tránsito')} icono={Truck} color="azul" />
                <StatCard etiqueta="Elementos trasladados" valor={totalElementos} icono={Package} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Historial de traslados</h2>
                <Boton icono={Plus} onClick={() => setModalNuevo(true)}>Nuevo traslado</Boton>
            </div>

            <SearchBar placeholder="Buscar por código, motivo, origen o destino..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            {filtrados.length > 0 ? (
                <Tabla columnas={['Código', 'Motivo', 'Recorrido', 'Elementos', 'Fecha', 'Estado', '']}>
                    {filtrados.map((traslado) => (
                        <tr key={traslado.id}>
                            <td className="font-semibold text-[#081B28]">{traslado.id}</td>
                            <td>{traslado.motivo}</td>
                            <td>
                                <span className="flex items-center gap-2">
                                    {traslado.origen} <ArrowRight size={14} className="shrink-0 text-[#39A900]" /> {traslado.destino}
                                </span>
                            </td>
                            <td>{traslado.elementos.length}</td>
                            <td className="whitespace-nowrap">{formatearFecha(traslado.fecha)}</td>
                            <td><EstadoBadge estado={traslado.estado} /></td>
                            <td className="text-right">
                                <Boton variante="secundario" className="px-3 py-1.5" onClick={() => setDetalle(traslado)}>Detalles</Boton>
                            </td>
                        </tr>
                    ))}
                </Tabla>
            ) : (
                <EstadoVacio titulo="No hay traslados con esa búsqueda" />
            )}

            {/* Detalle del traslado */}
            <Modal abierto={Boolean(detalle)} titulo={`Traslado ${detalle?.id}`} descripcion={detalle && `${detalle.origen} → ${detalle.destino} · ${detalle.motivo}`} onCerrar={() => setDetalle(null)}>
                {detalle && (
                    <>
                        <ul className="divide-y divide-[#f1f5f9] rounded-[14px] border border-[#f1f5f9]">
                            {detalle.elementos.map((id) => {
                                const elemento = inventarioData.find((e) => e.id === id)
                                return (
                                    <li key={id} className="flex items-center gap-3 p-3">
                                        <FotoElemento elemento={elemento} />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-[#081B28]">{elemento.nombre}</p>
                                            <p className="text-xs text-[#64748b]">{elemento.id} · {elemento.placa}</p>
                                        </div>
                                        <EstadoBadge estado={elemento.estado} />
                                    </li>
                                )
                            })}
                        </ul>
                        {detalle.estado === 'En tránsito' && (
                            <Boton className="mt-5 w-full" onClick={() => marcarRecibido(detalle.id)}>Confirmar llegada</Boton>
                        )}
                    </>
                )}
            </Modal>

            <ModalNuevoTraslado abierto={modalNuevo} ambientes={ambientes} onCerrar={() => setModalNuevo(false)} onGuardar={guardarTraslado} />
        </section>
    )
}

export default Traslados
