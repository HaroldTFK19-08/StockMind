import { api } from '../../../Core/Config/api'
import { actualizarConArchivos, crearConArchivos, obtenerTodos, obtenerUno } from '../../../Core/Services/apiUtils'

// Elementos del inventario -> /v1/elementos
// Campos: category_id, environment_id (ambiente) o warehouse_id (almacén), codigo_inventario,
//         nombre, img_elemento (imagen; obligatoria al crear), descripcion, serial, marca, modelo,
//         estado y condicion (ver Data/opcionesElemento.js)
// Cada elemento trae además: category, environment y warehouse

export const obtenerElementos = () => obtenerTodos('/elementos')

export const obtenerMisElementos = async () => {
    const respuesta = await api.get('/consultas/mis-solicitudes', { params: { per_page: 100 } })
    const solicitudes = respuesta.data.data ?? respuesta.data
    const filas = (pagina) => Array.isArray(pagina) ? pagina : pagina?.data ?? []
    const asignaciones = filas(solicitudes.asignaciones)
    const prestamos = filas(solicitudes.prestamos)
    const activas = [...asignaciones, ...prestamos].filter((solicitud) => !solicitud.fecha_devolucion_real)
    const fechaPorElemento = new Map(activas.map((solicitud) => [
        Number(solicitud.element_id),
        solicitud.fecha_asignacion ?? solicitud.fecha_prestamo,
    ]))
    const idsAsignados = new Set(fechaPorElemento.keys())
    const inventario = await obtenerElementos()

    return inventario
        .filter((elemento) => idsAsignados.has(Number(elemento.id)))
        .map((elemento) => {
            const condicion = String(elemento.condicion ?? elemento.estado ?? '').toLowerCase()
            let estado = elemento.condicion ?? elemento.estado ?? 'Estado desconocido'
            if (condicion.includes('bueno') || condicion.includes('disponible')) estado = 'Buen estado'
            else if (condicion.includes('repar')) estado = 'En reparación'
            else if (condicion.includes('dañ') || condicion.includes('dan')) estado = 'Dañado'

            return {
                ...elemento,
                tipo: elemento.category?.nombre ?? 'Elemento',
                categoria: elemento.category?.nombre ?? 'Elemento',
                placa: elemento.codigo_inventario ?? '—',
                ambiente: elemento.environment?.nombre ?? 'Sin ambiente',
                estado,
                asignadoDesde: fechaPorElemento.get(Number(elemento.id)),
            }
        })
}

// El backend todavía no filtra por ambiente, así que se filtra aquí
export const obtenerElementosDeAmbiente = async (ambienteId) => {
    const elementos = await obtenerElementos()
    return elementos.filter((elemento) => elemento.environment_id === Number(ambienteId))
}

export const obtenerElemento = (id) => obtenerUno(`/elementos/${id}`)

export const verPdfElementos = async () => {
    const respuesta = await api.get('/elementos/pdf/ver', {
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
    })
    return respuesta.data
}

export const descargarPdfElementos = async () => {
    const respuesta = await api.get('/elementos/pdf/descargar', {
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
    })
    return respuesta.data
}

// Se envían como FormData porque llevan la imagen del elemento
export const crearElemento = (elemento) => crearConArchivos('/elementos', elemento)

export const actualizarElemento = (id, elemento) => actualizarConArchivos(`/elementos/${id}`, elemento)

export const eliminarElemento = async (id) => {
    const respuesta = await api.delete(`/elementos/${id}`)
    return respuesta.data
}
