import { api } from '../../../Core/Config/api'
import { crearConArchivos } from '../../../Core/Services/apiUtils'

export const iniciarSesion = async (credenciales) => {
    const respuesta = await api.post('/auth/login', credenciales)
    return respuesta.data
}

export const registrarUsuario = (datos) => crearConArchivos('/auth/register', {
    ...datos,
    foto_perfil: datos.foto_perfil?.[0] ?? null,
})

export const obtenerUsuarioActual = async () => {
    const respuesta = await api.get('/auth/me')
    return respuesta.data
}

export const cerrarSesion = async () => {
    const respuesta = await api.post('/auth/logout')
    return respuesta.data
}
