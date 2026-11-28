import { ENDPOINTS } from '../../../Core/Config/endpoints'
import { api } from '../../../Core/Config/api'
import { obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

export const obtenerAsignaciones = () => obtenerTodos('/asignaciones')

export const obtenerAsignacion = (id) => obtenerUno(`/asignaciones/${id}`)

export const crearAsignacion = async (asignacion) => {
    const respuesta = await api.post('/asignaciones', asignacion)
    return respuesta.data
}

export const actualizarAsignacion = async (id, asignacion) => {
    const respuesta = await api.put(`/asignaciones/${id}`, asignacion)
    return respuesta.data
}

export const eliminarAsignacion = async (id) => {
    const respuesta = await api.delete(`/asignaciones/${id}`)
    return respuesta.data
}

export const verPdfAsignaciones = async () => {
    const respuesta = await api.get(ENDPOINTS.asignaciones.pdfVer.ruta, { responseType: 'blob' })
    return respuesta.data
}

export const descargarPdfAsignaciones = async () => {
    const respuesta = await api.get(ENDPOINTS.asignaciones.pdfDescargar.ruta, { responseType: 'blob' })
    return respuesta.data
}
