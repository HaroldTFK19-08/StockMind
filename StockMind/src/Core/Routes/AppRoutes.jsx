import { Routes, Route } from 'react-router-dom'

import AuthRoutes from '../../Modules/Auth/Routes/AuthRoutes'
import AprendizRoutes from '../../Modules/Aprendiz/Routes/AprendizRoutes'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rutas de Aprendiz */}
            <Route path="/aprendiz/*" element={<AprendizRoutes />} />

            {/* Rutas de Auth e Inicio (al final para no interferir) */}
            <Route path="/*" element={<AuthRoutes />} />
        </Routes>
    )
}

export default AppRoutes