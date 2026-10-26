import { useState } from 'react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'

const formularioVacio = { actual: '', nueva: '', confirmar: '' }

const ModalContrasena = ({ abierto, onCerrar, onGuardada }) => {
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

        if (!formulario.actual) return setError('Escribe tu contraseña actual')
        if (formulario.nueva.length < 8) return setError('La nueva contraseña debe tener al menos 8 caracteres')
        if (formulario.nueva !== formulario.confirmar) return setError('Las contraseñas nuevas no coinciden')

        // TODO: enviar al backend
        cerrar()
        onGuardada()
    }

    return (
        <Modal abierto={abierto} titulo="Cambiar contraseña" onCerrar={cerrar} ancho="max-w-[440px]">
            <form onSubmit={guardar} className="space-y-4">
                <Campo etiqueta="Contraseña actual" htmlFor="actual">
                    <input id="actual" name="actual" type="password" value={formulario.actual} onChange={cambiarCampo} className={claseInput} />
                </Campo>
                <Campo etiqueta="Nueva contraseña" htmlFor="nueva">
                    <input id="nueva" name="nueva" type="password" value={formulario.nueva} onChange={cambiarCampo} className={claseInput} />
                </Campo>
                <Campo etiqueta="Confirmar nueva contraseña" htmlFor="confirmar" error={error}>
                    <input id="confirmar" name="confirmar" type="password" value={formulario.confirmar} onChange={cambiarCampo} className={claseInput} />
                </Campo>
                <div className="flex justify-end gap-2 pt-2">
                    <Boton variante="texto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit">Guardar contraseña</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalContrasena
