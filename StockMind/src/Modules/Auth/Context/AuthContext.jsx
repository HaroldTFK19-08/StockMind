import { useEffect, useState } from 'react'

import { eliminarToken, guardarToken, obtenerToken } from '../../../Core/Auth/token'
import { mensajeError } from '../../../Core/Services/apiUtils'
import AuthContext from './AuthContextValue'
import {
    cerrarSesion as cerrarSesionApi,
    iniciarSesion as iniciarSesionApi,
    obtenerUsuarioActual,
    registrarUsuario,
} from '../Services/AuthService'

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(() => Boolean(obtenerToken()))
    const [error, setError] = useState('')

    useEffect(() => {
        let vigente = true

        const validarSesion = async () => {
            if (!obtenerToken()) return

            try {
                const perfil = await obtenerUsuarioActual()
                if (vigente) setUsuario(perfil)
            } catch (err) {
                if (err.response?.status === 401) eliminarToken()
                if (vigente) setError(mensajeError(err))
            } finally {
                if (vigente) setCargando(false)
            }

        }

        const alExpirarSesion = () => {
            setUsuario(null)
            setCargando(false)
            setError('Tu sesión no es válida o ha expirado. Inicia sesión nuevamente.')
        }

        window.addEventListener('stockmind:unauthorized', alExpirarSesion)
        validarSesion()

        return () => {
            vigente = false
            window.removeEventListener('stockmind:unauthorized', alExpirarSesion)
        }
    }, [])

    const iniciarSesionUsuario = async (credenciales) => {
        setError('')
        const respuesta = await iniciarSesionApi(credenciales)
        if (!respuesta?.token || !respuesta?.usuario) {
            throw new Error('El servidor no devolvió los datos de sesión esperados.')
        }

        guardarToken(respuesta.token)
        setUsuario(respuesta.usuario)
        return respuesta.usuario
    }

    const registrarCuenta = (datos) => registrarUsuario(datos)

    const cerrarSesionUsuario = async () => {
        try {
            if (obtenerToken()) await cerrarSesionApi()
            setError('')
        } catch (err) {
            setError(mensajeError(err))
        } finally {
            eliminarToken()
            setUsuario(null)
        }
    }

    const limpiarError = () => setError('')

    return (
        <AuthContext.Provider
            value={{
                usuario,
                cargando,
                error,
                iniciarSesion: iniciarSesionUsuario,
                registrarCuenta,
                cerrarSesion: cerrarSesionUsuario,
                limpiarError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
