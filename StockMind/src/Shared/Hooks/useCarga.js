import { useEffect, useState } from 'react'
import { mensajeError } from '../../Core/Services/apiUtils'

/**
 * Carga datos del backend al entrar a una página.
 *
 *   const { datos, cargando, error, recargar } = useCarga(() => obtenerSedes())
 *   const { datos } = useCarga(() => obtenerSede(id), id)   // vuelve a cargar si cambia el id
 *
 * recargar(): vuelve a pedir los datos (después de crear, editar o eliminar).
 */
export const useCarga = (cargar, clave = '') => {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [version, setVersion] = useState(0)

    useEffect(() => {
        // Si el usuario sale de la página antes de que llegue la respuesta, se ignora
        let vigente = true

        const ejecutar = async () => {
            try {
                const resultado = await cargar()
                if (!vigente) return
                setDatos(resultado)
                setError('')
            } catch (err) {
                if (vigente) setError(mensajeError(err))
            } finally {
                if (vigente) setCargando(false)
            }
        }

        ejecutar()
        return () => {
            vigente = false
        }
        // "cargar" es una función nueva en cada render; solo se repite cuando cambia la clave o se pide recargar
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clave, version])

    const recargar = () => setVersion((actual) => actual + 1)

    return { datos, cargando, error, recargar }
}
