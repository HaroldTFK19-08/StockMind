import api from '../../../Core/Services/api'
export const ObterCategorias = async () => {
    const response = await api.get('/categorias')
    return response.data

}
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
