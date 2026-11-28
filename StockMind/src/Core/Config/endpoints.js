/**
 * Catálogo de rutas del backend Laravel (prefijo /v1).
 *
 * Fuente: app/Modules/*\/Routes/api.php y routes/api.php del proyecto Laravel.
 * Es la única fuente de verdad para los servicios del frontend: si el backend
 * cambia una ruta, se ajusta aquí y todos los consumidores lo reflejan.
 *
 * auth:  false = ruta pública, true = requiere Authorization: Bearer <token>.
 * roles: roles permitidos por el middleware `role` / `rol` del backend.
 *        null significa "cualquier rol autenticado".
 * Nota: los apiResource de Laravel aceptan PUT y PATCH para update; en el
 * frontend se usa PUT (el verbo canónico) para evitar duplicar definiciones.
 */

export const ROLES = Object.freeze({
    ADMIN: 'Administrador',
    INSTRUCTOR: 'Instructor',
    APRENDIZ: 'Aprendiz',
    CUENTA_DANTE: 'Cuenta-dante',
})

const TODOS = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.APRENDIZ, ROLES.CUENTA_DANTE]
const LECTURA = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.CUENTA_DANTE]
const OPERATIVOS = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.APRENDIZ, ROLES.CUENTA_DANTE]
const ADMIN_CUENTA = [ROLES.ADMIN, ROLES.CUENTA_DANTE]
const ADMIN_INSTRUCTOR_CUENTA = [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.CUENTA_DANTE]
const SOLO_ADMIN = [ROLES.ADMIN]
const SOLO_CUENTA = [ROLES.CUENTA_DANTE]

/** @param {string} metodo @param {string} path @param {string[]|null} roles @param {string} descripcion */
const ruta = (metodo, path, roles, descripcion, extra = {}) => ({
    metodo,
    ruta: path,
    auth: true,
    roles,
    descripcion,
    ...extra,
})

export const ENDPOINTS = Object.freeze({
    auth: Object.freeze({
        registrar: { metodo: 'POST', ruta: '/auth/register', auth: false, roles: null, descripcion: 'Registro público; crea la cuenta en estado Pendiente.' },
        iniciarSesion: { metodo: 'POST', ruta: '/auth/login', auth: false, roles: null, descripcion: 'Login con email, password y código de activación opcional de 6 dígitos.' },
        verificarCodigo: { metodo: 'POST', ruta: '/auth/verificar-codigo', auth: false, roles: null, descripcion: 'Valida el código de activación enviado por correo al aprobar el registro.' },
        cerrarSesion: ruta('POST', '/auth/logout', TODOS, 'Invalida el token de Sanctum de la sesión actual.'),
        yo: ruta('GET', '/auth/me', TODOS, 'Perfil del usuario autenticado con sus roles.'),
        usuario: ruta('GET', '/user', TODOS, 'Ruta general de Laravel que devuelve el usuario autenticado.'),
    }),

    almacenes: Object.freeze({
        listar: ruta('GET', '/almacenes', LECTURA, 'Listado paginado de almacenes.'),
        ver: ruta('GET', '/almacenes/{almacen}', LECTURA, 'Detalle de un almacén.'),
        crear: ruta('POST', '/almacenes', SOLO_ADMIN, 'Crear almacén.'),
        actualizar: ruta('PUT', '/almacenes/{almacen}', SOLO_ADMIN, 'Editar almacén.'),
        eliminar: ruta('DELETE', '/almacenes/{almacen}', SOLO_ADMIN, 'Eliminar almacén.'),
    }),

    ambientes: Object.freeze({
        listar: ruta('GET', '/ambientes', OPERATIVOS, 'Listado paginado de ambientes.'),
        ver: ruta('GET', '/ambientes/{ambiente}', OPERATIVOS, 'Detalle de un ambiente.'),
        crear: ruta('POST', '/ambientes', SOLO_ADMIN, 'Crear ambiente.'),
        actualizar: ruta('PUT', '/ambientes/{ambiente}', ADMIN_CUENTA, 'Editar ambiente (el backend limita el alcance del cuentadante).'),
        eliminar: ruta('DELETE', '/ambientes/{ambiente}', SOLO_ADMIN, 'Eliminar ambiente.'),
    }),

    asignaciones: Object.freeze({
        listar: ruta('GET', '/asignaciones', OPERATIVOS, 'Listado con alcance por rol.'),
        ver: ruta('GET', '/asignaciones/{asignacion}', OPERATIVOS, 'Detalle de una asignación.'),
        crear: ruta('POST', '/asignaciones', SOLO_ADMIN, 'Crear asignación.'),
        actualizar: ruta('PUT', '/asignaciones/{asignacion}', SOLO_ADMIN, 'Editar asignación.'),
        eliminar: ruta('DELETE', '/asignaciones/{asignacion}', SOLO_ADMIN, 'Eliminar asignación.'),
        pdfVer: ruta('GET', '/asignaciones/pdf/ver', ADMIN_INSTRUCTOR_CUENTA, 'Ver PDF de asignaciones según alcance del rol.', { respuesta: 'blob' }),
        pdfDescargar: ruta('GET', '/asignaciones/pdf/descargar', ADMIN_INSTRUCTOR_CUENTA, 'Descargar PDF de asignaciones.', { respuesta: 'blob' }),
    }),

    categorias: Object.freeze({
        listar: ruta('GET', '/categorias', OPERATIVOS, 'Listado paginado de categorías.'),
        ver: ruta('GET', '/categorias/{categoria}', OPERATIVOS, 'Detalle de categoría.'),
        crear: ruta('POST', '/categorias', SOLO_ADMIN, 'Crear categoría.'),
        actualizar: ruta('PUT', '/categorias/{categoria}', SOLO_ADMIN, 'Editar categoría.'),
        eliminar: ruta('DELETE', '/categorias/{categoria}', SOLO_ADMIN, 'Eliminar categoría.'),
    }),

    centros: Object.freeze({
        listar: ruta('GET', '/centros', OPERATIVOS, 'Listado de centros (respuesta sin paginar).'),
        ver: ruta('GET', '/centros/{centro}', OPERATIVOS, 'Detalle de centro.'),
        crear: ruta('POST', '/centros', SOLO_ADMIN, 'Crear centro (acepta imagen).', { archivos: true }),
        actualizar: ruta('PUT', '/centros/{centro}', SOLO_ADMIN, 'Editar centro (acepta imagen).', { archivos: true }),
        eliminar: ruta('DELETE', '/centros/{centro}', SOLO_ADMIN, 'Eliminar centro.'),
    }),

    consultas: Object.freeze({
        instructores: ruta('GET', '/consultas/instructores', ADMIN_CUENTA, 'Instructores disponibles para filtros.'),
        cuentasDante: ruta('GET', '/consultas/cuentas-dante', ADMIN_CUENTA, 'Cuentadantes disponibles para filtros.'),
        misSolicitudes: ruta('GET', '/consultas/mis-solicitudes', [ROLES.INSTRUCTOR, ROLES.CUENTA_DANTE, ROLES.APRENDIZ], 'Solicitudes del usuario autenticado.'),
        solicitudesFicha: ruta('GET', '/consultas/solicitudes-ficha', OPERATIVOS, 'Solicitudes de la ficha del usuario (alcance validado en backend).'),
        reportes: ruta('GET', '/consultas/reportes', ADMIN_INSTRUCTOR_CUENTA, 'Reportes con filtros y alcance por rol.'),
    }),

    elementos: Object.freeze({
        listar: ruta('GET', '/elementos', OPERATIVOS, 'Listado paginado de elementos.'),
        ver: ruta('GET', '/elementos/{elemento}', OPERATIVOS, 'Detalle de elemento.'),
        crear: ruta('POST', '/elementos', ADMIN_CUENTA, 'Crear elemento (acepta imagen).', { archivos: true }),
        actualizar: ruta('PUT', '/elementos/{elemento}', ADMIN_CUENTA, 'Editar elemento (acepta imagen).', { archivos: true }),
        eliminar: ruta('DELETE', '/elementos/{elemento}', ADMIN_CUENTA, 'Eliminar elemento.'),
        inventario: ruta('GET', '/elementos/inventario-por-sede-almacen-categoria', LECTURA, 'Inventario agrupado por sede, almacén y categoría.'),
        historial: ruta('GET', '/elementos/{codigo}/historial', LECTURA, 'Historial de movimientos de un elemento por código.'),
        pdfVer: ruta('GET', '/elementos/pdf/ver', ADMIN_CUENTA, 'Ver PDF de inventario.', { respuesta: 'blob' }),
        pdfDescargar: ruta('GET', '/elementos/pdf/descargar', ADMIN_CUENTA, 'Descargar PDF de inventario.', { respuesta: 'blob' }),
    }),

    fichas: Object.freeze({
        listar: ruta('GET', '/fichas', OPERATIVOS, 'Listado paginado de fichas.'),
        ver: ruta('GET', '/fichas/{ficha}', OPERATIVOS, 'Detalle de ficha.'),
        crear: ruta('POST', '/fichas', SOLO_ADMIN, 'Crear ficha.'),
        actualizar: ruta('PUT', '/fichas/{ficha}', SOLO_ADMIN, 'Editar ficha.'),
        eliminar: ruta('DELETE', '/fichas/{ficha}', SOLO_ADMIN, 'Eliminar ficha.'),
    }),

    movimientos: Object.freeze({
        listar: ruta('GET', '/movimientos', ADMIN_CUENTA, 'Historial de movimientos con alcance por rol.'),
        ver: ruta('GET', '/movimientos/{movimiento}', ADMIN_CUENTA, 'Detalle de movimiento.'),
        crear: ruta('POST', '/movimientos', SOLO_CUENTA, 'Registrar movimiento manual (solo cuentadante). No hay update/destroy.'),
    }),

    notificaciones: Object.freeze({
        listar: ruta('GET', '/notificaciones', TODOS, 'Notificaciones del usuario autenticado.'),
        contador: ruta('GET', '/notificaciones/contador', TODOS, 'Cantidad de notificaciones sin leer.'),
        marcarLeida: ruta('PATCH', '/notificaciones/{notificacion}/leida', TODOS, 'Marcar una notificación como leída.'),
        marcarTodas: ruta('PATCH', '/notificaciones/leer-todas', TODOS, 'Marcar todas las notificaciones como leídas.'),
    }),

    prestamos: Object.freeze({
        listar: ruta('GET', '/prestamos', OPERATIVOS, 'Listado de préstamos.'),
        ver: ruta('GET', '/prestamos/{prestamo}', OPERATIVOS, 'Detalle de préstamo.'),
        crear: ruta('POST', '/prestamos', OPERATIVOS, 'Solicitar/crear préstamo.'),
        actualizar: ruta('PUT', '/prestamos/{prestamo}', OPERATIVOS, 'Actualizar préstamo (el backend valida las transiciones de estado).'),
        eliminar: ruta('DELETE', '/prestamos/{prestamo}', SOLO_ADMIN, 'Eliminar préstamo.'),
    }),

    reportes: Object.freeze({
        listar: ruta('GET', '/reportes', OPERATIVOS, 'Listado de reportes con alcance por rol.'),
        ver: ruta('GET', '/reportes/{reporte}', OPERATIVOS, 'Detalle de reporte.'),
        crear: ruta('POST', '/reportes', OPERATIVOS, 'Reportar daño (acepta imagen).', { archivos: true }),
        actualizar: ruta('PUT', '/reportes/{reporte}', ADMIN_CUENTA, 'Actualizar reporte/estado.'),
        eliminar: ruta('DELETE', '/reportes/{reporte}', SOLO_ADMIN, 'Eliminar reporte.'),
        pdfVer: ruta('GET', '/reportes/pdf/ver', ADMIN_INSTRUCTOR_CUENTA, 'Ver PDF general de reportes (filtrado por alcance en el backend).', { respuesta: 'blob' }),
        pdfDescargar: ruta('GET', '/reportes/pdf/descargar', ADMIN_INSTRUCTOR_CUENTA, 'Descargar PDF general de reportes.', { respuesta: 'blob' }),
    }),

    roles: Object.freeze({
        listar: ruta('GET', '/roles', SOLO_ADMIN, 'Listado de roles.'),
        ver: ruta('GET', '/roles/{role}', SOLO_ADMIN, 'Detalle de rol.'),
        crear: ruta('POST', '/roles', SOLO_ADMIN, 'Crear rol.'),
        actualizar: ruta('PUT', '/roles/{role}', SOLO_ADMIN, 'Editar rol.'),
        eliminar: ruta('DELETE', '/roles/{role}', SOLO_ADMIN, 'Eliminar rol.'),
    }),

    sedes: Object.freeze({
        listar: ruta('GET', '/sedes', OPERATIVOS, 'Listado paginado de sedes.'),
        ver: ruta('GET', '/sedes/{sede}', OPERATIVOS, 'Detalle de sede.'),
        crear: ruta('POST', '/sedes', SOLO_ADMIN, 'Crear sede.'),
        actualizar: ruta('PUT', '/sedes/{sede}', SOLO_ADMIN, 'Editar sede.'),
        eliminar: ruta('DELETE', '/sedes/{sede}', SOLO_ADMIN, 'Eliminar sede.'),
    }),

    traslados: Object.freeze({
        listar: ruta('GET', '/traslados', ADMIN_CUENTA, 'Listado de traslados.'),
        ver: ruta('GET', '/traslados/{traslado}', ADMIN_CUENTA, 'Detalle de traslado.'),
        crear: ruta('POST', '/traslados', SOLO_CUENTA, 'Crear traslado entre ambientes del cuentadante.'),
        actualizar: ruta('PUT', '/traslados/{traslado}', SOLO_CUENTA, 'Editar traslado.'),
        eliminar: ruta('DELETE', '/traslados/{traslado}', SOLO_CUENTA, 'Eliminar traslado.'),
    }),

    usuarios: Object.freeze({
        listar: ruta('GET', '/usuarios', SOLO_ADMIN, 'Listado paginado de usuarios.'),
        perfiles: ruta('GET', '/usuarios/perfiles', SOLO_ADMIN, 'Usuarios con perfiles/roles cargados.'),
        ver: ruta('GET', '/usuarios/{usuario}', OPERATIVOS, 'Detalle de usuario (propio usuario permitido).'),
        crear: ruta('POST', '/usuarios', SOLO_ADMIN, 'Crear usuario desde administración.'),
        actualizar: ruta('PUT', '/usuarios/{usuario}', OPERATIVOS, 'Editar usuario; al asignar rol puede devolver token de activación.'),
        eliminar: ruta('DELETE', '/usuarios/{usuario}', SOLO_ADMIN, 'Eliminar usuario.'),
    }),
})

/** Sustituye {parametro} por su valor codificado. */
export const construirRuta = (path, parametros = {}) => path.replace(/\{([^}]+)\}/g, (_, nombre) => {
    const valor = parametros[nombre]
    return valor === undefined || valor === null ? '' : encodeURIComponent(String(valor))
})

/** Lista plana para generar documentación o validaciones en el frontend. */
export const listarEndpoints = () => Object.entries(ENDPOINTS).flatMap(([modulo, rutas]) =>
    Object.entries(rutas).map(([accion, definicion]) => ({
        modulo,
        accion,
        metodo: definicion.metodo,
        ruta: definicion.ruta,
        auth: definicion.auth,
        roles: definicion.roles,
        descripcion: definicion.descripcion,
    })),
)
