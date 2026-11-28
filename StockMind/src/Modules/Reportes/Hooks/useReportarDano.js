import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mensajeError } from '../../../Core/Services/apiUtils'
import { crearReporte } from '../Services/reportesService'

// Lógica del formulario "Reportar daño" (aprendiz), con react-hook-form
const useReportarDano = (elementoInicial = '', apprenticeId) => {
    const [reporteEnviado, setReporteEnviado] = useState(null)
    const [errorEnvio, setErrorEnvio] = useState('')

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
        setErrorEnvio('')
        if (!apprenticeId) {
            setErrorEnvio('No se encontró el perfil de aprendiz asociado a tu usuario.')
            return
        }

        try {
            const tipo = datos.tipoDano === 'Otro'
                ? 'otro'
                : datos.tipoDano.startsWith('Daño físico')
                    ? 'daño'
                    : 'falla'
            const respuesta = await crearReporte({
                apprenticeId,
                elementoId: Number(datos.elementoId),
                tipo,
                descripcion: `${datos.tipoDano}: ${datos.descripcion.trim()}`,
                foto: datos.foto_probatorio?.[0],
                fecha: new Date().toISOString().slice(0, 10),
            })
            const reporte = respuesta.data ?? respuesta
            setReporteEnviado({
                numero: `REP-${String(reporte.id).padStart(4, '0')}`,
            })
        } catch (error) {
            setErrorEnvio(mensajeError(error))
        }
    }

    const nuevoReporte = () => {
        reset({ elementoId: '', tipoDano: '', descripcion: '', foto_probatorio: null })
        setReporteEnviado(null)
        setErrorEnvio('')
    }

    return { register, handleSubmit, watch, errors, isSubmitting, enviarReporte, reporteEnviado, nuevoReporte, errorEnvio }
}

export default useReportarDano
