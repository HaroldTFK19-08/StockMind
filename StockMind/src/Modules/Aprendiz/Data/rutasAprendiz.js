import { LayoutDashboard, FileText, Package, AlertTriangle } from 'lucide-react'

const Enlaces = [
    {
        id: "1",
        titulo: "Inicio",
        ruta: "/aprendiz/home",
        icono: LayoutDashboard,
    },
    {
        id: "2",
        titulo: "Reportes",
        ruta: "/aprendiz/reportes",
        icono: FileText,
    },
    {
        id: "3",
        titulo: "Elementos",
        ruta: "/aprendiz/elementos",
        icono: Package,
    },
    {
        id: "4",
        titulo: "Reportar Daño",
        ruta: "/aprendiz/reportes/reportarDano",
        icono: AlertTriangle,
    },
]

// Rutas que no aparecen en el menú pero necesitan título en la cabecera
export const titulosExtraAprendiz = {
    "/aprendiz/perfil": "Mi perfil",
}

export const enlacePerfilAprendiz = "/aprendiz/perfil"

export default Enlaces
