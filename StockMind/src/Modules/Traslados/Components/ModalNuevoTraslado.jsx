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
        <Modal abierto={abierto} titulo="Nuevo traslado" descripcion="Mueve elementos de un ambiente a otro lugar." onCerrar={cerrar} ancho="max-w-[640px]">
            <form onSubmit={guardar} className="space-y-5">
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

                {formulario.origenId && (
                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold text-[#081B28]">Elementos de {origen.nombre} ({seleccionados.length} seleccionados)</legend>
                        <div className="max-h-56 space-y-2 overflow-y-auto rounded-[14px] border-2 border-[#edf2f7] p-2">
                            {elementosOrigen.length === 0 && <p className="p-3 text-sm text-[#64748b]">Este ambiente no tiene elementos.</p>}
                            {elementosOrigen.map((elemento) => (
                                <label key={elemento.id} className="flex cursor-pointer items-center gap-3 rounded-[10px] p-2 text-sm hover:bg-[#F7F9F6]">
                                    <input type="checkbox" checked={seleccionados.includes(elemento.id)} onChange={() => alternarElemento(elemento.id)} className="h-4 w-4 accent-[#39A900]" />
                                    <span className="font-semibold text-[#081B28]">{elemento.id} · {elemento.nombre}</span>
                                    <span className="ml-auto text-[#64748b]">{elemento.estado}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                )}

                {error && <p className="text-sm text-[#dc2626]">{error}</p>}

                <div className="flex justify-end gap-2">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit">Registrar traslado</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoTraslado
