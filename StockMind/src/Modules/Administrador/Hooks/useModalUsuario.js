import { useEffect, useState } from 'react'

import { erroresDeCampos, mensajeError } from '../../../Core/Services/apiUtils'
import { actualizarUsuario, obtenerUsuario } from '../Services/usuariosService'

const idRolActual = (usuario) => {
    const rolesUsuario = Array.isArray(usuario.roles) ? usuario.roles : []
    const rolConId = rolesUsuario.find((rol) => Number(rol?.id) > 0)
    const id = rolConId?.id ?? usuario.role_id ?? usuario.role_ids?.[0]
    const idNumerico = Number(id)

    return Number.isInteger(idNumerico) && idNumerico > 0 ? String(idNumerico) : ''
}

const valoresIniciales = (usuario) => ({
    nombre_1: usuario.nombre_1 ?? '',
    nombre_2: usuario.nombre_2 ?? '',
    apellido_1: usuario.apellido_1 ?? '',
    apellido_2: usuario.apellido_2 ?? '',
    tipo_identidad: usuario.tipo_identidad ?? '',
    numero_identidad: usuario.numero_identidad ?? '',
    telefono: usuario.telefono ?? '',
    email: usuario.email ?? '',
    role_id: idRolActual(usuario),
})

export const useModalUsuario = ({ usuarioId, onGuardado }) => {
    const [usuario, setUsuario] = useState(null)
    const [valores, setValores] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [errorCarga, setErrorCarga] = useState('')
    const [errores, setErrores] = useState({})
    const [errorGeneral, setErrorGeneral] = useState('')
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        let vigente = true

        const cargarUsuario = async () => {
            setCargando(true)
            setErrorCarga('')

            try {
                const detalle = await obtenerUsuario(usuarioId)
                if (!vigente) return

                setUsuario(detalle)
                setValores(valoresIniciales(detalle))
            } catch (error) {
                if (vigente) setErrorCarga(mensajeError(error))
            } finally {
                if (vigente) setCargando(false)
            }
        }

        cargarUsuario()

        return () => {
            vigente = false
        }
    }, [usuarioId])

    const cambiar = (evento) => {
        const { name, value } = evento.target
        setValores((actuales) => ({ ...actuales, [name]: value }))
        setErrores((actuales) => ({ ...actuales, [name]: undefined }))
        setErrorGeneral('')
    }

    const guardar = async (evento) => {
        evento.preventDefault()
        if (!usuario || !valores || guardando) return

        const datos = {
            nombre_1: valores.nombre_1.trim(),
            apellido_1: valores.apellido_1.trim(),
            tipo_identidad: valores.tipo_identidad,
            numero_identidad: valores.numero_identidad.trim(),
            telefono: valores.telefono.trim(),
            email: valores.email.trim(),
        }

        if (valores.nombre_2.trim()) datos.nombre_2 = valores.nombre_2.trim()
        if (valores.apellido_2.trim()) datos.apellido_2 = valores.apellido_2.trim()

        const roleId = Number(valores.role_id)
        if (
            valores.role_id
            && Number.isInteger(roleId)
            && roleId > 0
            && valores.role_id !== idRolActual(usuario)
        ) {
            datos.role_ids = [roleId]
        }

        setGuardando(true)
        setErrores({})
        setErrorGeneral('')

        try {
            await actualizarUsuario(usuario.id, datos)
            onGuardado(usuario)
        } catch (error) {
            setErrores(erroresDeCampos(error))
            setErrorGeneral(mensajeError(error))
        } finally {
            setGuardando(false)
        }
    }

    return {
        usuario,
        valores,
        cargando,
        errorCarga,
        errores,
        errorGeneral,
        guardando,
        cambiar,
        guardar,
    }
}
