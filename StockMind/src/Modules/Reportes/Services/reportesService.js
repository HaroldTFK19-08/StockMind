import { api } from '../../../Core/Config/api'
import { crearConArchivos, obtenerTodos } from '../../../Core/Services/apiUtils'

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
        tipoDano: reporte.tipo ?? 'Sin tipo',
        estado: estadosDesdeApi[reporte.estado] ?? reporte.estado,
        fecha: reporte.fecha_reporte,
        aprendiz: nombreCompleto(reporte.apprentice?.user),
        ambienteId: principal?.environment_id ?? null,
        ambiente: principal?.environment?.nombre ?? 'Sin ambiente',
    }
}

export const obtenerReportes = async () => {
    const reportes = await obtenerTodos('/reportes')
    return reportes.map(normalizarReporte)
}

export const crearReporte = (datos) => crearConArchivos('/reportes', {
    apprentice_id: datos.apprenticeId,
    tipo: datos.tipo,
    descripcion: datos.descripcion,
    fecha_reporte: datos.fecha,
    foto_probatorio: datos.foto,
    element_ids: [datos.elementoId],
})

export const actualizarEstadoReporte = async (id, estado) => {
    const estadoApi = estadosHaciaApi[estado]
    if (!estadoApi) throw new Error(`Estado de reporte no soportado: ${estado}`)

    const respuesta = await api.patch(`/reportes/${id}`, { estado: estadoApi })
    return normalizarReporte(respuesta.data.data)
}
