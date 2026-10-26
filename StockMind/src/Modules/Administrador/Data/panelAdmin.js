import { ArrowLeftRight, Building2, FileBarChart, LayoutDashboard, Package, Users } from 'lucide-react'

const panelAdmin = {
    enlaces: [
        { id: 1, titulo: 'Inicio', ruta: '/admin/home', icono: LayoutDashboard },
        { id: 2, titulo: 'Centros', ruta: '/admin/centros', icono: Building2 },
        { id: 3, titulo: 'Inventario', ruta: '/admin/inventario', icono: Package },
        { id: 4, titulo: 'Movimientos', ruta: '/admin/movimientos', icono: ArrowLeftRight },
        { id: 5, titulo: 'Reportes', ruta: '/admin/reportes', icono: FileBarChart },
        { id: 6, titulo: 'Usuarios', ruta: '/admin/usuarios', icono: Users },
    ],
    rutaPerfil: '/admin/perfil',
    rutaNotificaciones: '/admin/notificaciones',
    titulosExtra: {
        '/admin/ambientes': 'Detalle del ambiente',
        '/admin/perfil': 'Mi perfil',
        '/admin/perfil/editar': 'Editar datos',
        '/admin/notificaciones': 'Notificaciones',
    },
}

export default panelAdmin
