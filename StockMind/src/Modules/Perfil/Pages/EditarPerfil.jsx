import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'

// Campos que el usuario puede editar
const campos = [
    { nombre: 'nombres', etiqueta: 'Nombres', tipo: 'text' },
    { nombre: 'apellidos', etiqueta: 'Apellidos', tipo: 'text' },
    { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel' },
    { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' },
]

/**
 * <EditarPerfil usuario={perfilAprendiz} rutaPerfil="/aprendiz/perfil" />
 */
const EditarPerfil = ({ usuario, rutaPerfil }) => {
    const [formulario, setFormulario] = useState({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        telefono: usuario.telefono,
        correo: usuario.correo,
    })
    const [errores, setErrores] = useState({})
    const [guardado, setGuardado] = useState(false)

    const cambiarCampo = (evento) => {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
        setGuardado(false)
    }

    const guardar = (evento) => {
        evento.preventDefault()

        // Validación sencilla: ningún campo vacío y correo con @
        const nuevosErrores = {}
        campos.forEach((campo) => {
            if (!formulario[campo.nombre].trim()) nuevosErrores[campo.nombre] = 'Este campo es obligatorio'
        })
        if (formulario.correo && !formulario.correo.includes('@')) {
            nuevosErrores.correo = 'Escribe un correo válido'
        }

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        // TODO: enviar al backend
        console.log('Datos actualizados:', formulario)
        setGuardado(true)
    }

    return (
        <section className="mx-auto max-w-[720px]">
            <Boton to={rutaPerfil} variante="texto" icono={ArrowLeft} className="mb-4 px-0">
                Volver al perfil
            </Boton>

            {guardado && <MensajeExito>Tus datos se guardaron correctamente</MensajeExito>}

            <Tarjeta titulo="Información personal">
                <p className="-mt-3 mb-6 text-sm text-[#64748b]">
                    Actualiza tus nombres y datos de contacto. El documento y el rol solo los puede cambiar un administrador.
                </p>

                <form onSubmit={guardar} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {campos.map((campo) => (
                            <Campo key={campo.nombre} etiqueta={campo.etiqueta} htmlFor={campo.nombre} error={errores[campo.nombre]}>
                                <input
                                    id={campo.nombre}
                                    name={campo.nombre}
                                    type={campo.tipo}
                                    value={formulario[campo.nombre]}
                                    onChange={cambiarCampo}
                                    className={claseInput}
                                />
                            </Campo>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#f1f5f9] pt-6 sm:flex-row sm:justify-end">
                        <Boton to={rutaPerfil} variante="texto">Cancelar</Boton>
                        <Boton type="submit" icono={Save}>Guardar cambios</Boton>
                    </div>
                </form>
            </Tarjeta>
        </section>
    )
}

export default EditarPerfil
