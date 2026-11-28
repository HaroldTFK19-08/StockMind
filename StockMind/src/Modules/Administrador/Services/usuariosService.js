// Compatibilidad: los hooks y páginas existentes importan este archivo.
// La implementación vive en los servicios por módulo, que a su vez leen el
// catálogo de ENDPOINTS, para que no haya rutas duplicadas.
export {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario,
    actualizarMiPerfil,
    desactivarUsuario,
} from '../../Usuarios/Services/usuariosService'
export { obtenerRoles } from '../../Roles/Services/rolesService'
