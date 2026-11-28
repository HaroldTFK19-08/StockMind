import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Traslados -> /traslados (prefijo /v1 incluido en VITE_API_PROYECT_STOCKMIND).
// Campos: ambiente_origen_id, ambiente_destino_id, danteaccount_id, motivo,
//         fecha_solicitud, fecha_traslado, estado y element_ids[].
// El backend implementa la máquina de estados (pendiente → aprobado → completado).
const servicio = crearServicioCrud(ENDPOINTS.traslados, { parametro: 'traslado' })

export const obtenerTraslados = (params) => servicio.listar(params)
export const obtenerTraslado = (id) => servicio.ver(id)
export const crearTraslado = (datos) => servicio.crear(datos)
export const actualizarTraslado = (id, datos) => servicio.actualizar(id, datos)
export const eliminarTraslado = (id) => servicio.eliminar(id)
