import { ENDPOINTS, construirRuta } from '../../../Core/Config/endpoints'
import { api } from '../../../Core/Config/api'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'
import { actualizarConArchivos, crearConArchivos, obtenerTodos } from '../../../Core/Services/apiUtils'

// Usuarios -> /v1/usuarios.
// El alta desde administración usa role_ids y foto_perfil (FormData).
// La respuesta de actualizar puede incluir un `token` de activación que el
// administrador debe entregar al usuario.
const servicio = crearServicioCrud(ENDPOINTS.usuarios, {
    parametro: 'usuario',
    preparar: (datos) => ({
        ...datos,
        foto_perfil: datos.foto_perfil?.[0] ?? datos.foto_perfil ?? undefined,
    }),
})

export const obtenerUsuarios = (params) => servicio.listar(params)
export const obtenerUsuariosConPerfiles = () => obtenerTodos(ENDPOINTS.usuarios.perfiles.ruta)
export const obtenerUsuario = (id) => servicio.ver(id)
export const actualizarUsuario = (id, datos) => servicio.actualizar(id, datos)
export const eliminarUsuario = (id) => servicio.eliminar(id)

export const crearUsuario = (datos) => crearConArchivos(ENDPOINTS.usuarios.crear.ruta, {
    ...datos,
    foto_perfil: datos.foto_perfil?.[0] ?? datos.foto_perfil,
    role_ids: datos.role_ids ?? (datos.roles ?? []).map((rol) => Number(rol.id ?? rol)),
})

/** Actualiza el perfil propio (foto y contraseña incluidas). */
export const actualizarMiPerfil = (id, datos) => actualizarConArchivos(
    construirRuta(ENDPOINTS.usuarios.actualizar.ruta, { usuario: id }),
    {
        ...datos,
        foto_perfil: datos.foto_perfil?.[0] ?? datos.foto_perfil ?? undefined,
    },
)

export const desactivarUsuario = async (id) => {
    const respuesta = await api.put(
        construirRuta(ENDPOINTS.usuarios.actualizar.ruta, { usuario: id }),
        { estado: 'Inactivo' },
    )
    return respuesta.data
}
