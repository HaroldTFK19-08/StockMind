import { Navigate, useLocation } from 'react-router-dom'

import Cargando from '../../Shared/Components/Feedback/Cargando'
import useAuth from '../../Modules/Auth/Hooks/useAuth'
import { rutaPrincipalUsuario, usuarioTieneRol } from '../../Modules/Auth/Utils/roles'

const RutaProtegida = ({ rol, children }) => {
    const { usuario, cargando } = useAuth()
    const location = useLocation()

    if (cargando) return <Cargando texto="Validando sesión..." />
    if (!usuario) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }
    if (!usuarioTieneRol(usuario, rol)) {
        return <Navigate to={rutaPrincipalUsuario(usuario) ?? '/'} replace />
    }

    return children
}

export default RutaProtegida
