import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Roles -> /v1/roles. Solo administrador (GET/POST/PUT/DELETE).
const servicio = crearServicioCrud(ENDPOINTS.roles, { parametro: 'role' })

export const obtenerRoles = (params) => servicio.listar(params)
export const obtenerRol = (id) => servicio.ver(id)
export const crearRol = (datos) => servicio.crear(datos)
export const actualizarRol = (id, datos) => servicio.actualizar(id, datos)
export const eliminarRol = (id) => servicio.eliminar(id)
