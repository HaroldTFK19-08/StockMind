import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Categorías -> /categorias (prefijo /v1 incluido en VITE_API_PROYECT_STOCKMIND).
// Laravel devuelve las categorías paginadas; obtenerTodos recorre todas las páginas.
const servicio = crearServicioCrud(ENDPOINTS.categorias, { parametro: 'categoria' })

export const ObterCategorias = (params) => servicio.listar(params)
export const CrearCategoria = (datos) => servicio.crear(datos)
export const ActualizarCategoria = (id, datos) => servicio.actualizar(id, datos)
export const EliminarCategoria = (id) => servicio.eliminar(id)
