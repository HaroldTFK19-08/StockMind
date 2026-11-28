import { ENDPOINTS } from '../../../Core/Config/endpoints'
import { api } from '../../../Core/Config/api'
import { crearConArchivos } from '../../../Core/Services/apiUtils'

export const iniciarSesion = async (credenciales) => {
    const respuesta = await api.post(ENDPOINTS.auth.iniciarSesion.ruta, credenciales)
    return respuesta.data
}

// Código de activación de 6 dígitos: el backend lo emite cuando el administrador
// aprueba el registro/asigna roles y lo envía por correo (AccesoAprobadoMail).
// Se puede validar antes de iniciar sesión; /auth/login también lo acepta como
// `codigo` y lo consume automáticamente.
export const verificarCodigoAcceso = async ({ email, codigo }) => {
    const respuesta = await api.post(ENDPOINTS.auth.verificarCodigo.ruta, { email, codigo })
    return respuesta.data
}

export const registrarUsuario = (datos) => crearConArchivos(ENDPOINTS.auth.registrar.ruta, {
    ...datos,
    foto_perfil: datos.foto_perfil?.[0] ?? datos.foto_perfil ?? null,
})

export const obtenerUsuarioActual = async () => {
    const respuesta = await api.get(ENDPOINTS.auth.yo.ruta)
    return respuesta.data
}

export const cerrarSesion = async () => {
    const respuesta = await api.post(ENDPOINTS.auth.cerrarSesion.ruta)
    return respuesta.data
}
