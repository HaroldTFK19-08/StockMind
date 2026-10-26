import { useState } from 'react'
import { BellOff, CheckCheck } from 'lucide-react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Boton from '../../../Shared/Components/UI/Boton'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import TarjetaNotificacion from '../Components/TarjetaNotificacion'

/**
 * Centro de notificaciones. Cada rol le pasa su lista:
 * <Notificaciones datos={notificacionesAprendiz} />
 */
const Notificaciones = ({ datos = [] }) => {
    const [notificaciones, setNotificaciones] = useState(datos)
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState('Todas')

    const sinLeer = notificaciones.filter((n) => !n.leida).length

    const visibles = notificaciones.filter((n) => {
        const coincideFiltro = filtro === 'Todas' || !n.leida
        const coincideTexto = incluyeTexto(n.titulo + n.mensaje, busqueda)
        return coincideFiltro && coincideTexto
    })

    const marcarLeida = (id) => {
        setNotificaciones(notificaciones.map((n) => (n.id === id ? { ...n, leida: true } : n)))
    }

    const marcarTodas = () => {
        setNotificaciones(notificaciones.map((n) => ({ ...n, leida: true })))
    }

    return (
        <section className="mx-auto max-w-[860px]">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#64748b]">
                    {sinLeer > 0 ? `Tienes ${sinLeer} notificaciones sin leer.` : 'Estás al día.'}
                </p>
                {sinLeer > 0 && (
                    <Boton variante="secundario" icono={CheckCheck} onClick={marcarTodas}>
                        Marcar todas como leídas
                    </Boton>
                )}
            </div>

            <SearchBar
                placeholder="Buscar notificaciones..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <FiltroChips
                opciones={['Todas', 'Sin leer']}
                valor={filtro}
                onCambiar={setFiltro}
                conteos={{ Todas: notificaciones.length, 'Sin leer': sinLeer }}
            />

            {visibles.length > 0 ? (
                <div className="space-y-4">
                    {visibles.map((notificacion) => (
                        <TarjetaNotificacion key={notificacion.id} notificacion={notificacion} onMarcarLeida={marcarLeida} />
                    ))}
                </div>
            ) : (
                <EstadoVacio icono={BellOff} titulo="No hay notificaciones" descripcion="Cuando pase algo con tus elementos o reportes, te avisaremos aquí." />
            )}
        </section>
    )
}

export default Notificaciones
