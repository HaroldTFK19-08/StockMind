import { api } from '../../../Core/Config/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Sedes -> /v1/sedes
// Campos: trainingcenter_id (centro), nombre, direccion, zona ("urbana" o "rural")
// Cada sede trae además: trainingcenter, warehouses_count y environments_count

export const obtenerSedes = () => obtenerTodos('/sedes')

// El backend todavía no filtra por centro, así que se filtra aquí
export const obtenerSedesDeCentro = async (centroId) => {
    const sedes = await obtenerSedes()
    return sedes.filter((sede) => sede.trainingcenter_id === Number(centroId))
}

export const obtenerSede = (id) => obtenerUno(`/sedes/${id}`)

export const crearSede = async (sede) => {
    const respuesta = await api.post('/sedes', sede)
    return respuesta.data
}

export const actualizarSede = async (id, sede) => {
    const respuesta = await api.put(`/sedes/${id}`, sede)
    return respuesta.data
}

export const eliminarSede = async (id) => {
    const respuesta = await api.delete(`/sedes/${id}`)
    return respuesta.data
}
