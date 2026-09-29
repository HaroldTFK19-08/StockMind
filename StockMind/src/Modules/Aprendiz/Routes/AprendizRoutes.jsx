import { Routes, Route, Navigate } from 'react-router-dom'
import AprendizLayout from '../Components/AprendizLayout'
import InicioAprendiz from '../Pages/InicioAprendiz'
import ReportesAprendiz from '../Pages/ReportesAprendiz'
import MisElementosAprendiz from '../Pages/MisElementosAprendiz'
import ReportarDanos from '../Pages/ReportarDanos'

// Se monta en el router principal como:  <Route path="/aprendiz/*" element={<AprendizRoutes />} />
// Por eso aquí las rutas son RELATIVAS a /aprendiz.
const AprendizRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="inicio" replace />} />
            {/* Pantalla de bienvenida: a pantalla completa, sin barra lateral */}
            <Route path="inicio" element={<InicioAprendiz />} />
            {/* Pantallas con barra lateral (NavbarAprendiz) */}
            <Route element={<AprendizLayout />}>
                <Route path="reportes" element={<ReportesAprendiz />} />
                <Route path="elementos" element={<MisElementosAprendiz />} />
                <Route path="reportar-dano" element={<ReportarDanos />} />
            </Route>
        </Routes>
    )
}

export default AprendizRoutes
