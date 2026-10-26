import { AlertTriangle, FileText, LayoutDashboard, Package } from 'lucide-react'

// Configuración del menú y la cabecera del panel del aprendiz
const panelAprendiz = {
    enlaces: [
        { id: 1, titulo: 'Inicio', ruta: '/aprendiz/home', icono: LayoutDashboard },
        { id: 2, titulo: 'Reportar daño', ruta: '/aprendiz/reportes/reportarDano', icono: AlertTriangle },
        { id: 3, titulo: 'Mis reportes', ruta: '/aprendiz/reportes', icono: FileText, exacto: true },
        { id: 4, titulo: 'Mis elementos', ruta: '/aprendiz/elementos', icono: Package },
    ],
    rutaPerfil: '/aprendiz/perfil',
    rutaNotificaciones: '/aprendiz/notificaciones',
    titulosExtra: {
        '/aprendiz/perfil': 'Mi perfil',
        '/aprendiz/perfil/editar': 'Editar datos',
        '/aprendiz/notificaciones': 'Notificaciones',
    },
}

export default panelAprendiz
