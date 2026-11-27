import { api } from '../../../Core/Config/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Traslados -> /v1/traslados
// Campos: ambiente_origen_id, ambiente_destino_id, danteaccount_id, motivo,
//         fecha_solicitud, fecha_traslado, estado y element_ids.

export const obtenerTraslados = () => obtenerTodos('/traslados')

export const obtenerTraslado = (id) => obtenerUno(`/traslados/${id}`)

export const crearTraslado = async (traslado) => {
    const respuesta = await api.post('/traslados', traslado)
    return respuesta.data
}

export const actualizarTraslado = async (id, traslado) => {
    const respuesta = await api.put(`/traslados/${id}`, traslado)
    return respuesta.data
}

export const eliminarTraslado = async (id) => {
    const respuesta = await api.delete(`/traslados/${id}`)
    return respuesta.data
}
