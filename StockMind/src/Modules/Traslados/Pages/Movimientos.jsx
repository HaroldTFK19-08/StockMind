import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Boxes, Plus } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Boton from '../../../Shared/Components/UI/Boton'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import { formatearFecha } from '../../../Shared/Utils/fechas'

import movimientosData, { tiposMovimiento } from '../Data/movimientosData'
import ModalNuevoMovimiento from '../Components/ModalNuevoMovimiento'

// Entradas y salidas de inventario (Administrador)
const Movimientos = () => {
    const [movimientos, setMovimientos] = useState(movimientosData)
    const [filtro, setFiltro] = useState('Todos')
    const [mensaje, setMensaje] = useState('')
    const [modalAbierto, setModalAbierto] = useState(false)

    const sumarCantidad = (tipo) =>
        movimientos.filter((m) => m.tipo === tipo).reduce((suma, m) => suma + m.cantidad, 0)

    const visibles = movimientos.filter((m) => filtro === 'Todos' || m.tipo === filtro)

    const guardarMovimiento = (nuevoMovimiento) => {
        setMovimientos((actuales) => [{ ...nuevoMovimiento, id: Date.now() }, ...actuales])
        setMensaje(`${nuevoMovimiento.tipo} registrada: ${nuevoMovimiento.cantidad} × ${nuevoMovimiento.elemento}`)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Movimientos registrados" valor={movimientos.length} icono={Boxes} />
                <StatCard etiqueta="Unidades que entraron" valor={sumarCantidad('Entrada')} icono={ArrowDownToLine} color="azul" />
                <StatCard etiqueta="Unidades que salieron" valor={sumarCantidad('Salida')} icono={ArrowUpFromLine} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Historial de movimientos</h2>
                <Boton icono={Plus} onClick={() => setModalAbierto(true)}>Registrar movimiento</Boton>
            </div>

            <FiltroChips opciones={['Todos', ...tiposMovimiento]} valor={filtro} onCambiar={setFiltro} />
            {visibles.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {visibles.map((m) => (
                        <Tarjeta key={m.id} className="flex h-full flex-col">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-bold text-[#081B28]">{m.elemento}</h3>
                                    <p className="text-sm text-[#64748b]">{m.categoria}</p>
                                </div>
                                <EstadoBadge estado={m.tipo} />
                            </div>
                            <dl className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                <div>
                                    <dt className="text-xs text-[#64748b]">Cantidad</dt>
                                    <dd className="font-semibold text-[#081B28]">{m.cantidad}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Fecha</dt>
                                    <dd className="font-semibold text-[#081B28]">{formatearFecha(m.fecha)}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Centro</dt>
                                    <dd className="font-semibold text-[#081B28]">{m.centro}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Responsable</dt>
                                    <dd className="font-semibold text-[#081B28]">{m.responsable}</dd>
                                </div>
                            </dl>
                        </Tarjeta>
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No hay movimientos para mostrar" />
            )}

            <ModalNuevoMovimiento
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                onGuardar={guardarMovimiento}
            />
        </section>
    )
}

export default Movimientos
