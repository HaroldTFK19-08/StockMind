import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Save } from 'lucide-react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import { fechaHoy } from '../../../Shared/Utils/fechas'

import { tiposMovimiento } from '../Data/movimientosData'
import { useCentros } from '../../Centros/Hooks/Centros'
import { categorias } from '../../Elementos/Data/inventarioData'

const crearFormularioVacio = () => ({
    tipo: 'Entrada',
    elemento: '',
    categoria: '',
    cantidad: '',
    centro: '',
    responsable: '',
    fecha: fechaHoy(),
    observaciones: '',
})

const ModalNuevoMovimiento = ({ abierto, onCerrar, onGuardar }) => {
    const { centros, cargando: cargandoCentros, error: errorCentros } = useCentros()
    const [formulario, setFormulario] = useState(crearFormularioVacio)
    const [error, setError] = useState('')

    const cambiarCampo = (evento) => {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
    }

    const cerrar = () => {
        setFormulario(crearFormularioVacio())
        setError('')
        onCerrar()
    }

    const guardar = (evento) => {
        evento.preventDefault()
        const { elemento, categoria, cantidad, centro, responsable } = formulario
        if (!elemento || !categoria || !centro || !responsable) return setError('Completa todos los campos obligatorios')
        if (Number(cantidad) <= 0) return setError('La cantidad debe ser mayor que 0')

        onGuardar({ ...formulario, cantidad: Number(cantidad) })
        cerrar()
    }

    return (
        <Modal
            abierto={abierto}
            titulo="Registrar movimiento"
            descripcion="Registra una entrada o salida del inventario."
            onCerrar={cerrar}
            ancho="max-w-[960px]"
        >
            {/* Formulario de movimiento:
                - Separa tipo de movimiento y datos del registro en secciones.
                - Mantiene validaciones y carga de centros sin cambiar la lógica. */}
            <form onSubmit={guardar} className="space-y-4">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Tipo de movimiento</h3>
                    <fieldset>
                        <legend className="sr-only">Tipo de movimiento</legend>
                        <div className="grid grid-cols-2 rounded-2xl bg-[#f3f5f2] p-1.5">
                            {tiposMovimiento.map((tipo) => {
                                const seleccionado = formulario.tipo === tipo
                                const Icono = tipo === 'Entrada' ? ArrowDownToLine : ArrowUpFromLine
                                return (
                                    <button
                                        key={tipo}
                                        type="button"
                                        aria-pressed={seleccionado}
                                        onClick={() => setFormulario({ ...formulario, tipo })}
                                        className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                                            seleccionado
                                                ? 'bg-white text-[#081B28] shadow-sm'
                                                : 'text-[#64748b] hover:text-[#081B28]'
                                        }`}
                                    >
                                        <Icono size={17} className={tipo === 'Entrada' ? 'text-[#39A900]' : 'text-[#d97706]'} />
                                        {tipo}
                                    </button>
                                )
                            })}
                        </div>
                    </fieldset>
                </section>

                <section className="rounded-2xl border border-[#edf2f7] bg-white p-4">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Datos del movimiento</h3>
                    {/* Grilla compacta para mostrar todos los campos con menor altura total */}
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Campo etiqueta="Elemento" htmlFor="elemento" className="sm:col-span-2 xl:col-span-2">
                            <input id="elemento" name="elemento" value={formulario.elemento} onChange={cambiarCampo} placeholder="Ej: Laptop Dell" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Categoría" htmlFor="categoria">
                            <select id="categoria" name="categoria" value={formulario.categoria} onChange={cambiarCampo} className={claseInput}>
                                <option value="">Elige</option>
                                {categorias.map((categoria) => <option key={categoria}>{categoria}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Cantidad" htmlFor="cantidad">
                            <input id="cantidad" name="cantidad" type="number" min="1" value={formulario.cantidad} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Centro" htmlFor="centro" className="sm:col-span-2 xl:col-span-2">
                            <select id="centro" name="centro" value={formulario.centro} onChange={cambiarCampo} className={claseInput} disabled={cargandoCentros || centros.length === 0}>
                                <option value="">{cargandoCentros ? 'Cargando centros...' : 'Elige'}</option>
                                {centros.map((centro) => <option key={centro.id} value={centro.nombre}>{centro.nombre}</option>)}
                            </select>
                        </Campo>
                        {/* Error de carga de centros (si falla la consulta) */}
                        {errorCentros && <p role="alert" className="animate-inline-error text-sm text-[#dc2626] sm:col-span-2 xl:col-span-4">{errorCentros}</p>}
                        <Campo etiqueta="Fecha" htmlFor="fecha">
                            <input id="fecha" name="fecha" type="date" value={formulario.fecha} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Responsable" htmlFor="responsable" className="sm:col-span-2 xl:col-span-3">
                            <input id="responsable" name="responsable" value={formulario.responsable} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Observaciones (opcional)" htmlFor="observaciones" className="sm:col-span-2 xl:col-span-4">
                            <textarea id="observaciones" name="observaciones" rows={2} value={formulario.observaciones} onChange={cambiarCampo} placeholder="Agrega detalles del movimiento si hace falta" className={claseInput} />
                        </Campo>
                    </div>
                </section>

                {/* Error de validación del formulario */}
                {error && <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">{error}</p>}

                {/* Acciones finales */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" icono={Save} className="w-full sm:w-auto">Guardar movimiento</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoMovimiento
