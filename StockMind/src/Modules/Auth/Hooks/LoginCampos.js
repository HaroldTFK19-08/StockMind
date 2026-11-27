import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import useAuth from './useAuth'
import { rutaPrincipalUsuario } from '../Utils/roles'

const useLogin = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const { iniciarSesion: autenticar, cerrarSesion, error: errorSesion, limpiarError } = useAuth()
    const [errorGeneral, setErrorGeneral] = useState('')

    const iniciarSesion = async (credenciales) => {
        clearErrors()
        limpiarError()
        setErrorGeneral('')

        try {
            const usuario = await autenticar(credenciales)
            const ruta = rutaPrincipalUsuario(usuario)
            if (!ruta) {
                await cerrarSesion()
                setErrorGeneral('Tu cuenta no tiene un rol habilitado para acceder a la plataforma.')
                return null
            }
            return ruta
        } catch (err) {
            const erroresServidor = erroresDeCampos(err)
            Object.entries(erroresServidor).forEach(([campo, mensaje]) => {
                setError(campo, { type: 'server', message: mensaje })
            })
            if (Object.keys(erroresServidor).length === 0) {
                const mensajeServidor = err.response?.status === 403
                    ? err.response.data?.message
                    : null
                setErrorGeneral(
                    typeof mensajeServidor === 'string' && mensajeServidor.trim()
                        ? mensajeServidor
                        : mensajeError(err),
                )
            }
            return null
        }
    }

    return {
        register,
        handleSubmit,
        iniciarSesion,
        errors,
        error: errorGeneral || errorSesion,
        isSubmitting,
    }
}

export default useLogin
