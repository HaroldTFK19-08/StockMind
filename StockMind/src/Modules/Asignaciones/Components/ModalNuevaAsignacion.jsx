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
        <Modal abierto={abierto} titulo="Nueva asignación" descripcion="Entrega elementos a un aprendiz." onCerrar={cerrar} ancho="max-w-[640px]">
            <form onSubmit={guardar} className="space-y-5">
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
                    <Campo etiqueta="Jornada" htmlFor="jornada">
                        <select id="jornada" name="jornada" value={formulario.jornada} onChange={cambiarCampo} className={claseInput}>
                            {jornadas.map((j) => <option key={j}>{j}</option>)}
                        </select>
                    </Campo>
                </div>

                <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-[#081B28]">
                        Elementos disponibles ({seleccionados.length} seleccionados)
                    </legend>
                    <div className="max-h-56 space-y-2 overflow-y-auto rounded-[14px] border-2 border-[#edf2f7] p-2">
                        {disponibles.length === 0 && <p className="p-3 text-sm text-[#64748b]">No hay elementos disponibles.</p>}
                        {disponibles.map((elemento) => (
                            <label key={elemento.id} className="flex cursor-pointer items-center gap-3 rounded-[10px] p-2 text-sm hover:bg-[#F7F9F6]">
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(elemento.id)}
                                    onChange={() => alternarElemento(elemento.id)}
                                    className="h-4 w-4 accent-[#39A900]"
                                />
                                <span className="font-semibold text-[#081B28]">{elemento.id} · {elemento.nombre}</span>
                                <span className="ml-auto text-[#64748b]">{nombreAmbiente(elemento.ambienteId)}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {error && <p className="text-sm text-[#dc2626]">{error}</p>}

                <div className="flex justify-end gap-2">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit">Asignar elementos</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevaAsignacion
