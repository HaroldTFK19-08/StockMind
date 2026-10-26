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

    // Mientras no haya backend, el panel se elige por el correo:
    // admin@... -> Administrador, instructor@... -> Instructor,
    // cuentadante@... -> Cuentadante, cualquier otro -> Aprendiz
    const iniciarSesion = async (datos) => {
        const correo = datos.email.toLowerCase()

        if (correo.startsWith('admin')) return '/admin/home'
        if (correo.startsWith('instructor')) return '/instructor/home'
        if (correo.startsWith('cuentadante')) return '/cuentadante/home'
        return '/aprendiz/home'
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