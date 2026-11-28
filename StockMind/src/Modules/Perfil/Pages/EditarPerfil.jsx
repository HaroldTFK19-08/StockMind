import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { mensajeError } from '../../../Core/Services/apiUtils'

import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario, actualizarUsuario } from '../../Administrador/Services/usuariosService'

const campos = [
    { nombre: 'nombres', etiqueta: 'Nombres', tipo: 'text' },
    { nombre: 'apellidos', etiqueta: 'Apellidos', tipo: 'text' },
    { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'tel' },
    { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' },
]

const formularioDeUsuario = (usuario) => ({
    nombres: [usuario?.nombre_1, usuario?.nombre_2].filter(Boolean).join(' '),
    apellidos: [usuario?.apellido_1, usuario?.apellido_2].filter(Boolean).join(' '),
    telefono: usuario?.telefono ?? '',
    correo: usuario?.email ?? '',
})

const EditarPerfil = ({ rutaPerfil }) => {
    const { usuario: sesion, actualizarUsuarioSesion } = useAuth()
    const { datos: usuario, cargando, error } = useCarga(
        () => sesion?.id ? obtenerUsuario(sesion.id) : Promise.resolve(null),
        sesion?.id ?? ''
    )
    const [formularioEditado, setFormularioEditado] = useState(null)
    const [errores, setErrores] = useState({})
    const [errorApi, setErrorApi] = useState('')
    const [guardado, setGuardado] = useState(false)
    const [guardando, setGuardando] = useState(false)

    const formulario = formularioEditado ?? formularioDeUsuario(usuario)

    const cambiarCampo = (evento) => {
        setFormularioEditado((actual) => ({
            ...(actual ?? formularioDeUsuario(usuario)),
            [evento.target.name]: evento.target.value,
        }))
        setGuardado(false)
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        setErrorApi('')

        const nuevosErrores = {}
        campos.forEach((campo) => {
            if (!formulario[campo.nombre].trim()) nuevosErrores[campo.nombre] = 'Este campo es obligatorio'
        })
        if (formulario.correo && !formulario.correo.includes('@')) {
            nuevosErrores.correo = 'Escribe un correo válido'
        }

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        const nombres = formulario.nombres.trim().split(/\s+/)
        const apellidos = formulario.apellidos.trim().split(/\s+/)
        const datos = {
            nombre_1: nombres.shift(),
            apellido_1: apellidos.shift(),
            telefono: formulario.telefono.trim(),
            email: formulario.correo.trim(),
        }
        if (nombres.length) datos.nombre_2 = nombres.join(' ')
        if (apellidos.length) datos.apellido_2 = apellidos.join(' ')

        setGuardando(true)
        try {
            await actualizarUsuario(usuario.id, datos)
            actualizarUsuarioSesion(datos)
            setGuardado(true)
        } catch (errorPeticion) {
            setErrorApi(mensajeError(errorPeticion))
        } finally {
            setGuardando(false)
        }
    }

    if (cargando) return <p className="py-8 text-center text-sm text-[#64748b]">Cargando tus datos...</p>
    if (error) return <MensajeError>{error}</MensajeError>
    if (!usuario) return <MensajeError>No se encontró la información del usuario.</MensajeError>

    return (
        <section className="mx-auto max-w-[720px]">
            <Boton to={rutaPerfil} variante="texto" icono={ArrowLeft} className="mb-4 px-0">
                Volver al perfil
            </Boton>

            {guardado && <MensajeExito>Tus datos se guardaron correctamente</MensajeExito>}
            {errorApi && <MensajeError>{errorApi}</MensajeError>}

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
                        <Boton type="submit" disabled={guardando} icono={Save}>
                            {guardando ? 'Guardando...' : 'Guardar cambios'}
                        </Boton>
                    </div>
                </form>
            </Tarjeta>
        </section>
    )
}

export default EditarPerfil
