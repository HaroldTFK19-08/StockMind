import { Routes, Route } from 'react-router-dom'

import AuthRoutes from '../../Modules/Auth/Routes/AuthRoutes'
import AprendizRoutes from '../../Modules/Aprendiz/Routes/AprendizRoutes'
import InstructorRoutes from '../../Modules/Instructor/Routes/InstructorRoutes'
import CuentaDanteRoutes from '../../Modules/CuentaDante/Routes/CuentaDanteRoutes'
import AdminRoutes from '../../Modules/Administrador/Routes/AdminRoutes'

// Cada rol tiene su propio archivo de rutas dentro de su módulo
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/aprendiz/*" element={<AprendizRoutes />} />
            <Route path="/instructor/*" element={<InstructorRoutes />} />
            <Route path="/cuentadante/*" element={<CuentaDanteRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            {/* Inicio, login y registro (va al final para no tapar las otras) */}
            <Route path="/*" element={<AuthRoutes />} />
        </Routes>
    )
}

export default AppRoutes
