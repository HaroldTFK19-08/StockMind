import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Movimientos -> /movimientos (prefijo /v1 incluido en VITE_API_PROYECT_STOCKMIND).
// Campos: transfer_id, tipo, motivo, fecha_movimiento y element_ids[].
// El backend solo expone lectura y alta: el historial no se edita ni se borra.
const servicio = crearServicioCrud(ENDPOINTS.movimientos, { parametro: 'movimiento' })

export const obtenerMovimientos = (params) => servicio.listar(params)
export const obtenerMovimiento = (id) => servicio.ver(id)
export const crearMovimiento = (datos) => servicio.crear(datos)
