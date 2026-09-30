import { Building2, ClipboardList, LayoutDashboard } from 'lucide-react'

const panelInstructor = {
    enlaces: [
        { id: 1, titulo: 'Inicio', ruta: '/instructor/home', icono: LayoutDashboard },
        { id: 2, titulo: 'Ambientes', ruta: '/instructor/ambientes', icono: Building2 },
        { id: 3, titulo: 'Historial de reportes', ruta: '/instructor/reportes', icono: ClipboardList },
    ],
    rutaPerfil: '/instructor/perfil',
    rutaNotificaciones: '/instructor/notificaciones',
    titulosExtra: {
        '/instructor/perfil': 'Mi perfil',
        '/instructor/perfil/editar': 'Editar datos',
        '/instructor/notificaciones': 'Notificaciones',
    },
}

export default panelInstructor
