import { Routes, Route, Navigate } from 'react-router-dom'

import PanelLayout from '../../../Shared/Layouts/PanelLayout'
import panelAdmin from '../Data/panelAdmin'
import perfilAdmin from '../Data/perfilAdmin'
import notificacionesAdmin from '../Data/notificacionesAdmin'

import HomeAdmin from '../Pages/Home'
import Usuarios from '../Pages/Usuarios'
import Centros from '../../Centros/Pages/Centros'
import DetalleCentro from '../../Centros/Pages/DetalleCentro'
import DetalleAmbiente from '../../Ambientes/Pages/DetalleAmbiente'
import Inventario from '../../Elementos/Pages/Inventario'
import Movimientos from '../../Traslados/Pages/Movimientos'
import GestionReportes from '../../Reportes/Pages/GestionReportes'
import Notificaciones from '../../Notificaciones/Pages/Notificaciones'
import Perfil from '../../Perfil/Pages/Perfil'
import EditarPerfil from '../../Perfil/Pages/EditarPerfil'

// Todas las rutas empiezan por /admin
const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<PanelLayout panel={panelAdmin} />}>
                <Route index element={<Navigate to="/admin/home" replace />} />
                <Route path="home" element={<HomeAdmin />} />
                <Route path="centros" element={<Centros />} />
                <Route path="centros/:id" element={<DetalleCentro />} />
                <Route path="ambientes/:id" element={<DetalleAmbiente />} />
                <Route path="inventario" element={<Inventario puedeAgregar />} />
                <Route path="movimientos" element={<Movimientos />} />
                <Route path="reportes" element={<GestionReportes mostrarCentro />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="notificaciones" element={<Notificaciones datos={notificacionesAdmin} />} />
                <Route path="perfil" element={<Perfil usuario={perfilAdmin} rutaEditar="/admin/perfil/editar" />} />
                <Route path="perfil/editar" element={<EditarPerfil usuario={perfilAdmin} rutaPerfil="/admin/perfil" />} />
            </Route>

            <Route path="*" element={<Navigate to="/admin/home" replace />} />
        </Routes>
    )
}

export default AdminRoutes
