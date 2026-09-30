import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'

import { buscarCentro } from '../Data/centrosData'
import ambientesData from '../../Ambientes/Data/ambientesData'
import Ambientes from '../../Ambientes/Pages/Ambientes'

/**
 * Ambientes de un centro. El id viene de la URL: /admin/centros/:id
 * Reutiliza la página Ambientes, pero solo con los ambientes de este centro.
 * (Antes había una página por centro: Centro01, Centro02, Centro03)
 */
const DetalleCentro = ({ rutaCentros = '/admin/centros', rutaAmbientes = '/admin/ambientes' }) => {
    const { id } = useParams()
    const centro = buscarCentro(id)

    if (!centro) {
        return (
            <EstadoVacio titulo="Este centro no existe" descripcion="Vuelve a la lista de centros y elige otro.">
                <Boton to={rutaCentros} variante="secundario">Ver centros</Boton>
            </EstadoVacio>
        )
    }

    return (
        <section>
            <Boton to={rutaCentros} variante="texto" icono={ArrowLeft} className="mb-4 px-0">Todos los centros</Boton>
            <h2 className="text-2xl font-bold text-[#081B28]">{centro.nombre}</h2>

            <Ambientes
                ambientes={ambientesData.filter((a) => a.centroId === centro.id)}
                rutaBase={rutaAmbientes}
                descripcion={`Ambientes del ${centro.sigla} en ${centro.ciudad}. Entra a uno para ver su inventario.`}
            />
        </section>
    )
}

export default DetalleCentro
