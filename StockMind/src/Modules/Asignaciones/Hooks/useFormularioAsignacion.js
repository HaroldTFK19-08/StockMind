import { useState } from 'react'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import { fechaHoy } from '../../../Shared/Utils/fechas'

const crearFormulario = (asignacion) => ({
    element_id: asignacion?.elementId ?? '',
    apprentice_id: asignacion?.apprenticeId ?? '',
    teacher_id: asignacion?.teacherId ?? '',
    fecha_asignacion: asignacion?.fecha ?? fechaHoy(),
    fecha_devolucion_esperada: asignacion?.fechaDevolucionEsperada ?? '',
    fecha_devolucion_real: asignacion?.fechaDevolucionReal ?? '',
    estado: asignacion?.estado ?? 'activa',
    observaciones: asignacion?.observaciones ?? '',
})

const useFormularioAsignacion = ({ asignacion, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(() => crearFormulario(asignacion))
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    const cambiarCampo = (evento) => {
        const { name, value } = evento.target
        setFormulario((actual) => ({ ...actual, [name]: value }))
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        const elementId = Number(formulario.element_id)
        const apprenticeId = Number(formulario.apprentice_id)
        const teacherId = Number(formulario.teacher_id)
        const observaciones = formulario.observaciones.trim()

        if (![elementId, apprenticeId, teacherId].every((id) => Number.isInteger(id) && id > 0)) {
            setError('Selecciona un elemento, un aprendiz y un instructor válidos')
            return
        }
        if (!formulario.fecha_devolucion_esperada) {
            setError('La fecha de devolución esperada es obligatoria')
            return
        }
        if (observaciones.length > 255) {
            setError('Las observaciones no pueden superar 255 caracteres')
            return
        }

        setGuardando(true)
        setError('')
        try {
            await onGuardar({
                element_id: elementId,
                apprentice_id: apprenticeId,
                teacher_id: teacherId,
                fecha_asignacion: formulario.fecha_asignacion || undefined,
                fecha_devolucion_esperada: formulario.fecha_devolucion_esperada,
                fecha_devolucion_real: formulario.fecha_devolucion_real || null,
                estado: formulario.estado,
                observaciones: observaciones || null,
            })
            onCerrar()
        } catch (err) {
            const erroresServidor = Object.values(erroresDeCampos(err))
            setError(erroresServidor.length ? erroresServidor.join(' ') : mensajeError(err))
        } finally {
            setGuardando(false)
        }
    }

    return {
        cambiarCampo,
        error,
        formulario,
        guardar,
        guardando,
    }
}

export default useFormularioAsignacion
