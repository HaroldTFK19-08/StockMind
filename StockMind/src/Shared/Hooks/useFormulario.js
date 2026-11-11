import { useState } from 'react'
import { erroresDeCampos, mensajeError } from '../../Core/Services/apiUtils'

/**
 * Maneja un formulario que se guarda en el backend.
 *
 *   const formulario = useFormulario(valoresIniciales, (valores) => crearSede(valores), onGuardado)
 *
 *   <form onSubmit={formulario.enviar}>
 *       <input name="nombre" value={formulario.valores.nombre} onChange={formulario.cambiar} />
 *
 * - errores: mensajes de validación de Laravel por campo ({ nombre: "..." })
 * - errorGeneral: mensaje general (regla de negocio, sin conexión, etc.)
 * - onGuardado(respuesta): se llama cuando el backend responde bien ({ message, data })
 */
export const useFormulario = (valoresIniciales, guardar, onGuardado) => {
    const [valores, setValores] = useState(valoresIniciales)
    const [errores, setErrores] = useState({})
    const [errorGeneral, setErrorGeneral] = useState('')
    const [guardando, setGuardando] = useState(false)

    // Sirve para inputs, selects, textareas y también para inputs de archivo
    const cambiar = (evento) => {
        const { name, type, value, files } = evento.target
        const nuevoValor = type === 'file' ? files[0] ?? null : value
        setValores((actuales) => ({ ...actuales, [name]: nuevoValor }))
    }

    const enviar = async (evento) => {
        evento.preventDefault()
        setGuardando(true)
        setErrores({})
        setErrorGeneral('')
        try {
            const respuesta = await guardar(valores)
            onGuardado(respuesta)
        } catch (error) {
            setErrores(erroresDeCampos(error))
            setErrorGeneral(mensajeError(error))
        } finally {
            setGuardando(false)
        }
    }

    return { valores, cambiar, errores, errorGeneral, guardando, enviar }
}
