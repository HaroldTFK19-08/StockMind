import { GraduationCap, UserCog, Users, Warehouse } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import SearchBar from '../../../Shared/Forms/SearchBar'
import { useUsuarios } from '../Hooks/useUsuarios'
import ModalUsuario from '../Components/ModalUsuario'
import TarjetaUsuario from '../Components/TarjetaUsuario'

const Usuarios = () => {
    const {
        centros,
        errorCentros,
        datos,
        cargando,
        errorCarga,
        usuariosFiltrados,
        busqueda,
        setBusqueda,
        rol,
        setRol,
        conteos,
        rolesDisponibles,
        rolesSeleccionados,
        seleccionarRol,
        usuarioActualizando,
        error,
        mensaje,
        modalUsuario,
        cambiarEstado,
        asignarRol,
        abrirModalUsuario,
        cerrarModalUsuario,
        guardarEdicionUsuario,
    } = useUsuarios()

    if (cargando) {
        return <p className="text-center text-slate-400 py-12">Cargando usuarios...</p>
    }

    if (!datos) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500">{errorCarga}</p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {errorCentros && (
                <p className="mb-4 text-sm text-red-600" role="alert">{errorCentros}</p>
            )}

            <div className="mx-auto mb-8 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    etiqueta="Usuarios"
                    valor={conteos.Todos}
                    icono={Users}
                />
                <StatCard
                    etiqueta="Instructores"
                    valor={conteos.Instructor}
                    icono={UserCog}
                    color="azul"
                />
                <StatCard
                    etiqueta="Cuentadantes"
                    valor={conteos.Cuentadante}
                    icono={Warehouse}
                    color="ambar"
                />
                <StatCard
                    etiqueta="Aprendices"
                    valor={conteos.Aprendiz}
                    icono={GraduationCap}
                    color="rojo"
                />
            </div>

            <div className="mx-auto max-w-5xl">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
                    <p className="mt-1 text-slate-500">Administra usuarios, roles y estados</p>
                </div>
                <search aria-label="Buscar y filtrar usuarios">
                    <SearchBar
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                        placeholder="Buscar por nombre o correo..."
                    />
                    <FiltroChips
                        opciones={['Todos', ...rolesDisponibles]}
                        valor={rol}
                        onCambiar={setRol}
                        conteos={conteos}
                    />
                </search>
            </div>

            {error && <p className="mb-4 text-sm text-red-600" role="alert">{error}</p>}
            {mensaje && <p className="mb-4 text-sm text-emerald-700" role="status">{mensaje}</p>}

            {usuariosFiltrados.length === 0 ? (
                <EstadoVacio
                    titulo="No se encontraron usuarios"
                    descripcion="Prueba con otros términos de búsqueda o filtros."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {usuariosFiltrados.map((usuario) => (
                        <TarjetaUsuario
                            key={usuario.id}
                            usuario={usuario}
                            centro={centros.find((centro) => String(centro.id) === String(usuario.centro))?.nombre
                                ?? usuario.centro
                                ?? 'Sin centro'}
                            rolesAsignables={datos.rolesAsignables}
                            rolSeleccionado={rolesSeleccionados[usuario.id]}
                            actualizando={usuarioActualizando === usuario.id}
                            onSeleccionarRol={seleccionarRol}
                            onAsignarRol={asignarRol}
                            onCambiarEstado={cambiarEstado}
                            onVer={() => abrirModalUsuario(usuario.id, 'ver')}
                            onEditar={() => abrirModalUsuario(usuario.id, 'editar')}
                        />
                    ))}
                </div>
            )}

            {modalUsuario && (
                <ModalUsuario
                    usuarioId={modalUsuario.id}
                    modo={modalUsuario.modo}
                    onCerrar={cerrarModalUsuario}
                    onGuardado={guardarEdicionUsuario}
                    rolesAsignables={datos.rolesAsignables}
                />
            )}
        </div>
    )
}

export default Usuarios
