import {api} from "../Config/api"

/**
 * Funciones de ayuda para consumir el backend de Laravel.
 *
 * Cómo responde el backend:
 *   - Listar (centros):        [ {...}, {...} ]
 *   - Listar (los demás):      { data: [...], current_page, last_page, total }  (paginado de 10 en 10)
 *   - Ver uno:                 { data: {...} }
 *   - Crear / editar / borrar: { message: "...", data: {...} }
 *   - Error de validación 422: { message: "...", errors: { campo: ["mensaje"] } }
 */

// Trae TODOS los registros de una ruta. Si viene paginada, pide las páginas que falten.
export const obtenerTodos = async (ruta) => {
    const primera = (await api.get(ruta)).data

    // Respuesta sin paginar: ya es la lista completa
    if (Array.isArray(primera)) return primera

    const lista = [...(primera.data ?? [])]
    const ultimaPagina = primera.last_page ?? 1

    for (let pagina = 2; pagina <= ultimaPagina; pagina++) {
        const respuesta = await api.get(ruta, { params: { page: pagina } })
        lista.push(...respuesta.data.data)
    }
    return lista
}

// Trae un solo registro: GET /ruta/id -> { data: {...} }
export const obtenerUno = async (ruta) => {
    const respuesta = await api.get(ruta)
    return respuesta.data.data
}

// Convierte un objeto en FormData (necesario cuando se envía una imagen).
// Los valores null o undefined no se envían.
const aFormData = (datos) => {
    const formulario = new FormData()
    Object.entries(datos).forEach(([campo, valor]) => {
        if (valor !== null && valor !== undefined) formulario.append(campo, valor)
    })
    return formulario
}

// La instancia de axios envía JSON por defecto; para archivos hay que cambiar el Content-Type.
const conArchivos = { headers: { 'Content-Type': 'multipart/form-data' } }

// POST con archivos (crear)
export const crearConArchivos = async (ruta, datos) => {
    const respuesta = await api.post(ruta, aFormData(datos), conArchivos)
    return respuesta.data
}

// PUT con archivos (editar). PHP no lee archivos en un PUT real, por eso
// se envía como POST con _method=PUT y Laravel lo trata como PUT.
export const actualizarConArchivos = async (ruta, datos) => {
    const respuesta = await api.post(ruta, aFormData({ ...datos, _method: 'PUT' }), conArchivos)
    return respuesta.data
}

// Mensaje para mostrarle al usuario cuando una petición falla
export const mensajeError = (error) => {
    if (error.response) {
        if (error.response.status === 404) return 'No se encontró el registro solicitado.'
        if (error.response.status === 429) return 'Se hicieron demasiadas peticiones. Espera un momento e intenta de nuevo.'
        return error.response.data?.message || 'Ocurrió un error inesperado.'
    }
    if (error.request) return 'El servidor no esta disponible. Intenta de nuevo más tarde.'
    return error.message || 'Ocurrió un error inesperado.'
}

// Errores de validación por campo: { nombre: "El nombre es obligatorio." }
export const erroresDeCampos = (error) => {
    const errores = error.response?.data?.errors ?? {}
    const resultado = {}
    Object.entries(errores).forEach(([campo, mensajes]) => {
        resultado[campo] = mensajes[0]
    })
    return resultado
}
