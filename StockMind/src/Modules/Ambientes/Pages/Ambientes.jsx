import { useState } from 'react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import { incluyeTexto } from '../../../Shared/Utils/texto'

import TarjetaAmbiente from '../Components/TarjetaAmbiente'
import ambientesData from '../Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'

/**
 * Lista de ambientes.
 * <Ambientes ambientes={ambientesDelCentro} rutaBase="/instructor/ambientes" />
 * Cada tarjeta lleva a rutaBase + "/" + id del ambiente.
 */
const Ambientes = ({ ambientes = ambientesData, rutaBase, descripcion }) => {
    const [busqueda, setBusqueda] = useState('')

    const filtrados = ambientes.filter((a) => incluyeTexto(a.nombre + a.area, busqueda))

    return (
        <section>
            <p className="mb-6 text-sm text-[#64748b]">
                {descripcion ?? 'Selecciona un ambiente para ver el estado de sus elementos.'}
            </p>

            <SearchBar placeholder="Buscar ambiente por nombre o área..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            {filtrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((ambiente) => (
                        <TarjetaAmbiente
                            key={ambiente.id}
                            ambiente={ambiente}
                            elementos={inventarioData.filter((e) => e.ambienteId === ambiente.id)}
                            rutaDetalle={`${rutaBase}/${ambiente.id}`}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="No encontramos ese ambiente" descripcion="Revisa el nombre o busca por área de formación." />
            )}
        </section>
    )
}

export default Ambientes
