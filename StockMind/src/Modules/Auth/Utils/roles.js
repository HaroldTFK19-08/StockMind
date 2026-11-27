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

const rolesUsuario = (usuario) => (usuario?.roles ?? [])
    .map((rol) => normalizarRol(typeof rol === 'string' ? rol : rol.rol))

export const usuarioTieneRol = (usuario, tipo) => {
    const configuracion = rolesPorRuta[tipo]
    return Boolean(configuracion && rolesUsuario(usuario).some((rol) => configuracion.nombres.includes(rol)))
}

export const rutaPrincipalUsuario = (usuario) => Object.entries(rolesPorRuta)
    .find(([tipo]) => usuarioTieneRol(usuario, tipo))?.[1].ruta ?? null
