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

    // DEMO (sin backend): el panel se elige por el correo.
    // Importante: esto NO es un control de acceso real. La autorización debe validarse en el backend.
    // Se devuelve solo una ruta interna permitida para evitar redirecciones abiertas.
    const rutasPermitidas = ['/admin/home', '/instructor/home', '/cuentadante/home', '/aprendiz/home']

    const iniciarSesion = async (datos) => {
        const correo = String(datos?.email || '').trim().toLowerCase()

        let ruta = '/aprendiz/home'
        if (correo.startsWith('admin')) ruta = '/admin/home'
        else if (correo.startsWith('instructor')) ruta = '/instructor/home'
        else if (correo.startsWith('cuentadante')) ruta = '/cuentadante/home'

        // Defensa extra: si por error cambia la lógica, solo navegamos a rutas conocidas.
        return rutasPermitidas.includes(ruta) ? ruta : '/aprendiz/home'
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