import { ENDPOINTS, construirRuta } from '../../../Core/Config/endpoints'
import { api } from '../../../Core/Config/api'
import { crearConArchivos, obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

const estadosDesdeApi = {
    pendiente: 'Pendiente',
    en_revision: 'En revisión',
    resuelto: 'Resuelto',
}

const estadosHaciaApi = {
    Pendiente: 'pendiente',
    'En revisión': 'en_revision',
    Resuelto: 'resuelto',
}

// El backend valida los tipos con una cadena codificada "daÃ±o" (mojibake
// presente en el código fuente). Se traduce aquí para no exponer ese detalle
// a los componentes y que el formulario pueda enviar "daño" con normalidad.
const tiposHaciaApi = {
    dano: 'daÃ±o',
    'daño': 'daÃ±o',
    perdida: 'perdida',
    pérdida: 'perdida',
    falla: 'falla',
    otro: 'otro',
}

const tiposDesdeApi = {
    'daÃ±o': 'daño',
    'daño': 'daño',
    perdida: 'pérdida',
    'pérdida': 'pérdida',
    falla: 'falla',
    otro: 'otro',
}

const nombreCompleto = (usuario) => {
    if (!usuario) return 'Sin aprendiz registrado'
    return [usuario.nombre_1, usuario.nombre_2, usuario.apellido_1, usuario.apellido_2]
        .filter(Boolean)
        .join(' ')
}

export const normalizarReporte = (reporte) => {
    const elementos = reporte.elements ?? []
    const principal = elementos[0]

    return {
        ...reporte,
        id: reporte.id,
        numero: `REP-${String(reporte.id).padStart(4, '0')}`,
        elemento: elementos.map((elemento) => elemento.nombre).filter(Boolean).join(', ') || 'Sin elemento',
        placa: principal?.codigo_inventario ?? principal?.serial ?? '—',
        tipoDano: tiposDesdeApi[reporte.tipo] ?? reporte.tipo ?? 'Sin tipo',
        estado: estadosDesdeApi[reporte.estado] ?? reporte.estado,
        fecha: reporte.fecha_reporte,
        aprendiz: nombreCompleto(reporte.apprentice?.user),
        ambienteId: principal?.environment_id ?? null,
        ambiente: principal?.environment?.nombre ?? 'Sin ambiente',
    }
}

export const obtenerReportes = async (params = {}) => {
    const reportes = await obtenerTodos(ENDPOINTS.reportes.listar.ruta, params)
    return reportes.map(normalizarReporte)
}

export const obtenerReporte = async (id) => normalizarReporte(await obtenerUno(
    construirRuta(ENDPOINTS.reportes.ver.ruta, { reporte: id }),
))

export const crearReporte = (datos) => crearConArchivos(ENDPOINTS.reportes.crear.ruta, {
    apprentice_id: datos.apprenticeId,
    tipo: tiposHaciaApi[datos.tipo] ?? datos.tipo,
    descripcion: datos.descripcion,
    fecha_reporte: datos.fecha,
    foto_probatorio: datos.foto,
    element_ids: Array.isArray(datos.elementoId) ? datos.elementoId : [datos.elementoId],
})

// El backend expone PUT (no PATCH) para /reportes/{id}.
export const actualizarReporte = async (id, datos) => {
    const payload = { ...datos }
    if (payload.estado) payload.estado = estadosHaciaApi[payload.estado] ?? payload.estado
    if (payload.tipo) payload.tipo = tiposHaciaApi[payload.tipo] ?? payload.tipo
    if (payload.elementoId) {
        payload.element_ids = Array.isArray(payload.elementoId) ? payload.elementoId : [payload.elementoId]
        delete payload.elementoId
    }
    const respuesta = await api.put(
        construirRuta(ENDPOINTS.reportes.actualizar.ruta, { reporte: id }),
        payload,
    )
    return normalizarReporte(respuesta.data.data ?? respuesta.data)
}

export const actualizarEstadoReporte = (id, estado) => actualizarReporte(id, { estado })

export const eliminarReporte = async (id) => {
    const respuesta = await api.delete(construirRuta(ENDPOINTS.reportes.eliminar.ruta, { reporte: id }))
    return respuesta.data
}

// PDF general: el backend filtra los reportes por rol/alcance con datosParaPdf
// antes de generarlo. No existe PDF por reporte individual.
export const verPdfReportes = async (params = {}) => {
    const respuesta = await api.get(ENDPOINTS.reportes.pdfVer.ruta, {
        params,
        responseType: 'blob',
    })
    return respuesta.data
}

export const descargarPdfReportes = async (params = {}) => {
    const respuesta = await api.get(ENDPOINTS.reportes.pdfDescargar.ruta, {
        params,
        responseType: 'blob',
    })
    return respuesta.data
}
