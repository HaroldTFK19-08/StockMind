const rolesPorRuta = {
    admin: {
        ruta: '/admin/home',
        nombres: ['admin', 'administrador'],
    },
    cuentadante: {
        ruta: '/cuentadante/home',
        nombres: ['cuentadante'],
    },
    instructor: {
        ruta: '/instructor/home',
        nombres: ['instructor'],
    },
    aprendiz: {
        ruta: '/aprendiz/home',
        nombres: ['aprendiz'],
    },
}

const normalizarRol = (rol) => String(rol ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

const nombreDelRol = (rol) => {
    if (typeof rol === 'string') return rol
    if (!rol || typeof rol !== 'object') return ''
    return rol.rol ?? rol.name ?? rol.nombre ?? rol.slug ?? ''
}

const rolesUsuario = (usuario) => {
    const roles = usuario?.roles ?? usuario?.role ?? usuario?.rol ?? []
    const lista = Array.isArray(roles) ? roles : Array.isArray(roles?.data) ? roles.data : [roles]

    return lista
        .map((rol) => normalizarRol(nombreDelRol(rol)))
        .filter(Boolean)
}

export const usuarioTieneRol = (usuario, tipo) => {
    const configuracion = rolesPorRuta[tipo]
    return Boolean(configuracion && rolesUsuario(usuario).some((rol) => configuracion.nombres.includes(rol)))
}

export const rutaPrincipalUsuario = (usuario) => Object.entries(rolesPorRuta)
    .find(([tipo]) => usuarioTieneRol(usuario, tipo))?.[1].ruta ?? null
