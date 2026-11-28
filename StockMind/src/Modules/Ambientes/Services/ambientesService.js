import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Ambientes -> /ambientes (el prefijo /v1 ya está en VITE_API_PROYECT_STOCKMIND).
// Campos: headquarter_id (sede), nombre, capacidad, tipo, estado ("activo" o "inactivo")
//         teacher_id (instructor responsable, opcional), cuentadante_ids[] / cuentadante_id (opcional)
// Cada ambiente trae además: headquarter, teacher, cuentadantes vigentes y conteos.
const servicio = crearServicioCrud(ENDPOINTS.ambientes, { parametro: 'ambiente' })

export const obtenerAmbientes = (params) => servicio.listar(params)

// El backend todavía no filtra por sede, así que se filtra aquí.
export const obtenerAmbientesDeSede = async (sedeId) => {
    const ambientes = await obtenerAmbientes()
    return ambientes.filter((ambiente) => ambiente.headquarter_id === Number(sedeId))
}

export const obtenerAmbiente = (id) => servicio.ver(id)
export const crearAmbiente = (datos) => servicio.crear(datos)
export const actualizarAmbiente = (id, datos) => servicio.actualizar(id, datos)
export const eliminarAmbiente = (id) => servicio.eliminar(id)
