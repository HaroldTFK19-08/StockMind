import { ArrowDownToLine, ArrowUpFromLine, Boxes, Plus } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import SearchBar from '../../../Shared/Forms/SearchBar'
import { formatearFecha } from '../../../Shared/Utils/fechas'

import { tiposMovimiento } from '../Data/movimientosData'
import ModalNuevoMovimiento from '../Components/ModalNuevoMovimiento'
import useMovimientos from '../Hooks/useMovimientos'

const Movimientos = () => {
    const {
        abrirNuevo,
        busqueda,
        cargando,
        datos,
        elementos,
        error,
        filtro,
        filtrados,
        guardarMovimiento,
        mensaje,
        modalAbierto,
        movimientos,
        recargar,
        setBusqueda,
        setFiltro,
        setModalAbierto,
    } = useMovimientos()

    if (cargando) return <Cargando texto="Cargando movimientos..." />

    if (!datos) {
        return (
            <section>
                <MensajeError>{error || 'No se pudieron cargar los movimientos.'}</MensajeError>
                <Boton onClick={recargar}>Reintentar</Boton>
            </section>
        )
    }

    const ingresos = movimientos.filter((movimiento) => movimiento.tipo === 'Ingreso').length
    const retirosYBajas = movimientos.filter((movimiento) =>
        ['Retiro', 'Baja'].includes(movimiento.tipo),
    ).length
    const elementosRegistrados = movimientos.reduce(
        (total, movimiento) => total + movimiento.elementIds.length,
        0,
    )

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Movimientos registrados" valor={movimientos.length} icono={Boxes} />
                <StatCard etiqueta="Ingresos registrados" valor={ingresos} icono={ArrowDownToLine} color="azul" />
                <StatCard etiqueta="Retiros y bajas" valor={retirosYBajas} icono={ArrowUpFromLine} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Historial de movimientos</h2>
                <Boton icono={Plus} onClick={abrirNuevo}>Registrar movimiento</Boton>
            </div>

            <p className="mb-4 text-sm text-[#64748b]">
                {elementosRegistrados} elementos asociados a {movimientos.length} movimientos
            </p>

            <SearchBar
                placeholder="Buscar por tipo, motivo, traslado o elemento..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
            />
            <FiltroChips opciones={['Todos', ...tiposMovimiento]} valor={filtro} onCambiar={setFiltro} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((movimiento) => (
                        <Tarjeta key={movimiento.apiId} className="flex h-full flex-col">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="font-bold text-[#081B28]">Movimiento #{movimiento.apiId}</h3>
                                    <p className="mt-1 break-words text-sm text-[#64748b]">{movimiento.motivo}</p>
                                </div>
                                <EstadoBadge estado={movimiento.tipo} />
                            </div>

                            <dl className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                <div>
                                    <dt className="text-xs text-[#64748b]">Fecha</dt>
                                    <dd className="font-semibold text-[#081B28]">
                                        {movimiento.fecha ? formatearFecha(movimiento.fecha) : 'Sin fecha'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Elementos</dt>
                                    <dd className="font-semibold text-[#081B28]">{movimiento.elementIds.length}</dd>
                                </div>
                                {movimiento.transferId && (
                                    <div className="col-span-2">
                                        <dt className="text-xs text-[#64748b]">ID de traslado</dt>
                                        <dd className="font-semibold text-[#081B28]">{movimiento.transferId}</dd>
                                    </div>
                                )}
                                <div className="col-span-2">
                                    <dt className="text-xs text-[#64748b]">Elementos asociados</dt>
                                    <dd className="mt-1 break-words font-semibold text-[#081B28]">
                                        {movimiento.elementos.map((elemento) => elemento.nombre).join(', ') || 'Sin elementos'}
                                    </dd>
                                </div>
                            </dl>

                            <p className="mt-4 text-right text-xs text-[#64748b]">
                                {movimiento.transferId
                                    ? 'Este movimiento se gestiona desde el módulo de traslados.'
                                    : 'El backend registra los movimientos como historial: no permite editarlos ni eliminarlos.'}
                            </p>
                        </Tarjeta>
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No hay movimientos para mostrar" />
            )}

            {modalAbierto && (
                <ModalNuevoMovimiento
                    abierto={modalAbierto}
                    elementos={elementos}
                    onCerrar={() => setModalAbierto(false)}
                    onGuardar={guardarMovimiento}
                />
            )}
        </section>
    )
}

export default Movimientos
