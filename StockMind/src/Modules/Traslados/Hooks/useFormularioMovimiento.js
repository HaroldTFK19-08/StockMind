import { useState } from 'react'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import { fechaHoy } from '../../../Shared/Utils/fechas'
import { tiposMovimiento } from '../Data/movimientosData'

const crearFormulario = (movimiento) => ({
    tipo: movimiento?.tipo ?? tiposMovimiento[0],
    motivo: movimiento?.motivo ?? '',
    fecha_movimiento: movimiento?.fecha ?? fechaHoy(),
    transfer_id: movimiento?.tipo === 'traslado' ? movimiento.transferId ?? '' : '',
    element_ids: movimiento?.elementIds ?? [],
})

const useFormularioMovimiento = ({ movimiento, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(() => crearFormulario(movimiento))
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    const cambiarCampo = (evento) => {
        const { name, value } = evento.target
        setFormulario((actual) => {
            if (name === 'tipo' && value !== 'traslado') {
                return { ...actual, tipo: value, transfer_id: '' }
            }
            return { ...actual, [name]: value }
        })
    }

    const alternarElemento = (id) => {
        setFormulario((actual) => ({
            ...actual,
            element_ids: actual.element_ids.includes(id)
                ? actual.element_ids.filter((elementoId) => elementoId !== id)
                : [...actual.element_ids, id],
        }))
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        const motivo = formulario.motivo.trim()
        const transferId = formulario.transfer_id === '' ? null : Number(formulario.transfer_id)

        if (!tiposMovimiento.includes(formulario.tipo)) {
            setError('Selecciona un tipo de movimiento válido')
            return
        }
        if (!motivo || motivo.length > 255) {
            setError('El motivo es obligatorio y no debe superar 255 caracteres')
            return
        }
        if (formulario.element_ids.length === 0) {
            setError('Selecciona al menos un elemento')
            return
        }
        if (formulario.tipo === 'traslado' && transferId === null) {
            setError('Un movimiento de tipo traslado debe estar asociado a un traslado')
            return
        }
        if (formulario.tipo !== 'traslado' && transferId !== null) {
            setError('Solo los movimientos de tipo traslado pueden asociarse a un traslado')
            return
        }
        if (transferId !== null && (!Number.isInteger(transferId) || transferId < 1)) {
            setError('El ID del traslado debe ser un entero positivo')
            return
        }

        setGuardando(true)
        setError('')
        try {
            await onGuardar({
                tipo: formulario.tipo,
                motivo,
                fecha_movimiento: formulario.fecha_movimiento || undefined,
                element_ids: formulario.element_ids,
                ...(transferId === null ? {} : { transfer_id: transferId }),
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
        alternarElemento,
        cambiarCampo,
        error,
        formulario,
        guardar,
        guardando,
    }
}

export default useFormularioMovimiento
