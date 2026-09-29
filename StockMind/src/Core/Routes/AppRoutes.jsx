import { Routes, Route } from 'react-router-dom'

import AuthRoutes from '../../Modules/Auth/Routes/AuthRoutes'
import AprendizRoutes from '../../Modules/Aprendiz/Routes/AprendizRoutes'

const AppRoutes = () => {
    return (
        <Routes>
            {AuthRoutes()}
            <Route path="/aprendiz/*" element={<AprendizRoutes />} />
        </Routes>
    )
}

export default AppRoutes

