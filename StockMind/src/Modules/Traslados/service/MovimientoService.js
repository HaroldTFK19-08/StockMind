import { api } from '../../../Core/Config/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Movimientos -> /v1/movimientos
// Campos: transfer_id, tipo, motivo, fecha_movimiento y element_ids.
export const obtenerMovimientos = () => obtenerTodos('/movimientos')

export const obtenerMovimiento = (id) => obtenerUno(`/movimientos/${id}`)

export const crearMovimiento = async (movimiento) => {
    const respuesta = await api.post('/movimientos', movimiento)
    return respuesta.data
}

export const actualizarMovimiento = async (id, movimiento) => {
    const respuesta = await api.put(`/movimientos/${id}`, movimiento)
    return respuesta.data
}

export const eliminarMovimiento = async (id) => {
    const respuesta = await api.delete(`/movimientos/${id}`)
    return respuesta.data
}
