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
        <Modal abierto={abierto} titulo="Cambiar contraseña" onCerrar={cerrar} ancho="max-w-[520px]">
            {/* Formulario de cambio de contraseña:
                - Campos agrupados en una sección clara.
                - Validación local con mensaje de error visible y sin scroll interno. */}
            <form onSubmit={guardar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Seguridad de la cuenta</h3>
                    <div className="grid gap-4">
                        <Campo etiqueta="Contraseña actual" htmlFor="actual">
                            <input id="actual" name="actual" type="password" value={formulario.actual} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Nueva contraseña" htmlFor="nueva">
                            <input id="nueva" name="nueva" type="password" value={formulario.nueva} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Confirmar nueva contraseña" htmlFor="confirmar" error={error}>
                            <input id="confirmar" name="confirmar" type="password" value={formulario.confirmar} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                    </div>
                </section>

                {/* Acciones del formulario */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" className="w-full sm:w-auto">Guardar contraseña</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalContrasena
