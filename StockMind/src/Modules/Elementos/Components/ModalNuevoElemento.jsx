import { useState } from 'react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import ambientesData from '../../Ambientes/Data/ambientesData'
import { categorias, estadosElemento } from '../Data/inventarioData'

const formularioVacio = { nombre: '', categoria: '', ambienteId: '', placa: '', estado: 'Buen estado' }

const ModalNuevoElemento = ({ abierto, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(formularioVacio)
    const [error, setError] = useState('')

    const cambiarCampo = (evento) => {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
    }

    const cerrar = () => {
        setFormulario(formularioVacio)
        setError('')
        onCerrar()
    }

    const guardar = (evento) => {
        evento.preventDefault()
        if (!formulario.nombre || !formulario.categoria || !formulario.ambienteId || !formulario.placa) {
            return setError('Completa todos los campos')
        }
        onGuardar({ ...formulario, ambienteId: Number(formulario.ambienteId) })
        cerrar()
    }

    return (
        <Modal abierto={abierto} titulo="Agregar elemento" descripcion="Registra un elemento nuevo en el inventario." onCerrar={cerrar}>
            <form onSubmit={guardar} className="grid gap-4 sm:grid-cols-2">
                <Campo etiqueta="Nombre del elemento" htmlFor="nombre" className="sm:col-span-2">
                    <input id="nombre" name="nombre" value={formulario.nombre} onChange={cambiarCampo} placeholder="Ej: Portátil Dell Latitude" className={claseInput} />
                </Campo>
                <Campo etiqueta="Categoría" htmlFor="categoria">
                    <select id="categoria" name="categoria" value={formulario.categoria} onChange={cambiarCampo} className={claseInput}>
                        <option value="">Selecciona</option>
                        {categorias.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </Campo>
                <Campo etiqueta="Placa SENA" htmlFor="placa">
                    <input id="placa" name="placa" value={formulario.placa} onChange={cambiarCampo} placeholder="SENA-CPU-0000" className={claseInput} />
                </Campo>
                <Campo etiqueta="Ambiente" htmlFor="ambienteId">
                    <select id="ambienteId" name="ambienteId" value={formulario.ambienteId} onChange={cambiarCampo} className={claseInput}>
                        <option value="">Selecciona</option>
                        {ambientesData.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                    </select>
                </Campo>
                <Campo etiqueta="Estado" htmlFor="estado">
                    <select id="estado" name="estado" value={formulario.estado} onChange={cambiarCampo} className={claseInput}>
                        {estadosElemento.map((e) => <option key={e}>{e}</option>)}
                    </select>
                </Campo>

                {error && <p className="text-sm text-[#dc2626] sm:col-span-2">{error}</p>}

                <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit">Agregar elemento</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoElemento
