import { useState } from 'react'

import { mensajeError } from '../../../Core/Services/apiUtils'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { incluyeTexto } from '../../../Shared/Utils/texto'
import { useCentros } from '../../Centros/Hooks/Centros'
import { actualizarUsuario, obtenerRoles, obtenerUsuarios } from '../Services/usuariosService'

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
    const cuentasDante = Array.isArray(usuario.danteaccounts) ? usuario.danteaccounts : []
    const rolesApi = Array.isArray(usuario.roles) ? usuario.roles : []

    rolesApi.forEach((rol) => {
        const valor = typeof rol === 'string' ? rol : rol?.rol ?? rol?.name
        const rolNormalizado = nombreRol(valor)
        if (rolNormalizado) rolesUsuario.push(rolNormalizado)
    })

    if (usuario.administrator || usuario.admin) rolesUsuario.push('Administrador')
    if (usuario.teacher) rolesUsuario.push('Instructor')
    if (usuario.apprentice) rolesUsuario.push('Aprendiz')
    if (cuentasDante.length || usuario.danteaccount || usuario.dante_account || usuario.cuentadante) {
        rolesUsuario.push('Cuentadante')
    }

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
        cuentasDante: cuentasDante.map((cuenta) => ({
            id: cuenta.id,
            ambienteId: cuenta.environment_id ?? cuenta.environment?.id,
            ambienteNombre: cuenta.environment?.nombre,
            fechaInicio: cuenta.fecha_inicio,
            fechaFin: cuenta.fecha_fin,
        })),
        roleIds: rolesApi
            .map((rol) => Number(rol?.id))
            .filter((id) => Number.isInteger(id) && id > 0),
        centro,
        estado,
        activo: estado === 'Activo',
    }
}

const cargarDatos = async () => {
    const [usuariosApi, rolesApi] = await Promise.all([obtenerUsuarios(), obtenerRoles()])
    const rolesAsignables = rolesApi
        .map((rol) => ({ id: Number(rol.id), nombre: nombreRol(rol.rol) }))
        .filter((rol) => (
            Number.isInteger(rol.id)
            && rol.id > 0
            && ['Aprendiz', 'Instructor', 'Cuentadante'].includes(rol.nombre)
        ))
    // El administrador no se muestra en la gestión de usuarios: se excluye de
    // la lista, de los conteos y de los chips de filtro.
    const rolesDisponibles = [...new Set(rolesApi.map((rol) => nombreRol(rol.rol)).filter(Boolean))]
        .filter((nombre) => nombre !== 'Administrador')

    return {
        usuarios: usuariosApi
            .map(adaptarUsuario)
            .filter((usuario) => !usuario.roles.includes('Administrador')),
        rolesDisponibles,
        rolesAsignables,
    }
}

const contarRol = (usuarios, rol) => usuarios.filter((usuario) => usuario.roles.includes(rol)).length

export const useUsuarios = () => {
    const { centros, error: errorCentros } = useCentros()
    const { datos, cargando, error: errorCarga, recargar } = useCarga(cargarDatos)
    const usuarios = datos?.usuarios ?? []
    const rolesDisponibles = datos?.rolesDisponibles ?? []
    const [busqueda, setBusqueda] = useState('')
    const [rol, setRol] = useState('Todos')
    const [rolesSeleccionados, setRolesSeleccionados] = useState({})
    const [usuarioActualizando, setUsuarioActualizando] = useState(null)
    const [modalUsuario, setModalUsuario] = useState(null)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const usuariosFiltrados = usuarios.filter(
        (usuario) => (rol === 'Todos' || usuario.roles.includes(rol))
            && incluyeTexto(usuario.nombre + usuario.correo, busqueda)
    )

    const conteos = { Todos: usuarios.length }
    rolesDisponibles.forEach((rolDisponible) => {
        conteos[rolDisponible] = contarRol(usuarios, rolDisponible)
    })

    const seleccionarRol = (usuarioId, roleId) => {
        setRolesSeleccionados((actuales) => ({
            ...actuales,
            [usuarioId]: roleId,
        }))
    }

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

    const abrirModalUsuario = (usuarioId, modo) => setModalUsuario({ id: usuarioId, modo })
    const cerrarModalUsuario = () => setModalUsuario(null)

    const guardarEdicionUsuario = (usuario) => {
        setMensaje(`Se actualizaron los datos de ${nombreUsuario(usuario)}.`)
        setError('')
        setModalUsuario(null)
        recargar()
    }

    return {
        centros,
        errorCentros,
        datos,
        cargando,
        errorCarga,
        usuarios,
        usuariosFiltrados,
        busqueda,
        setBusqueda,
        rol,
        setRol,
        conteos,
        rolesSeleccionados,
        rolesDisponibles,
        seleccionarRol,
        usuarioActualizando,
        error,
        mensaje,
        modalUsuario,
        setModalUsuario,
        cambiarEstado,
        asignarRol,
        abrirModalUsuario,
        cerrarModalUsuario,
        guardarEdicionUsuario,
    }
}
