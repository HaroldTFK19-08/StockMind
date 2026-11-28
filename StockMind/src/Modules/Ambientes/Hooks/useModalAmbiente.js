import { useEffect, useState } from 'react'

import { mensajeError } from '../../../Core/Services/apiUtils'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'
import { obtenerUsuarios } from '../../Administrador/Services/usuariosService'
import { actualizarAmbiente, crearAmbiente } from '../Services/ambientesService'

const normalizarRol = (rol) => String(
    typeof rol === 'string' ? rol : rol?.rol ?? rol?.name ?? ''
).toLowerCase().replace(/[^a-z]/g, '')

const esCuentadanteDisponible = (usuario) => {
    const activo = String(usuario.estado ?? '').toLowerCase() === 'activo'
        || usuario.activo === true
        || usuario.active === true
    const tieneRolCuentadante = Array.isArray(usuario.roles)
        && usuario.roles.some((rol) => normalizarRol(rol) === 'cuentadante')
    const tieneCuentaVigente = Array.isArray(usuario.danteaccounts)
        && usuario.danteaccounts.some((cuenta) => !cuenta.fecha_fin)

    return activo && tieneRolCuentadante && !tieneCuentaVigente
}

const adaptarCuentadante = (usuario) => ({
    id: usuario.id,
    nombre: [
        usuario.nombre_1,
        usuario.nombre_2,
        usuario.apellido_1,
        usuario.apellido_2,
    ].filter(Boolean).join(' ')
        || usuario.email
        || `Usuario #${usuario.id}`,
})

export const useModalAmbiente = ({ ambiente, sedeId, onGuardado }) => {
    const editando = Boolean(ambiente)
    const [cuentadantes, setCuentadantes] = useState([])
    const [cargandoCuentadantes, setCargandoCuentadantes] = useState(!editando)
    const [errorCuentadantes, setErrorCuentadantes] = useState('')

    useEffect(() => {
        if (editando) return undefined

        let vigente = true

        const cargarCuentadantes = async () => {
            setCargandoCuentadantes(true)
            setErrorCuentadantes('')

            try {
                const usuarios = await obtenerUsuarios()
                if (vigente) {
                    setCuentadantes(usuarios.filter(esCuentadanteDisponible).map(adaptarCuentadante))
                }
            } catch (error) {
                if (vigente) setErrorCuentadantes(mensajeError(error))
            } finally {
                if (vigente) setCargandoCuentadantes(false)
            }
        }

        cargarCuentadantes()

        return () => {
            vigente = false
        }
    }, [editando])

    const formulario = useFormulario(
        {
            headquarter_id: ambiente?.headquarter_id ?? sedeId,
            nombre: ambiente?.nombre ?? '',
            tipo: ambiente?.tipo ?? '',
            capacidad: ambiente?.capacidad ?? '',
            estado: ambiente?.estado ?? 'activo',
            cuentadante_id: '',
        },
        (valores) => {
            const { cuentadante_id: cuentadanteId, ...datos } = valores

            return editando
                ? actualizarAmbiente(ambiente.id, datos)
                : crearAmbiente({
                    ...datos,
                    cuentadante_id: cuentadanteId ? Number(cuentadanteId) : null,
                })
        },
        onGuardado
    )

    return {
        editando,
        formulario,
        cuentadantes,
        cargandoCuentadantes,
        errorCuentadantes,
    }
}
