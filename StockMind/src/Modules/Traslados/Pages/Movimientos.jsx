import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Boxes, Save } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { fechaHoy, formatearFecha } from '../../../Shared/Utils/fechas'

import movimientosData, { tiposMovimiento } from '../Data/movimientosData'
import centrosData from '../../Centros/Data/centrosData'
import { categorias } from '../../Elementos/Data/inventarioData'

const formularioVacio = { tipo: 'Entrada', elemento: '', categoria: '', cantidad: '', centro: '', responsable: '', fecha: fechaHoy(), observaciones: '' }

// Entradas y salidas de inventario (Administrador)
const Movimientos = () => {
    const [movimientos, setMovimientos] = useState(movimientosData)
    const [formulario, setFormulario] = useState(formularioVacio)
    const [filtro, setFiltro] = useState('Todos')
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const sumarCantidad = (tipo) =>
        movimientos.filter((m) => m.tipo === tipo).reduce((suma, m) => suma + m.cantidad, 0)

    const visibles = movimientos.filter((m) => filtro === 'Todos' || m.tipo === filtro)

    const cambiarCampo = (evento) => setFormulario({ ...formulario, [evento.target.name]: evento.target.value })

    const guardar = (evento) => {
        evento.preventDefault()
        const { elemento, categoria, cantidad, centro, responsable } = formulario
        if (!elemento || !categoria || !centro || !responsable) return setError('Completa todos los campos obligatorios')
        if (Number(cantidad) <= 0) return setError('La cantidad debe ser mayor que 0')

        setMovimientos([{ ...formulario, id: Date.now(), cantidad: Number(cantidad) }, ...movimientos])
        setMensaje(`${formulario.tipo} registrada: ${cantidad} × ${elemento}`)
        setFormulario(formularioVacio)
        setError('')
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Movimientos registrados" valor={movimientos.length} icono={Boxes} />
                <StatCard etiqueta="Unidades que entraron" valor={sumarCantidad('Entrada')} icono={ArrowDownToLine} color="azul" />
                <StatCard etiqueta="Unidades que salieron" valor={sumarCantidad('Salida')} icono={ArrowUpFromLine} color="ambar" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
                <Tarjeta titulo="Registrar movimiento" className="h-fit">
                    <form onSubmit={guardar} className="space-y-4">
                        <FiltroChips opciones={tiposMovimiento} valor={formulario.tipo} onCambiar={(tipo) => setFormulario({ ...formulario, tipo })} />
                        <Campo etiqueta="Elemento" htmlFor="elemento">
                            <input id="elemento" name="elemento" value={formulario.elemento} onChange={cambiarCampo} placeholder="Ej: Laptop Dell" className={claseInput} />
                        </Campo>
                        <div className="grid grid-cols-2 gap-3">
                            <Campo etiqueta="Categoría" htmlFor="categoria">
                                <select id="categoria" name="categoria" value={formulario.categoria} onChange={cambiarCampo} className={claseInput}>
                                    <option value="">Elige</option>
                                    {categorias.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </Campo>
                            <Campo etiqueta="Cantidad" htmlFor="cantidad">
                                <input id="cantidad" name="cantidad" type="number" min="1" value={formulario.cantidad} onChange={cambiarCampo} className={claseInput} />
                            </Campo>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Campo etiqueta="Centro" htmlFor="centro">
                                <select id="centro" name="centro" value={formulario.centro} onChange={cambiarCampo} className={claseInput}>
                                    <option value="">Elige</option>
                                    {centrosData.map((c) => <option key={c.id} value={c.sigla}>{c.sigla}</option>)}
                                </select>
                            </Campo>
                            <Campo etiqueta="Fecha" htmlFor="fecha">
                                <input id="fecha" name="fecha" type="date" value={formulario.fecha} onChange={cambiarCampo} className={claseInput} />
                            </Campo>
                        </div>
                        <Campo etiqueta="Responsable" htmlFor="responsable">
                            <input id="responsable" name="responsable" value={formulario.responsable} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Observaciones (opcional)" htmlFor="observaciones" error={error}>
                            <textarea id="observaciones" name="observaciones" rows={3} value={formulario.observaciones} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Boton type="submit" icono={Save} className="w-full">Guardar movimiento</Boton>
                    </form>
                </Tarjeta>

                <div>
                    <h2 className="mb-4 text-lg font-bold text-[#081B28]">Historial</h2>
                    <FiltroChips opciones={['Todos', ...tiposMovimiento]} valor={filtro} onCambiar={setFiltro} />
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
                </div>
            </div>
        </section>
    )
}

export default Movimientos
