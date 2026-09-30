import { Routes, Route, Navigate } from 'react-router-dom'

import PanelLayout from '../../../Shared/Layouts/PanelLayout'
import panelAprendiz from '../Data/panelAprendiz'
import perfilAprendiz from '../Data/perfilAprendiz'
import notificacionesAprendiz from '../Data/notificacionesAprendiz'
import { reportesDelAprendiz } from '../Data/datosAprendiz'

// Páginas del módulo Aprendiz
import HomeAprendiz from '../Pages/Home'
// Páginas que viven en otros módulos
import MisElementos from '../../Elementos/Pages/MisElementos'
import MisReportes from '../../Reportes/Pages/MisReportes'
import ReportarDano from '../../Reportes/Pages/ReportarDano'
import Notificaciones from '../../Notificaciones/Pages/Notificaciones'
import Perfil from '../../Perfil/Pages/Perfil'
import EditarPerfil from '../../Perfil/Pages/EditarPerfil'

// Todas las rutas empiezan por /aprendiz
const AprendizRoutes = () => {
    return (
        <Routes>
            <Route element={<PanelLayout panel={panelAprendiz} />}>
                <Route index element={<Navigate to="/aprendiz/home" replace />} />
                <Route path="home" element={<HomeAprendiz />} />
                <Route path="elementos" element={<MisElementos />} />
                <Route path="reportes" element={<MisReportes reportes={reportesDelAprendiz} rutaReportar="/aprendiz/reportes/reportarDano" />} />
                <Route path="reportes/reportarDano" element={<ReportarDano />} />
                <Route path="notificaciones" element={<Notificaciones datos={notificacionesAprendiz} />} />
                <Route path="perfil" element={<Perfil usuario={perfilAprendiz} rutaEditar="/aprendiz/perfil/editar" />} />
                <Route path="perfil/editar" element={<EditarPerfil usuario={perfilAprendiz} rutaPerfil="/aprendiz/perfil" />} />
            </Route>

            {/* Cualquier otra ruta de /aprendiz vuelve al inicio */}
            <Route path="*" element={<Navigate to="/aprendiz/home" replace />} />
        </Routes>
    )
}

export default AprendizRoutes
