import { useState } from 'react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import TarjetaAmbiente from '../Components/TarjetaAmbiente'
import { obtenerAmbientes } from '../Services/ambientesService'

/**
 * Lista de ambientes (GET /ambientes).
 * <Ambientes rutaBase="/instructor/ambientes" />
 * Cada tarjeta lleva a rutaBase + "/" + id del ambiente.
 *
 * TODO: cuando esté el inicio de sesión, mostrar solo los ambientes del usuario
 * (por ahora el backend devuelve todos).
 */
const Ambientes = ({ rutaBase, descripcion }) => {
    const { datos: ambientes, cargando, error } = useCarga(obtenerAmbientes)
    const [busqueda, setBusqueda] = useState('')

    if (cargando) return <Cargando texto="Cargando ambientes..." />
    if (!ambientes) return <MensajeError>{error}</MensajeError>

    const filtrados = ambientes.filter((a) => incluyeTexto(a.nombre + a.tipo + (a.headquarter?.nombre ?? ''), busqueda))

    return (
        <section>
            <p className="mb-6 text-sm text-[#64748b]">
                {descripcion ?? 'Selecciona un ambiente para ver el estado de sus elementos.'}
            </p>

            <SearchBar placeholder="Buscar ambiente por nombre, tipo o sede..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((ambiente) => (
                        <TarjetaAmbiente key={ambiente.id} ambiente={ambiente} rutaDetalle={`${rutaBase}/${ambiente.id}`} />
                    ))}
                </div>
            ) : ambientes.length === 0 ? (
                <EstadoVacio titulo="Todavía no hay ambientes" descripcion="El administrador los registra desde la sede de cada centro." />
            ) : (
                <EstadoVacio titulo="No encontramos ese ambiente" descripcion="Revisa el nombre o busca por tipo o sede." />
            )}
        </section>
    )
}

export default Ambientes
