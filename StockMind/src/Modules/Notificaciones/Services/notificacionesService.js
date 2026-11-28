import { api } from '../../../Core/Config/api'
import { obtenerTodos } from '../../../Core/Services/apiUtils'

export const obtenerNotificaciones = async () => {
    const notificaciones = await obtenerTodos('/notificaciones')
    return notificaciones.map((notificacion) => ({
        ...notificacion,
        titulo: notificacion.titulo,
        mensaje: notificacion.mensaje,
        fecha: notificacion.created_at,
        leida: Boolean(notificacion.leida),
    }))
}

export const marcarNotificacionLeida = async (id) => {
    const respuesta = await api.patch(`/notificaciones/${id}/leida`)
    return respuesta.data
}

export const marcarTodasNotificacionesLeidas = async () => {
    const respuesta = await api.patch('/notificaciones/leer-todas')
    return respuesta.data
}
