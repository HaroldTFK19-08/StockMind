import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Fichas -> /v1/fichas. Lectura para todos los roles; escritura solo administrador.
const servicio = crearServicioCrud(ENDPOINTS.fichas, { parametro: 'ficha' })

export const obtenerFichas = (params) => servicio.listar(params)
export const obtenerFichasPagina = (params) => servicio.listarPagina(params)
export const obtenerFicha = (id) => servicio.ver(id)
export const crearFicha = (datos) => servicio.crear(datos)
export const actualizarFicha = (id, datos) => servicio.actualizar(id, datos)
export const eliminarFicha = (id) => servicio.eliminar(id)
