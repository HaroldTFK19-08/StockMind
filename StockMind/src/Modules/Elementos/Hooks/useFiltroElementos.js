import { useMemo, useState } from 'react'

const useFiltroElementos = (elementos) => {
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('Todos')

    const filtrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase()

        return elementos.filter((elemento) => {
            const coincideEstado = estado === 'Todos' || elemento.estado === estado
            const coincideTexto =
                !texto ||
                [elemento.nombre, elemento.placa, elemento.serial]
                    .some((campo) => campo.toLowerCase().includes(texto))

            return coincideEstado && coincideTexto
        })
    }, [elementos, busqueda, estado])

    return { busqueda, setBusqueda, estado, setEstado, filtrados }
}

export default useFiltroElementos
