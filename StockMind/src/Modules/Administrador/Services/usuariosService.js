import { api } from '../../../Core/Config/api'
import { obtenerTodos } from '../../../Core/Services/apiUtils'

export const obtenerUsuarios = () => obtenerTodos('/usuarios')
export const obtenerRoles = () => obtenerTodos('/roles')

export const actualizarUsuario = async (id, datos) => {
    const respuesta = await api.put(`/usuarios/${id}`, datos)
    return respuesta.data
}
