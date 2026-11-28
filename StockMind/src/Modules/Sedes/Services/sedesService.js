import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Sedes -> /sedes (el prefijo /v1 ya está en VITE_API_PROYECT_STOCKMIND).
// Campos: trainingcenter_id (centro), nombre, direccion, zona ("urbana" o "rural").
// Cada sede trae además: trainingcenter, warehouses_count y environments_count.
const servicio = crearServicioCrud(ENDPOINTS.sedes, { parametro: 'sede' })

export const obtenerSedes = (params) => servicio.listar(params)

// El backend todavía no filtra por centro, así que se filtra aquí.
export const obtenerSedesDeCentro = async (centroId) => {
    const sedes = await obtenerSedes()
    return sedes.filter((sede) => sede.trainingcenter_id === Number(centroId))
}

export const obtenerSede = (id) => servicio.ver(id)
export const crearSede = (datos) => servicio.crear(datos)
export const actualizarSede = (id, datos) => servicio.actualizar(id, datos)
export const eliminarSede = (id) => servicio.eliminar(id)
