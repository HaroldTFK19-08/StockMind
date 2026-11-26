import { useForm } from 'react-hook-form'

const useRegistro = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        }
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

    const registrarUsuario = async (datos) => {
        console.log('Datos del usuario:', datos)
    }

    return {
        register,
        handleSubmit,
        watch,
        registrarUsuario,
        errors,
        isSubmitting
    }
}

export default useRegistro