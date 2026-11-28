import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Centros de formación -> /centros (el prefijo /v1 ya está en VITE_API_PROYECT_STOCKMIND).
// Campos: nombre, regional, ciudad, foto_centro (imagen; obligatoria al crear).
// La respuesta del listado NO está paginada en el backend.
const servicio = crearServicioCrud(ENDPOINTS.centros, { parametro: 'centro', archivos: true })

export const obtenerCentros = (params) => servicio.listar(params)
export const obtenerCentro = (id) => servicio.ver(id)
export const crearCentro = (datos) => servicio.crear(datos)
export const actualizarCentro = (id, datos) => servicio.actualizar(id, datos)
export const eliminarCentro = (id) => servicio.eliminar(id)
