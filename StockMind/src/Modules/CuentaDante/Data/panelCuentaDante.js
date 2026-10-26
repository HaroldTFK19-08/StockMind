import { ArrowLeftRight, Building2, ClipboardCheck, FileText, LayoutDashboard, Package } from 'lucide-react'

const panelCuentaDante = {
    enlaces: [
        { id: 1, titulo: 'Inicio', ruta: '/cuentadante/home', icono: LayoutDashboard },
        { id: 2, titulo: 'Ambientes', ruta: '/cuentadante/ambientes', icono: Building2 },
        { id: 3, titulo: 'Elementos', ruta: '/cuentadante/elementos', icono: Package },
        { id: 4, titulo: 'Asignaciones', ruta: '/cuentadante/asignaciones', icono: ClipboardCheck },
        { id: 5, titulo: 'Traslados', ruta: '/cuentadante/traslados', icono: ArrowLeftRight },
        { id: 6, titulo: 'Reportes', ruta: '/cuentadante/reportes', icono: FileText },
    ],
    rutaPerfil: '/cuentadante/perfil',
    rutaNotificaciones: '/cuentadante/notificaciones',
    titulosExtra: {
        '/cuentadante/perfil': 'Mi perfil',
        '/cuentadante/perfil/editar': 'Editar datos',
        '/cuentadante/notificaciones': 'Notificaciones',
    },
}

export default panelCuentaDante
