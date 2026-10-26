import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Boxes, Plus } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tabla from '../../../Shared/Components/Tables/Tabla'
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
                <Tabla columnas={['Tipo', 'Elemento', 'Cantidad', 'Centro', 'Responsable', 'Fecha']}>
                    {visibles.map((m) => (
                        <tr key={m.id}>
                            <td><EstadoBadge estado={m.tipo} /></td>
                            <td>
                                <p className="font-semibold text-[#081B28]">{m.elemento}</p>
                                <p className="text-xs">{m.categoria}</p>
                            </td>
                            <td>{m.cantidad}</td>
                            <td>{m.centro}</td>
                            <td>{m.responsable}</td>
                            <td className="whitespace-nowrap">{formatearFecha(m.fecha)}</td>
                        </tr>
                    ))}
                </Tabla>
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
