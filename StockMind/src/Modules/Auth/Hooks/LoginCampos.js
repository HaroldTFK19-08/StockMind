import { useForm } from 'react-hook-form'

const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const iniciarSesion = async (datos) => {
        console.log('Datos de login:', datos)
    }

    return {
        register,
        handleSubmit,
        iniciarSesion,
        errors,
        isSubmitting
    }
}

export default useLogin