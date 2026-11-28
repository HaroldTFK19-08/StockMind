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
// Los filtros se conservan en todas las páginas (útil para /consultas/*).
export const obtenerTodos = async (ruta, params = {}) => {
    const primera = (await api.get(ruta, { params })).data
    // Respuesta sin paginar: ya es la lista completa
    if (Array.isArray(primera)) return primera
    const lista = [...(primera.data ?? [])]
    const ultimaPagina = primera.last_page ?? primera.meta?.last_page ?? 1
    for (let pagina = 2; pagina <= ultimaPagina; pagina++) {
        const respuesta = await api.get(ruta, { params: { ...params, page: pagina } })
        lista.push(...(respuesta.data.data ?? []))
    }
    return lista
}

// Devuelve la paginación completa cuando el frontend necesita current_page/total.
export const obtenerPagina = async (ruta, params = {}) => {
    const respuesta = await api.get(ruta, { params })
    return respuesta.data
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
        if (valor === null || valor === undefined) return

        if (Array.isArray(valor)) {
            valor.forEach((elemento) => formulario.append(`${campo}[]`, elemento))
            return
        }

        formulario.append(campo, valor)
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
// Descarga/visualización de PDFs. El backend devuelve Blob, no JSON.
export const obtenerArchivo = async (ruta, params = {}, nombre = 'documento.pdf') => {
    const respuesta = await api.get(ruta, { params, responseType: 'blob' })
    const cabecera = respuesta.headers['content-disposition'] ?? ''
    const coincidencia = cabecera.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)
    return {
        blob: respuesta.data,
        nombre: coincidencia ? decodeURIComponent(coincidencia[1]) : nombre,
    }
}

// Abre un PDF del backend en una pestaña nueva.
export const abrirArchivo = async (ruta, params = {}, nombre = 'documento.pdf') => {
    const { blob } = await obtenerArchivo(ruta, params, nombre)
    const url = URL.createObjectURL(blob)
    const ventana = window.open(url, '_blank')
    if (!ventana) URL.revokeObjectURL(url)
    else ventana.addEventListener('load', () => URL.revokeObjectURL(url), { once: true })
}

// Guarda un PDF del backend en el equipo del usuario.
export const descargarArchivo = async (ruta, params = {}, nombre = 'documento.pdf') => {
    const { blob, nombre: nombreArchivo } = await obtenerArchivo(ruta, params, nombre)
    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = nombreArchivo
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
    URL.revokeObjectURL(url)
}

// Mensaje seguro para mostrar al usuario cuando una petición falla.
// No se exponen detalles internos del cliente/red para evitar filtrar información.
export const mensajeError = (error) => {
    if (error.response) {
        const { status, data } = error.response

        // Mensajes claros para estados comunes sin revelar detalles del servidor.
        if (status === 401) return 'Tu sesión no es válida o ha expirado. Inicia sesión nuevamente.'
        if (status === 403) return 'No tienes permisos para realizar esta acción.'
        if (status === 404) return 'No se encontró el registro solicitado.'
        if (status === 429) return 'Se hicieron demasiadas peticiones. Espera un momento e intenta de nuevo.'
        // Solo mostramos el mensaje enviado por la API (validaciones/reglas de negocio).
        // Para errores 5xx u otros casos, usamos un texto genérico.
        if (status >= 400 && status < 500 && typeof data?.message === 'string' && data.message.trim()) {
            return data.message
        }
        return 'Ocurrió un error inesperado.'
    }
    if (error.request) return 'El servidor no está disponible. Intenta de nuevo más tarde.'
    return 'Ocurrió un error inesperado.'
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
