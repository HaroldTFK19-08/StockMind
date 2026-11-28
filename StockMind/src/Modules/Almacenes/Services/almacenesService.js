import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Almacenes -> /almacenes (el prefijo /v1 ya está en VITE_API_PROYECT_STOCKMIND).
// Campos: headquarter_id (sede), nombre, capacidad_elementos, estado ("activo" o "inactivo").
// Cada almacén trae además: headquarter y elements_count.
const servicio = crearServicioCrud(ENDPOINTS.almacenes, { parametro: 'almacen' })

export const obtenerAlmacenes = () => servicio.listar()

export const obtenerAlmacen = (id) => servicio.ver(id)

// El backend todavía no filtra por sede, así que se filtra aquí.
export const obtenerAlmacenesDeSede = async (sedeId) => {
    const almacenes = await obtenerAlmacenes()
    return almacenes.filter((almacen) => almacen.headquarter_id === Number(sedeId))
}

export const crearAlmacen = (datos) => servicio.crear(datos)
export const actualizarAlmacen = (id, datos) => servicio.actualizar(id, datos)
export const eliminarAlmacen = (id) => servicio.eliminar(id)
