import api from '../../../Core/Services/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Almacenes -> /v1/almacenes
// Campos: headquarter_id (sede), nombre, capacidad_elementos, estado ("activo" o "inactivo")
// Cada almacén trae además: headquarter y elements_count

export const obtenerAlmacenes = () => obtenerTodos('/almacenes')

// El backend todavía no filtra por sede, así que se filtra aquí
export const obtenerAlmacenesDeSede = async (sedeId) => {
    const almacenes = await obtenerAlmacenes()
    return almacenes.filter((almacen) => almacen.headquarter_id === Number(sedeId))
}

export const obtenerAlmacen = (id) => obtenerUno(`/almacenes/${id}`)

export const crearAlmacen = async (almacen) => {
    const respuesta = await api.post('/almacenes', almacen)
    return respuesta.data
}

export const actualizarAlmacen = async (id, almacen) => {
    const respuesta = await api.put(`/almacenes/${id}`, almacen)
    return respuesta.data
}

export const eliminarAlmacen = async (id) => {
    const respuesta = await api.delete(`/almacenes/${id}`)
    return respuesta.data
}
