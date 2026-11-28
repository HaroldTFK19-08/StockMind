import { Routes, Route, Navigate } from 'react-router-dom'

import PanelLayout from '../../../Shared/Layouts/PanelLayout'
import panelCuentaDante from '../Data/panelCuentaDante'

import HomeCuentaDante from '../Pages/Home'
import Ambientes from '../../Ambientes/Pages/Ambientes'
import DetalleAmbiente from '../../Ambientes/Pages/DetalleAmbiente'
import Inventario from '../../Elementos/Pages/Inventario'
import Asignaciones from '../../Asignaciones/Pages/Asignaciones'
import Traslados from '../../Traslados/Pages/Traslados'
import ReportesCuentadante from '../../Reportes/Pages/ReportesCuentadante'
import Notificaciones from '../../Notificaciones/Pages/Notificaciones'
import Perfil from '../../Perfil/Pages/Perfil'
import EditarPerfil from '../../Perfil/Pages/EditarPerfil'

// Todas las rutas empiezan por /cuentadante
const CuentaDanteRoutes = () => {
    return (
        <Routes>
            <Route element={<PanelLayout panel={panelCuentaDante} />}>
                <Route index element={<Navigate to="/cuentadante/home" replace />} />
                <Route path="home" element={<HomeCuentaDante />} />
                <Route path="ambientes" element={<Ambientes rutaBase="/cuentadante/ambientes" />} />
                <Route path="ambientes/:id" element={<DetalleAmbiente />} />
                <Route path="elementos" element={<Inventario />} />
                <Route path="asignaciones" element={<Asignaciones />} />
                <Route path="traslados" element={<Traslados />} />
                <Route path="reportes" element={<ReportesCuentadante />} />
                <Route path="notificaciones" element={<Notificaciones />} />
                <Route path="perfil" element={<Perfil rutaEditar="/cuentadante/perfil/editar" />} />
                <Route path="perfil/editar" element={<EditarPerfil rutaPerfil="/cuentadante/perfil" />} />
            </Route>

            <Route path="*" element={<Navigate to="/cuentadante/home" replace />} />
        </Routes>
    )
}

export default CuentaDanteRoutes
