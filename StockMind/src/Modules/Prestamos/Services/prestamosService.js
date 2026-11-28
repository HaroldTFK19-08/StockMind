import { ENDPOINTS } from '../../../Core/Config/endpoints'
import crearServicioCrud from '../../../Core/Services/crearServicioCrud'

// Préstamos -> /v1/prestamos.
// El backend controla la disponibilidad del elemento y recalcula su estado al
// crear/editar un préstamo; el frontend solo envía los campos validados.
const nombreCompleto = (usuario) => [usuario?.nombre_1, usuario?.apellido_1]
    .filter(Boolean)
    .join(' ') || 'Sin instructor'

const normalizar = (prestamo) => ({
    ...prestamo,
    elemento: prestamo.element?.nombre ?? 'Sin elemento',
    instructor: nombreCompleto(prestamo.teacher?.user),
    fechaPrestamo: prestamo.fecha_prestamo,
    fechaDevolucionEsperada: prestamo.fecha_devolucion_esperada,
    fechaDevolucionReal: prestamo.fecha_devolucion_real,
})

const servicio = crearServicioCrud(ENDPOINTS.prestamos, { parametro: 'prestamo', normalizar })

export const obtenerPrestamos = (params) => servicio.listar(params)
export const obtenerPrestamo = (id) => servicio.ver(id)
export const crearPrestamo = (datos) => servicio.crear(datos)
export const actualizarPrestamo = (id, datos) => servicio.actualizar(id, datos)
export const eliminarPrestamo = (id) => servicio.eliminar(id)

/** Marca la devolución; el backend actualiza el estado del elemento. */
export const devolverPrestamo = (id, fecha = new Date().toISOString()) =>
    servicio.actualizar(id, {
        estado: 'devuelto',
        fecha_devolucion_real: fecha,
    })
