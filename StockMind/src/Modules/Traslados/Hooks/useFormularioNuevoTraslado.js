import { useState } from 'react'

import { mensajeError } from '../../../Core/Services/apiUtils'
import { fechaHoy } from '../../../Shared/Utils/fechas'

const formularioVacio = { origenId: '', destinoId: '', danteaccountId: '', motivo: '' }

const useFormularioNuevoTraslado = ({ ambientes, elementos, danteaccountId, onCerrar, onGuardar }) => {
    const [formulario, setFormulario] = useState(formularioVacio)
    const [seleccionados, setSeleccionados] = useState([])
    const [error, setError] = useState('')
    const [guardando, setGuardando] = useState(false)

    const elementosOrigen = elementos.filter((elemento) => elemento.environment_id === Number(formulario.origenId))
    const origen = ambientes.find((ambiente) => ambiente.id === Number(formulario.origenId))
    const destinos = ambientes.filter((ambiente) => ambiente.id !== Number(formulario.origenId))

    const cambiarCampo = (evento) => {
        const { name, value } = evento.target
        if (name === 'origenId') {
            setSeleccionados([])
            setFormulario((actual) => ({ ...actual, origenId: value, destinoId: '' }))
        } else {
            setFormulario((actual) => ({ ...actual, [name]: value }))
        }
    }

    const alternarElemento = (id) => {
        setSeleccionados((actuales) =>
            actuales.includes(id) ? actuales.filter((seleccionado) => seleccionado !== id) : [...actuales, id],
        )
    }

    const cerrar = () => {
        setFormulario(formularioVacio)
        setSeleccionados([])
        setError('')
        onCerrar()
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        const idCuentaDante = danteaccountId || formulario.danteaccountId
        if (!formulario.origenId || !formulario.destinoId || !idCuentaDante || !formulario.motivo.trim()) {
            setError('Completa origen, destino, ID de cuenta Cuentadante y motivo')
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
                ambiente_origen_id: Number(formulario.origenId),
                ambiente_destino_id: Number(formulario.destinoId),
                danteaccount_id: Number(idCuentaDante),
                motivo: formulario.motivo.trim(),
                fecha_solicitud: fechaHoy(),
                element_ids: seleccionados,
            })
            cerrar()
        } catch (err) {
            setError(mensajeError(err))
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
