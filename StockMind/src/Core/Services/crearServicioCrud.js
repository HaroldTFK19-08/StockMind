import { api } from '../Config/api'
import { construirRuta } from '../Config/endpoints'
import {
    actualizarConArchivos,
    crearConArchivos,
    obtenerTodos,
    obtenerUno,
} from './apiUtils'

/**
 * Construye un servicio REST a partir de un bloque de ENDPOINTS.
 * Así la ruta, el verbo y el rol viven solo en endpoints.js.
 *
 * @param {object} rutas           Bloque correspondiente de ENDPOINTS.
 * @param {object} opciones
 * @param {string} opciones.parametro   Nombre del parámetro de ruta (ej. 'elemento').
 * @param {boolean} opciones.archivos   Envía FormData en crear/actualizar.
 * @param {Function} opciones.normalizar  Normaliza cada registro devuelto.
 * @param {Function} opciones.preparar    Transforma el payload antes de enviarlo.
 */
export const crearServicioCrud = (rutas, opciones = {}) => {
    const {
        parametro,
        archivos = false,
        normalizar = (registro) => registro,
        preparar = (datos) => datos,
    } = opciones

    const rutaDe = (definicion, id) => construirRuta(definicion.ruta, { [parametro]: id })
    // Se conserva el cuerpo completo del backend ({ message, data }) para no romper
    // el contrato que ya usan los hooks de los módulos existentes.
    const respuesta = (promesa) => promesa.then((respuestaApi) => respuestaApi.data)

    const servicio = {}

    if (rutas.listar) {
        servicio.listar = async (params = {}) => {
            const registros = await obtenerTodos(rutas.listar.ruta, params)
            return registros.map(normalizar)
        }
        servicio.listarPagina = async (params = {}) => {
            const respuestaApi = await api.get(rutas.listar.ruta, { params })
            const pagina = respuestaApi.data
            if (Array.isArray(pagina)) return { data: pagina.map(normalizar), total: pagina.length }
            return {
                ...pagina,
                data: (pagina.data ?? []).map(normalizar),
            }
        }
    }

    if (rutas.ver) {
        servicio.ver = async (id) => normalizar(await obtenerUno(rutaDe(rutas.ver, id)))
    }

    if (rutas.crear) {
        servicio.crear = (datos) => {
            const payload = preparar(datos)
            return respuesta(archivos
                ? crearConArchivos(rutas.crear.ruta, payload)
                : api.post(rutas.crear.ruta, payload))
        }
    }

    if (rutas.actualizar) {
        servicio.actualizar = (id, datos) => {
            const payload = preparar(datos)
            return respuesta(archivos
                ? actualizarConArchivos(rutaDe(rutas.actualizar, id), payload)
                : api.put(rutaDe(rutas.actualizar, id), payload))
        }
    }

    if (rutas.eliminar) {
        servicio.eliminar = async (id) => {
            const respuestaApi = await api.delete(rutaDe(rutas.eliminar, id))
            return respuestaApi.data
        }
    }

    return servicio
}

export default crearServicioCrud
