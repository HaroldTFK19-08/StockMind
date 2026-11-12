import { useState } from 'react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import { nombreAmbiente } from '../../Ambientes/Data/ambientesData'
import { jornadas, tiposDocumento } from '../Data/asignacionesData'

const formularioVacio = { aprendiz: '', tipoDocumento: 'C.C.', documento: '', jornada: 'Mañana' }

/**
 * Formulario para asignar uno o varios elementos a un aprendiz.
 * disponibles: elementos en buen estado que nadie tiene asignados.
 */
const ModalNuevaAsignacion = ({ abierto, disponibles, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(formularioVacio)
    const [seleccionados, setSeleccionados] = useState([])
    const [error, setError] = useState('')

    const cambiarCampo = (evento) => setFormulario({ ...formulario, [evento.target.name]: evento.target.value })

    // Marca o desmarca un elemento de la lista
    const alternarElemento = (id) => {
        if (seleccionados.includes(id)) {
            setSeleccionados(seleccionados.filter((s) => s !== id))
        } else {
            setSeleccionados([...seleccionados, id])
        }
    }

    const cerrar = () => {
        setFormulario(formularioVacio)
        setSeleccionados([])
        setError('')
        onCerrar()
    }

    const guardar = (evento) => {
        evento.preventDefault()
        if (!formulario.aprendiz.trim() || !formulario.documento.trim()) return setError('Escribe el nombre y el documento del aprendiz')
        if (seleccionados.length === 0) return setError('Selecciona al menos un elemento')

        onGuardar(formulario, seleccionados)
        cerrar()
    }

    return (
        <Modal abierto={abierto} titulo="Nueva asignación" descripcion="Entrega elementos a un aprendiz." onCerrar={cerrar} ancho="max-w-[760px]">
            {/* Formulario principal del modal:
                - Estructura en secciones para lectura clara.
                - Sin contenedores con scroll interno (los elementos se muestran en grilla). */}
            <form onSubmit={guardar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Datos del aprendiz</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Nombre del aprendiz" htmlFor="aprendiz" className="sm:col-span-2">
                            <input id="aprendiz" name="aprendiz" value={formulario.aprendiz} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Tipo de documento" htmlFor="tipoDocumento">
                            <select id="tipoDocumento" name="tipoDocumento" value={formulario.tipoDocumento} onChange={cambiarCampo} className={claseInput}>
                                {tiposDocumento.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Número de documento" htmlFor="documento">
                            <input id="documento" name="documento" inputMode="numeric" value={formulario.documento} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Jornada" htmlFor="jornada" className="sm:col-span-2">
                            <select id="jornada" name="jornada" value={formulario.jornada} onChange={cambiarCampo} className={claseInput}>
                                {jornadas.map((j) => <option key={j}>{j}</option>)}
                            </select>
                        </Campo>
                    </div>
                </section>

                <fieldset className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                    <legend className="px-1 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                        Elementos disponibles ({seleccionados.length} seleccionados)
                    </legend>

                    {/* Lista de elementos sin scroll: se organiza en columnas para aprovechar el espacio */}
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {disponibles.length === 0 && (
                            <p className="rounded-xl border border-dashed border-[#d7e4d8] p-4 text-sm text-[#64748b] sm:col-span-2">
                                No hay elementos disponibles.
                            </p>
                        )}
                        {disponibles.map((elemento) => (
                            <label key={elemento.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#edf2f7] p-3 text-sm transition-colors hover:border-[#dce8dd] hover:bg-[#F7F9F6]">
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(elemento.id)}
                                    onChange={() => alternarElemento(elemento.id)}
                                    className="h-4 w-4 accent-[#39A900]"
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block font-semibold text-[#081B28]">{elemento.id} · {elemento.nombre}</span>
                                    <span className="block text-xs text-[#64748b]">{nombreAmbiente(elemento.ambienteId)}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* Mensaje de validación general del formulario */}
                {error && <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">{error}</p>}

                {/* Acciones finales del formulario */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" className="w-full sm:w-auto">Asignar elementos</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevaAsignacion
