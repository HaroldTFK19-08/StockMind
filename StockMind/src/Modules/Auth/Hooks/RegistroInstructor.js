import { useForm } from 'react-hook-form'

const useRegistroInstructor = () => {
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
            tipo_identificacion: '',
            identificacion: '',
            telefono: '',
            centro_formacion: '',
            email: '',
            password: ''
        }
    })

    const registrarInstructor = async (datos) => {
        console.log('Datos del instructor:', datos)
    }

    return {
        register,
        handleSubmit,
        registrarInstructor,
        errors,
        isSubmitting
    }
}

export default useRegistroInstructor