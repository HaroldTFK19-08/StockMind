import { ArrowLeftRight, ArrowRight, Package, Plus, Trash2, Truck } from 'lucide-react'

import FotoElemento from '../../Elementos/Components/FotoElemento'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import SearchBar from '../../../Shared/Forms/SearchBar'
import Modal from '../../../Shared/Components/Modals/Modal'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { formatearFecha } from '../../../Shared/Utils/fechas'

import ModalNuevoTraslado from '../Components/ModalNuevoTraslado'
import useTraslados from '../Hooks/useTraslados'

const Traslados = () => {
    const {
        ambientes,
        ambienteOrigenId,
        aprobarTraslado,
        actualizandoEstado,
        busqueda,
        cargando,
        datos,
        detalle,
        danteaccountId,
        elementos,
        eliminarSeleccionado,
        error,
        filtrados,
        guardarTraslado,
        mensaje,
        marcarRecibido,
        modalNuevo,
        abrirDetalle,
        recargar,
        setBusqueda,
        setDetalle,
        setModalNuevo,
        setTrasladoAEliminar,
        totalElementos,
        terminarEliminacion,
        trasladoAEliminar,
        traslados,
        trasladosPendientes,
    } = useTraslados()

    if (cargando) return <Cargando texto="Cargando traslados..." />
    if (!datos) {
        return (
            <section>
                <MensajeError>{error || 'No se pudieron cargar los traslados.'}</MensajeError>
                <Boton onClick={recargar}>Reintentar</Boton>
            </section>
        )
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Traslados registrados" valor={traslados.length} icono={ArrowLeftRight} />
                <StatCard etiqueta="Pendientes o aprobados" valor={trasladosPendientes} icono={Truck} color="azul" />
                <StatCard etiqueta="Elementos trasladados" valor={totalElementos} icono={Package} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Historial de traslados</h2>
                <Boton
                    icono={Plus}
                    onClick={() => setModalNuevo(true)}
                    disabled={!danteaccountId || !ambienteOrigenId}
                >
                    Nuevo traslado
                </Boton>
            </div>
            {!danteaccountId && (
                <p role="status" className="mb-4 rounded-xl border border-[#fef3c7] bg-[#fffbeb] px-4 py-3 text-sm text-[#92400e]">
                    Tu usuario debe tener una sola cuenta DANTE activa. Solicita al administrador que revise la asignación para crear traslados.
                </p>
            )}
            {danteaccountId && !ambienteOrigenId && (
                <p role="status" className="mb-4 rounded-xl border border-[#fef3c7] bg-[#fffbeb] px-4 py-3 text-sm text-[#92400e]">
                    La cuenta DANTE activa no tiene un ambiente de origen válido. Solicita al administrador que revise la asignación.
                </p>
            )}

            <SearchBar
                placeholder="Buscar por código, motivo, origen o destino..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
            />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((traslado) => (
                        <Tarjeta key={traslado.apiId} titulo={traslado.id} className="flex h-full flex-col">
                            <p className="text-sm text-[#64748b]">{traslado.motivo}</p>
                            <div className="mt-4 flex items-center justify-between gap-2 rounded-[14px] bg-[#F7F9F6] p-3 text-sm font-semibold text-[#081B28]">
                                <span className="min-w-0 truncate">{traslado.origen}</span>
                                <ArrowRight size={16} className="shrink-0 text-[#39A900]" />
                                <span className="min-w-0 truncate text-right">{traslado.destino}</span>
                            </div>
                            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <dt className="text-xs text-[#64748b]">Elementos</dt>
                                    <dd className="font-semibold text-[#081B28]">{traslado.cantidadElementos}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Fecha</dt>
                                    <dd className="font-semibold text-[#081B28]">{formatearFecha(traslado.fecha)}</dd>
                                </div>
                            </dl>
                            <div className="mt-4 flex items-center justify-between gap-3">
                                <EstadoBadge estado={traslado.estadoEtiqueta} />
                                <Boton variante="secundario" className="px-3 py-1.5" onClick={() => abrirDetalle(traslado.apiId)}>
                                    Detalles
                                </Boton>
                            </div>
                        </Tarjeta>
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No hay traslados con esa búsqueda" />
            )}

            <Modal
                abierto={Boolean(detalle)}
                titulo={`Traslado ${detalle?.id}`}
                descripcion={detalle && `${detalle.origen} → ${detalle.destino} · ${detalle.motivo}`}
                onCerrar={() => setDetalle(null)}
            >
                {detalle && (
                    <>
                        <ul className="divide-y divide-[#f1f5f9] rounded-[14px] border border-[#f1f5f9]">
                            {detalle.elementos.map((elemento) => (
                                <li key={elemento.id} className="flex items-center gap-3 p-3">
                                    <FotoElemento elemento={elemento} />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-[#081B28]">{elemento.nombre ?? 'Elemento'}</p>
                                        <p className="text-xs text-[#64748b]">{elemento.codigo_inventario ?? elemento.id}</p>
                                    </div>
                                    <EstadoBadge estado={elemento.estado ?? 'Sin estado'} />
                                </li>
                            ))}
                        </ul>
                        {detalle.estado === 'pendiente' && (
                            <Boton
                                className="mt-5 w-full"
                                onClick={() => aprobarTraslado(detalle)}
                                disabled={actualizandoEstado}
                                aria-busy={actualizandoEstado}
                            >
                                {actualizandoEstado ? 'Aprobando...' : 'Aprobar traslado'}
                            </Boton>
                        )}
                        {detalle.estado === 'aprobado' && (
                            <Boton
                                className="mt-5 w-full"
                                onClick={() => marcarRecibido(detalle)}
                                disabled={actualizandoEstado}
                                aria-busy={actualizandoEstado}
                            >
                                {actualizandoEstado ? 'Confirmando...' : 'Confirmar llegada'}
                            </Boton>
                        )}
                        {['pendiente', 'rechazado'].includes(detalle.estado) && (
                            <Boton
                                variante="peligro"
                                icono={Trash2}
                                className="mt-3 w-full"
                                disabled={actualizandoEstado}
                                onClick={() => {
                                    setDetalle(null)
                                    setTrasladoAEliminar(detalle)
                                }}
                            >
                                Eliminar traslado
                            </Boton>
                        )}
                    </>
                )}
            </Modal>

            {trasladoAEliminar && (
                <ModalEliminar
                    titulo="Eliminar traslado"
                    nombre={trasladoAEliminar.id}
                    eliminar={eliminarSeleccionado}
                    onEliminado={terminarEliminacion}
                    onCerrar={() => setTrasladoAEliminar(null)}
                />
            )}

            <ModalNuevoTraslado
                key={`${danteaccountId ?? ''}-${ambienteOrigenId ?? ''}`}
                abierto={modalNuevo}
                ambientes={ambientes}
                elementos={elementos}
                danteaccountId={danteaccountId}
                ambienteOrigenId={ambienteOrigenId}
                onCerrar={() => setModalNuevo(false)}
                onGuardar={guardarTraslado}
            />
        </section>
    )
}

export default Traslados
