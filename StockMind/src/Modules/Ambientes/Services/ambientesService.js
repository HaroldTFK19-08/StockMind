import api from '../../../Core/Services/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Ambientes -> /v1/ambientes
// Campos: headquarter_id (sede), nombre, capacidad, tipo, estado ("activo" o "inactivo")
//         teacher_id (instructor responsable, opcional)
// Cada ambiente trae además: headquarter, teacher, elements_count y danteaccounts_count

export const obtenerAmbientes = () => obtenerTodos('/ambientes')

// El backend todavía no filtra por sede, así que se filtra aquí
export const obtenerAmbientesDeSede = async (sedeId) => {
    const ambientes = await obtenerAmbientes()
    return ambientes.filter((ambiente) => ambiente.headquarter_id === Number(sedeId))
}

export const obtenerAmbiente = (id) => obtenerUno(`/ambientes/${id}`)

export const crearAmbiente = async (ambiente) => {
    const respuesta = await api.post('/ambientes', ambiente)
    return respuesta.data
}

export const actualizarAmbiente = async (id, ambiente) => {
    const respuesta = await api.put(`/ambientes/${id}`, ambiente)
    return respuesta.data
}

export const eliminarAmbiente = async (id) => {
    const respuesta = await api.delete(`/ambientes/${id}`)
    return respuesta.data
}
