import { Routes, Route, Navigate } from 'react-router-dom'

import PanelLayout from '../../../Shared/Layouts/PanelLayout'
import Enlaces, { titulosExtraAprendiz, enlacePerfilAprendiz } from '../Data/rutasAprendiz'

// Páginas propias del módulo Aprendiz
import HomeAprendiz from '../Pages/Home'
import PerfilAprendiz from '../Pages/Perfil'

// Páginas que viven en su propio módulo
import Reportes from '../../Reportes/Pages/Reportes'
import ReportarDano from '../../Reportes/Pages/ReportarDano'
import Elementos from '../../Elementos/Pages/Elementos'

const AprendizRoutes = () => {
    return (
        <Routes>
            {/* Layout compartido: menú + cabecera. Las páginas se pintan en su <Outlet /> */}
            <Route
                element={
                    <PanelLayout
                        enlaces={Enlaces}
                        enlacePerfil={enlacePerfilAprendiz}
                        titulosExtra={titulosExtraAprendiz}
                    />
                }
            >
                {/* /aprendiz → /aprendiz/home */}
                <Route index element={<Navigate to="/aprendiz/home" replace />} />

                <Route path="home" element={<HomeAprendiz />} />
                <Route path="perfil" element={<PerfilAprendiz />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="reportes/reportarDano" element={<ReportarDano />} />
                <Route path="elementos" element={<Elementos />} />
            </Route>

            {/* Cualquier subruta no válida dentro de /aprendiz vuelve al inicio */}
            <Route path="*" element={<Navigate to="/aprendiz/home" replace />} />
        </Routes>
    )
}

export default AprendizRoutes
