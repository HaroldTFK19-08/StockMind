import { api } from '../../../Core/Config/api'
import { obtenerTodos } from '../../../Core/Services/apiUtils'

// Laravel devuelve las categorías paginadas ({ data: [...] }); obtenerTodos devuelve la lista completa
export const ObterCategorias = () => obtenerTodos('/categorias')

export const CrearCategoria = async (categoria) => {
    const response = await api.post('/categorias', categoria)
    return response.data
}
export const ActualizarCategoria = async (id, categoria) => {
    const response = await api.put(`/categorias/${id}`, categoria)
    return response.data
}
export const EliminarCategoria = async (id) => {
    const response = await api.delete(`/categorias/${id}`)
    return response.data
}
