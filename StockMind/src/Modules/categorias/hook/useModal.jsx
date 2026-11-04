import { useState } from 'react'

export const useCategoriasModal = () => {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    // Abrir modal
    const abrirModal = () => setModalAbierto(true)

    // Cerrar y limpiar campos
    const cerrarModal = () => {
        setModalAbierto(false)
        setNombre('')
        setDescripcion('')
    }

    return {
        modalAbierto,
        abrirModal,
        cerrarModal,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
    }
}