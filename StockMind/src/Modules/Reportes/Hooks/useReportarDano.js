import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Lógica del formulario "Reportar daño" (aprendiz), con react-hook-form
const useReportarDano = (elementoInicial = '') => {
    const [reporteEnviado, setReporteEnviado] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: { elementoId: elementoInicial, tipoDano: '', descripcion: '' },
    })

    const enviarReporte = async (datos) => {
        // TODO: reemplazar por la llamada al backend
        await new Promise((resolver) => setTimeout(resolver, 700))
        const numero = `REP-${String(Math.floor(Math.random() * 900) + 100).padStart(4, '0')}`
        setReporteEnviado({ numero, ...datos })
    }

    const nuevoReporte = () => {
        reset({ elementoId: '', tipoDano: '', descripcion: '' })
        setReporteEnviado(null)
    }

    return { register, handleSubmit, watch, errors, isSubmitting, enviarReporte, reporteEnviado, nuevoReporte }
}

export default useReportarDano
