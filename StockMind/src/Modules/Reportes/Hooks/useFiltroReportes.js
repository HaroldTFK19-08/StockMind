import { useMemo, useState } from 'react'

const useFiltroReportes = (reportes) => {
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('Todos')

    const filtrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase()

        return reportes.filter((reporte) => {
            const coincideEstado = estado === 'Todos' || reporte.estado === estado
            const coincideTexto =
                !texto ||
                [reporte.id, reporte.elemento, reporte.placa, reporte.descripcion]
                    .some((campo) => campo.toLowerCase().includes(texto))

            return coincideEstado && coincideTexto
        })
    }, [reportes, busqueda, estado])

    return { busqueda, setBusqueda, estado, setEstado, filtrados }
}

export default useFiltroReportes
