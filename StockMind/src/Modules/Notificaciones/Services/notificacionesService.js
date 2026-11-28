import { ENDPOINTS, construirRuta } from '../../../Core/Config/endpoints'
import { api } from '../../../Core/Config/api'
import { obtenerTodos } from '../../../Core/Services/apiUtils'

// Notificaciones -> /v1/notificaciones (siempre del usuario autenticado).
export const obtenerNotificaciones = async () => {
    const notificaciones = await obtenerTodos(ENDPOINTS.notificaciones.listar.ruta)
    return notificaciones.map((notificacion) => ({
        ...notificacion,
        titulo: notificacion.titulo,
        mensaje: notificacion.mensaje,
        fecha: notificacion.created_at,
        leida: Boolean(notificacion.leida),
    }))
}

// El backend responde { sin_leer: number }.
export const obtenerContadorNotificaciones = async () => {
    const respuesta = await api.get(ENDPOINTS.notificaciones.contador.ruta)
    return respuesta.data?.sin_leer ?? 0
}

export const marcarNotificacionLeida = async (id) => {
    const respuesta = await api.patch(
        construirRuta(ENDPOINTS.notificaciones.marcarLeida.ruta, { notificacion: id }),
    )
    return respuesta.data
}

export const marcarTodasNotificacionesLeidas = async () => {
    const respuesta = await api.patch(ENDPOINTS.notificaciones.marcarTodas.ruta)
    return respuesta.data
}
