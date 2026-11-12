import { useState } from 'react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import inventarioData from '../../Elementos/Data/inventarioData'
import { destinosExtra } from '../Data/trasladosData'

const formularioVacio = { origenId: '', destino: '', motivo: '' }

const ModalNuevoTraslado = ({ abierto, ambientes, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(formularioVacio)
    const [seleccionados, setSeleccionados] = useState([])
    const [error, setError] = useState('')

    // Elementos que están en el ambiente de origen elegido
    const elementosOrigen = inventarioData.filter((e) => e.ambienteId === Number(formulario.origenId))
    const origen = ambientes.find((a) => a.id === Number(formulario.origenId))

    // Destinos: los otros ambientes + taller y almacén
    const destinos = [...ambientes.filter((a) => a.id !== Number(formulario.origenId)).map((a) => a.nombre), ...destinosExtra]

    const cambiarCampo = (evento) => {
        const { name, value } = evento.target
        setFormulario({ ...formulario, [name]: value })
        if (name === 'origenId') setSeleccionados([]) // si cambia el origen, se limpia la selección
    }

    const alternarElemento = (id) => {
        setSeleccionados(seleccionados.includes(id) ? seleccionados.filter((s) => s !== id) : [...seleccionados, id])
    }

    const cerrar = () => {
        setFormulario(formularioVacio)
        setSeleccionados([])
        setError('')
        onCerrar()
    }

    const guardar = (evento) => {
        evento.preventDefault()
        if (!formulario.origenId || !formulario.destino || !formulario.motivo.trim()) return setError('Completa origen, destino y motivo')
        if (seleccionados.length === 0) return setError('Selecciona los elementos a trasladar')

        onGuardar({ origen: origen.nombre, destino: formulario.destino, motivo: formulario.motivo, elementos: seleccionados })
        cerrar()
    }

    return (
        <Modal abierto={abierto} titulo="Nuevo traslado" descripcion="Mueve elementos de un ambiente a otro lugar." onCerrar={cerrar} ancho="max-w-[760px]">
            {/* Formulario de traslado sin scroll interno:
                - Campos principales en grilla para mejor lectura.
                - Lista de elementos en columnas (sin contenedor con overflow). */}
            <form onSubmit={guardar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del traslado</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Ambiente de origen" htmlFor="origenId">
                            <select id="origenId" name="origenId" value={formulario.origenId} onChange={cambiarCampo} className={claseInput}>
                                <option value="">Selecciona</option>
                                {ambientes.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Destino" htmlFor="destino">
                            <select id="destino" name="destino" value={formulario.destino} onChange={cambiarCampo} className={claseInput}>
                                <option value="">Selecciona</option>
                                {destinos.map((d) => <option key={d}>{d}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Motivo" htmlFor="motivo" className="sm:col-span-2">
                            <input id="motivo" name="motivo" value={formulario.motivo} onChange={cambiarCampo} placeholder="Ej: Revisión técnica" className={claseInput} />
                        </Campo>
                    </div>
                </section>

                {formulario.origenId && (
                    <fieldset className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                        <legend className="px-1 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                            Elementos de {origen?.nombre} ({seleccionados.length} seleccionados)
                        </legend>

                        {/* Lista de elementos visible completa en grilla (sin max-height ni overflow) */}
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {elementosOrigen.length === 0 && (
                                <p className="rounded-xl border border-dashed border-[#d7e4d8] p-4 text-sm text-[#64748b] sm:col-span-2">
                                    Este ambiente no tiene elementos.
                                </p>
                            )}
                            {elementosOrigen.map((elemento) => (
                                <label key={elemento.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#edf2f7] p-3 text-sm transition-colors hover:border-[#dce8dd] hover:bg-[#F7F9F6]">
                                    <input type="checkbox" checked={seleccionados.includes(elemento.id)} onChange={() => alternarElemento(elemento.id)} className="h-4 w-4 accent-[#39A900]" />
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold text-[#081B28]">{elemento.id} · {elemento.nombre}</span>
                                        <span className="block text-xs text-[#64748b]">{elemento.estado}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                )}

                {/* Error de validación del formulario */}
                {error && <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">{error}</p>}

                {/* Acciones finales */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" className="w-full sm:w-auto">Registrar traslado</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoTraslado
