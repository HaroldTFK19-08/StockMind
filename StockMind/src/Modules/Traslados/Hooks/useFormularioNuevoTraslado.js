import { useState } from 'react'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import { fechaHoy } from '../../../Shared/Utils/fechas'

const formularioVacio = (ambienteOrigenId) => ({
    origenId: ambienteOrigenId ? String(ambienteOrigenId) : '',
    destinoId: '',
    motivo: '',
})

const useFormularioNuevoTraslado = ({ ambientes, elementos, danteaccountId, ambienteOrigenId, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(() => formularioVacio(ambienteOrigenId))
    const [seleccionados, setSeleccionados] = useState([])
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    const elementosOrigen = elementos.filter((elemento) =>
        Number(elemento.environment_id) === Number(formulario.origenId)
        && String(elemento.estado).toLowerCase() === 'disponible',
    )
    const origen = ambientes.find((ambiente) => Number(ambiente.id) === Number(formulario.origenId))
    const destinos = ambientes.filter((ambiente) =>
        Number(ambiente.id) !== Number(formulario.origenId)
        && String(ambiente.estado).toLowerCase() === 'activo',
    )

    const cambiarCampo = (evento) => {
        const { name, value } = evento.target
        if (name === 'origenId') {
            setSeleccionados([])
            setFormulario((actual) => ({ ...actual, origenId: value, destinoId: '' }))
        } else {
            setFormulario((actual) => ({ ...actual, [name]: value }))
        }
        setError('')
    }

    const alternarElemento = (id) => {
        const elementoId = Number(id)
        setSeleccionados((actuales) =>
            actuales.includes(elementoId)
                ? actuales.filter((seleccionado) => seleccionado !== elementoId)
                : [...actuales, elementoId],
        )
    }

    const cerrar = () => {
        if (guardando) return
        setFormulario(formularioVacio(ambienteOrigenId))
        setSeleccionados([])
        setError('')
        onCerrar()
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        const origenId = Number(formulario.origenId)
        const destinoId = Number(formulario.destinoId)
        const idCuentaDante = Number(danteaccountId)
        const motivo = formulario.motivo.trim()

        if (!Number.isInteger(idCuentaDante) || idCuentaDante < 1) {
            setError('No tienes una cuenta DANTE activa asociada a tu usuario.')
            return
        }
        if (!Number.isInteger(origenId) || origenId < 1 || !Number.isInteger(destinoId) || destinoId < 1) {
            setError('Selecciona un ambiente de origen y un destino válido.')
            return
        }
        if (origenId === destinoId || !destinos.some((ambiente) => Number(ambiente.id) === destinoId)) {
            setError('Selecciona un ambiente de destino activo y diferente al origen.')
            return
        }
        if (!motivo || motivo.length > 255) {
            setError('El motivo es obligatorio y no debe superar 255 caracteres.')
            return
        }
        if (seleccionados.length === 0) {
            setError('Selecciona los elementos a trasladar')
            return
        }

        setGuardando(true)
        setError('')
        try {
            await onGuardar({
                ambiente_origen_id: origenId,
                ambiente_destino_id: destinoId,
                danteaccount_id: idCuentaDante,
                motivo,
                fecha_solicitud: fechaHoy(),
                element_ids: seleccionados,
            })
            setFormulario(formularioVacio(ambienteOrigenId))
            setSeleccionados([])
            onCerrar()
        } catch (err) {
            const erroresServidor = Object.values(erroresDeCampos(err))
            setError(erroresServidor.length ? erroresServidor.join(' ') : mensajeError(err))
        } finally {
            setGuardando(false)
        }
    }

    return {
        alternarElemento,
        cambiarCampo,
        cerrar,
        destinos,
        elementosOrigen,
        error,
        formulario,
        guardando,
        guardar,
        origen,
        seleccionados,
    }
}

export default useFormularioNuevoTraslado
