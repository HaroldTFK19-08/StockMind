import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useReportarDano = ({ elementoInicial = '' } = {}) => {
    const [reporteEnviado, setReporteEnviado] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            elementoId: elementoInicial,
            tipoDano: '',
            descripcion: '',
        },
    })

    const enviarReporte = async (datos) => {
        // TODO: reemplazar por la llamada al backend (Services)
        await new Promise((resolver) => setTimeout(resolver, 700))
        const numero = `REP-${String(Math.floor(Math.random() * 900) + 100).padStart(4, '0')}`
        console.log('Reporte de daño:', { numero, ...datos })
        setReporteEnviado({ numero, ...datos })
    }

    const nuevoReporte = () => {
        reset({ elementoId: '', tipoDano: '', descripcion: '' })
        setReporteEnviado(null)
    }

    return {
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
        isSubmitting,
        enviarReporte,
        reporteEnviado,
        nuevoReporte,
    }
}

export default useReportarDano
