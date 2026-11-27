import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import useAuth from './useAuth'

const useRegistro = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
        setError,
        clearErrors,
        reset,
    } = useForm({
        mode: 'onTouched',
        shouldFocusError: false,
        defaultValues: {
            nombre_1: '',
            nombre_2: '',
            apellido_1: '',
            apellido_2: '',
            foto_perfil: null,
            tipo_identidad: 'CC',
            numero_identidad: '',
            telefono: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    })
    const { registrarCuenta } = useAuth()
    const [mensaje, setMensaje] = useState('')

    const registrarUsuario = async (datos) => {
        clearErrors()
        setMensaje('')
        try {
            const respuesta = await registrarCuenta(datos)
            setMensaje(respuesta.mensaje)
            reset()
        } catch (err) {
            const erroresServidor = erroresDeCampos(err)
            Object.entries(erroresServidor).forEach(([campo, mensajeCampo]) => {
                setError(campo, { type: 'server', message: mensajeCampo })
            })
            if (Object.keys(erroresServidor).length === 0) {
                setError('root.server', { type: 'server', message: mensajeError(err) })
            }
        }
    }

    return {
        register,
        handleSubmit,
        watch,
        registrarUsuario,
        mensaje,
        errors,
        isSubmitting
    }
}

export default useRegistro