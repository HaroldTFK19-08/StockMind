import { useState } from 'react'
import { GraduationCap, UserCog, Users, Warehouse } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { incluyeTexto } from '../../../Shared/Utils/texto'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { mensajeError } from '../../../Core/Services/apiUtils'

import { roles } from '../Data/usuariosData'
import { useCentros } from '../../Centros/Hooks/Centros'
import { actualizarUsuario, obtenerRoles, obtenerUsuarios } from '../Services/usuariosService'

const iniciales = (nombre) => String(nombre)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase()

const nombreUsuario = (usuario) => {
    const nombre = [
        usuario.nombre_1,
        usuario.nombre_2,
        usuario.apellido_1,
        usuario.apellido_2,
    ].filter(Boolean).join(' ')
    return nombre || usuario.nombre || usuario.name || usuario.email || `Usuario #${usuario.id}`
}

const nombreRol = (rol) => {
    const valor = String(rol ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    if (valor.includes('admin')) return 'Administrador'
    if (valor.includes('teacher') || valor.includes('instructor')) return 'Instructor'
    if (valor.includes('apprentice') || valor.includes('aprendiz')) return 'Aprendiz'
    if (valor.includes('dante') || valor.includes('cuentadante')) return 'Cuentadante'
    return ''
}

const adaptarUsuario = (usuario) => {
    const rolesUsuario = []

    const rolesApi = Array.isArray(usuario.roles) ? usuario.roles : []
    rolesApi.forEach((rol) => {
        const valor = typeof rol === 'string' ? rol : rol?.rol ?? rol?.name
        const rolNormalizado = nombreRol(valor)
        if (rolNormalizado) rolesUsuario.push(rolNormalizado)
    })
    if (usuario.administrator || usuario.admin) rolesUsuario.push('Administrador')
    if (usuario.teacher) rolesUsuario.push('Instructor')
    if (usuario.apprentice) rolesUsuario.push('Aprendiz')
    if (usuario.danteaccount || usuario.dante_account || usuario.cuentadante) rolesUsuario.push('Cuentadante')

    const centro = usuario.centro
        ?? usuario.center?.nombre
        ?? usuario.headquarter?.nombre
        ?? usuario.center
        ?? usuario.headquarter
        ?? ''
    const estado = usuario.estado
        ?? ((usuario.activo ?? usuario.active) ? 'Activo' : 'Inactivo')

    return {
        id: usuario.id,
        nombre: nombreUsuario(usuario),
        correo: usuario.email ?? usuario.correo ?? '',
        roles: [...new Set(rolesUsuario)],
        roleIds: rolesApi
            .map((rol) => Number(rol?.id))
            .filter((id) => Number.isInteger(id) && id > 0),
        centro,
        estado,
        activo: estado === 'Activo',
    }
}

const contarRol = (usuarios, rol) => usuarios.filter((usuario) => usuario.roles.includes(rol)).length

const cargarDatos = async () => {
    const [usuariosApi, rolesApi] = await Promise.all([obtenerUsuarios(), obtenerRoles()])
    const rolesAsignables = rolesApi
        .map((rol) => ({ id: Number(rol.id), nombre: nombreRol(rol.rol) }))
        .filter((rol) => (
            Number.isInteger(rol.id)
            && rol.id > 0
            && ['Aprendiz', 'Instructor', 'Cuentadante'].includes(rol.nombre)
        ))

    return {
        usuarios: usuariosApi.map(adaptarUsuario),
        rolesAsignables,
    }
}

const Usuarios = () => {
    const { centros, error: errorCentros } = useCentros()
    const { datos, cargando, error: errorCarga, recargar } = useCarga(cargarDatos)
    const usuarios = datos?.usuarios ?? []
    const [busqueda, setBusqueda] = useState('')
    const [rol, setRol] = useState('Todos')
    const [rolesSeleccionados, setRolesSeleccionados] = useState({})
    const [usuarioActualizando, setUsuarioActualizando] = useState(null)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const filtrados = usuarios.filter(
        (usuario) => (rol === 'Todos' || usuario.roles.includes(rol))
            && incluyeTexto(usuario.nombre + usuario.correo, busqueda)
    )

    const conteos = { Todos: usuarios.length }
    roles.forEach((rolDisponible) => {
        conteos[rolDisponible] = contarRol(usuarios, rolDisponible)
    })

    const cambiarEstado = async (usuario) => {
        setError('')
        setMensaje('')
        const cuentaPendiente = usuario.estado === 'Pendiente'

        if (cuentaPendiente && usuario.roleIds.length === 0) {
            setError('Primero asigna un rol para aprobar esta cuenta.')
            return
        }

        setUsuarioActualizando(usuario.id)
        try {
            const datosActualizacion = cuentaPendiente
                ? { role_ids: usuario.roleIds }
                : { estado: usuario.activo ? 'Inactivo' : 'Activo' }
            await actualizarUsuario(usuario.id, datosActualizacion)
            setMensaje(cuentaPendiente
                ? `Se aprobó la cuenta de ${usuario.nombre}`
                : `Se ${usuario.activo ? 'desactivó' : 'activó'} a ${usuario.nombre}`)
            recargar()
        } catch (err) {
            setError(mensajeError(err))
        } finally {
            setUsuarioActualizando(null)
        }
    }

    const asignarRol = async (usuario, nuevoRoleId) => {
        const roleId = Number(nuevoRoleId)
        if (!Number.isInteger(roleId) || roleId <= 0 || usuario.roleIds[0] === roleId) return
        setError('')
        setMensaje('')
        setUsuarioActualizando(usuario.id)
        try {
            await actualizarUsuario(usuario.id, { role_ids: [roleId] })
            const rolAsignado = datos.rolesAsignables.find((rolApi) => rolApi.id === roleId)
            setMensaje(usuario.estado === 'Pendiente'
                ? `Se asignó ${rolAsignado?.nombre} y se aprobó la cuenta de ${usuario.nombre}`
                : `Se asignó ${rolAsignado?.nombre} a ${usuario.nombre}`)
            setRolesSeleccionados((actuales) => {
                const siguientes = { ...actuales }
                delete siguientes[usuario.id]
                return siguientes
            })
            recargar()
        } catch (err) {
            setError(mensajeError(err))
        } finally {
            setUsuarioActualizando(null)
        }
    }

    if (cargando) return <Cargando texto="Cargando usuarios..." />
    if (!datos) return <MensajeError>{errorCarga}</MensajeError>

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}
            {errorCentros && <MensajeError>{errorCentros}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Usuarios" valor={usuarios.length} icono={Users} />
                <StatCard etiqueta="Instructores" valor={conteos.Instructor} icono={UserCog} color="azul" />
                <StatCard etiqueta="Cuentadantes" valor={conteos.Cuentadante} icono={Warehouse} color="ambar" />
                <StatCard etiqueta="Aprendices" valor={conteos.Aprendiz} icono={GraduationCap} color="rojo" />
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-bold text-[#081B28]">Usuarios</h2>
            </div>

            <SearchBar placeholder="Buscar por nombre o correo..." value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} />
            <FiltroChips opciones={['Todos', ...roles]} valor={rol} onCambiar={setRol} conteos={conteos} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((usuario) => (
                        <Tarjeta key={usuario.id} className="flex h-full flex-col">
                            <div className="flex items-center gap-3">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F7E3] text-sm font-bold text-[#2F8F00]">
                                    {iniciales(usuario.nombre)}
                                </span>
                                <div className="min-w-0">
                                    <h3 className="truncate font-bold text-[#081B28]">{usuario.nombre}</h3>
                                    <p className="truncate text-sm text-[#64748b]">{usuario.correo}</p>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-wrap gap-1">
                                {usuario.roles.map((rolUsuario) => (
                                    <span key={rolUsuario} className="rounded-full bg-[#F4F7FA] px-2.5 py-1 text-xs font-semibold text-[#475569]">
                                        {rolUsuario}
                                    </span>
                                ))}
                            </div>
                            <dl className="mt-4 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                <dt className="text-xs text-[#64748b]">Centro</dt>
                                <dd className="font-semibold text-[#081B28]">
                                    {centros.find((centro) => String(centro.id) === String(usuario.centro))?.nombre
                                        ?? usuario.centro
                                        ?? 'Sin centro'}
                                </dd>
                                <dt className="mt-3 text-xs text-[#64748b]">Estado</dt>
                                <dd className="mt-1">
                                    <EstadoBadge estado={usuario.estado} />
                                </dd>
                            </dl>
                            {usuario.roles.includes('Administrador') ? (
                                <p className="mt-4 text-sm text-[#64748b]">
                                    El rol Administrador no se puede asignar desde este módulo.
                                </p>
                            ) : (
                                <div className="mt-4">
                                    <label htmlFor={`rol-${usuario.id}`} className="mb-1.5 block text-sm font-semibold text-[#081B28]">
                                        Rol
                                    </label>
                                    <select
                                        id={`rol-${usuario.id}`}
                                        value={rolesSeleccionados[usuario.id] ?? String(usuario.roleIds[0] ?? '')}
                                        onChange={(evento) => setRolesSeleccionados((actuales) => ({
                                            ...actuales,
                                            [usuario.id]: evento.target.value,
                                        }))}
                                        disabled={usuarioActualizando === usuario.id}
                                        className={claseInput}
                                    >
                                        <option value="">Selecciona un rol</option>
                                        {datos.rolesAsignables.map((rolDisponible) => (
                                            <option key={rolDisponible.id} value={rolDisponible.id}>
                                                {rolDisponible.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {rolesSeleccionados[usuario.id]
                                        && Number(rolesSeleccionados[usuario.id]) !== usuario.roleIds[0]
                                        && (
                                        <Boton
                                            className="mt-2 w-full"
                                            disabled={usuarioActualizando === usuario.id}
                                            onClick={() => asignarRol(usuario, rolesSeleccionados[usuario.id])}
                                        >
                                            {usuarioActualizando === usuario.id ? 'Guardando...' : 'Guardar rol'}
                                        </Boton>
                                        )}
                                </div>
                            )}
                            <Boton
                                variante={usuario.activo ? 'peligro' : 'secundario'}
                                className="mt-4 w-full"
                                disabled={usuarioActualizando === usuario.id}
                                onClick={() => cambiarEstado(usuario)}
                            >
                                {usuarioActualizando === usuario.id
                                    ? 'Guardando...'
                                    : usuario.estado === 'Pendiente'
                                        ? 'Aprobar cuenta'
                                        : usuario.activo ? 'Desactivar' : 'Activar'}
                            </Boton>
                        </Tarjeta>
                    ))}
                </div>
            ) : (
                <EstadoVacio
                    titulo="No hay usuarios con ese filtro"
                    descripcion="Busca por otro nombre o cambia el rol."
                />
            )}
        </section>
    )
}

export default Usuarios
