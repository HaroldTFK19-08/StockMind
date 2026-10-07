import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Save } from 'lucide-react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import { fechaHoy } from '../../../Shared/Utils/fechas'

import { tiposMovimiento } from '../Data/movimientosData'
import centrosData from '../../Centros/Data/centrosData'
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
            ancho="max-w-[680px]"
            ocultarBarra
        >
            <form onSubmit={guardar} className="space-y-5">
                <fieldset>
                    <legend className="mb-2.5 text-sm font-semibold text-[#081B28]">Tipo de movimiento</legend>
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

                <div className="grid gap-4 sm:grid-cols-2">
                    <Campo etiqueta="Elemento" htmlFor="elemento" className="sm:col-span-2">
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
                    <Campo etiqueta="Centro" htmlFor="centro">
                        <select id="centro" name="centro" value={formulario.centro} onChange={cambiarCampo} className={claseInput}>
                            <option value="">Elige</option>
                            {centrosData.map((centro) => <option key={centro.id} value={centro.sigla}>{centro.sigla}</option>)}
                        </select>
                    </Campo>
                    <Campo etiqueta="Fecha" htmlFor="fecha">
                        <input id="fecha" name="fecha" type="date" value={formulario.fecha} onChange={cambiarCampo} className={claseInput} />
                    </Campo>
                    <Campo etiqueta="Responsable" htmlFor="responsable" className="sm:col-span-2">
                        <input id="responsable" name="responsable" value={formulario.responsable} onChange={cambiarCampo} className={claseInput} />
                    </Campo>
                    <Campo etiqueta="Observaciones (opcional)" htmlFor="observaciones" className="sm:col-span-2">
                        <textarea id="observaciones" name="observaciones" rows={2} value={formulario.observaciones} onChange={cambiarCampo} placeholder="Agrega detalles del movimiento si hace falta" className={claseInput} />
                    </Campo>
                </div>
                {error && <p className="text-sm text-[#dc2626]">{error}</p>}
                <div className="flex justify-end gap-2 border-t border-[#edf2f7] pt-4">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" icono={Save}>Guardar movimiento</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoMovimiento
