import { Routes, Route, Navigate } from 'react-router-dom'

import PanelLayout from '../../../Shared/Layouts/PanelLayout'
import panelInstructor from '../Data/panelInstructor'

import HomeInstructor from '../Pages/Home'
import Ambientes from '../../Ambientes/Pages/Ambientes'
import DetalleAmbiente from '../../Ambientes/Pages/DetalleAmbiente'
import GestionReportes from '../../Reportes/Pages/GestionReportes'
import Notificaciones from '../../Notificaciones/Pages/Notificaciones'
import Perfil from '../../Perfil/Pages/Perfil'
import EditarPerfil from '../../Perfil/Pages/EditarPerfil'

// Todas las rutas empiezan por /instructor
const InstructorRoutes = () => {
    return (
        <Routes>
            <Route element={<PanelLayout panel={panelInstructor} />}>
                <Route index element={<Navigate to="/instructor/home" replace />} />
                <Route path="home" element={<HomeInstructor />} />
                <Route path="ambientes" element={<Ambientes rutaBase="/instructor/ambientes" />} />
                <Route path="ambientes/:id" element={<DetalleAmbiente puedeReportar />} />
                <Route path="reportes" element={<GestionReportes puedeCambiarEstado />} />
                <Route path="notificaciones" element={<Notificaciones />} />
                <Route path="perfil" element={<Perfil rutaEditar="/instructor/perfil/editar" />} />
                <Route path="perfil/editar" element={<EditarPerfil rutaPerfil="/instructor/perfil" />} />
            </Route>

            <Route path="*" element={<Navigate to="/instructor/home" replace />} />
        </Routes>
    )
}

export default InstructorRoutes
