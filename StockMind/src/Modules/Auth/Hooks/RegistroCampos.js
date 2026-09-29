import { useForm } from 'react-hook-form'

const useRegistroAprendiz = () => {
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
            nombre_1: '',
            nombre_2: '',
            apellido_1: '',
            apellido_2: '',
            tipo_identificacion: 'C.C.',
            identificacion: '',
            telefono: '',
            centro_formacion: '',
            email: '',
            password: ''
        }
    })

    const registrarAprendiz = async (datos) => {
        console.log('Datos del aprendiz:', datos)
    }

    return {
        register,
        handleSubmit,
        registrarAprendiz,
        errors,
        isSubmitting
    }
}

export default useRegistroAprendiz