import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, MapPinned, Plus } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { useCarga } from '../../../Shared/Hooks/useCarga'

import { obtenerCentro } from '../Services/centrosService'
import { eliminarSede, obtenerSedesDeCentro } from '../../Sedes/Services/sedesService'
import TarjetaSede from '../../Sedes/Components/TarjetaSede'
import ModalSede from '../../Sedes/Components/ModalSede'

/**
 * Sedes de un centro. El id viene de la URL: /admin/centros/:id
 * Desde cada sede se entra a sus ambientes y almacenes (/admin/sedes/:id).
 */
const DetalleCentro = ({ rutaCentros = '/admin/centros', rutaSedes = '/admin/sedes' }) => {
    const { id } = useParams()

    const { datos, cargando, error, recargar } = useCarga(async () => {
        const [centro, sedes] = await Promise.all([obtenerCentro(id), obtenerSedesDeCentro(id)])
        return { centro, sedes }
    }, id)

    const [modal, setModal] = useState(null) // null = cerrado | { sede: null } = nueva | { sede } = editar
    const [sedeAEliminar, setSedeAEliminar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    if (cargando) return <Cargando texto="Cargando centro..." />

    // No existe el centro o no hubo conexión
    if (!datos) {
        return (
            <EstadoVacio titulo="No pudimos abrir este centro" descripcion={error}>
                <Boton to={rutaCentros} variante="secundario">Ver centros</Boton>
            </EstadoVacio>
        )
    }

    const { centro, sedes } = datos

    const alTerminar = (respuesta) => {
        setModal(null)
        setSedeAEliminar(null)
        setMensaje(respuesta.message)
        recargar()
    }

    return (
        <section>
            <Boton to={rutaCentros} variante="texto" icono={ArrowLeft} className="mb-4 px-0">Todos los centros</Boton>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#081B28]">{centro.nombre}</h2>
                    <p className="text-sm text-[#64748b]">Regional {centro.regional} · {centro.ciudad}</p>
                </div>
                <Boton icono={Plus} onClick={() => setModal({ sede: null })}>Nueva sede</Boton>
            </div>

            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            {sedes.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {sedes.map((sede) => (
                        <TarjetaSede
                            key={sede.id}
                            sede={sede}
                            rutaDetalle={`${rutaSedes}/${sede.id}`}
                            onEditar={() => setModal({ sede })}
                            onEliminar={() => setSedeAEliminar(sede)}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="Este centro todavía no tiene sedes" descripcion="Crea una sede para registrar sus ambientes y almacenes." icono={MapPinned} />
            )}

            {modal && <ModalSede sede={modal.sede} centroId={centro.id} onGuardado={alTerminar} onCerrar={() => setModal(null)} />}

            {sedeAEliminar && (
                <ModalEliminar
                    titulo="Eliminar sede"
                    nombre={sedeAEliminar.nombre}
                    eliminar={() => eliminarSede(sedeAEliminar.id)}
                    onEliminado={alTerminar}
                    onCerrar={() => setSedeAEliminar(null)}
                />
            )}
        </section>
    )
}

export default DetalleCentro
