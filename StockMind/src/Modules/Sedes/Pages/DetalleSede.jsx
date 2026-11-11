import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, DoorOpen, Package, Pencil, Plus, Trash2, Warehouse } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { capitalizar } from '../../../Shared/Utils/texto'

import { obtenerSede } from '../Services/sedesService'
import { eliminarAmbiente, obtenerAmbientesDeSede } from '../../Ambientes/Services/ambientesService'
import { eliminarAlmacen, obtenerAlmacenesDeSede } from '../../Almacenes/Services/almacenesService'
import TarjetaAmbiente from '../../Ambientes/Components/TarjetaAmbiente'
import ModalAmbiente from '../../Ambientes/Components/ModalAmbiente'
import ModalAlmacen from '../../Almacenes/Components/ModalAlmacen'

/**
 * Ambientes y almacenes de una sede. El id viene de la URL: /admin/sedes/:id
 */
const DetalleSede = ({
    rutaCentros = '/admin/centros',
    rutaAmbientes = '/admin/ambientes',
    rutaInventario = '/admin/inventario',
}) => {
    const { id } = useParams()

    const { datos, cargando, error, recargar } = useCarga(async () => {
        const [sede, ambientes, almacenes] = await Promise.all([
            obtenerSede(id),
            obtenerAmbientesDeSede(id),
            obtenerAlmacenesDeSede(id),
        ])
        return { sede, ambientes, almacenes }
    }, id)

    // tipo: 'ambiente' o 'almacen'. registro: null = nuevo, objeto = editar
    const [modal, setModal] = useState(null)
    const [aEliminar, setAEliminar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    if (cargando) return <Cargando texto="Cargando sede..." />

    if (!datos) {
        return (
            <EstadoVacio titulo="No pudimos abrir esta sede" descripcion={error}>
                <Boton to={rutaCentros} variante="secundario">Ver centros</Boton>
            </EstadoVacio>
        )
    }

    const { sede, ambientes, almacenes } = datos

    const alTerminar = (respuesta) => {
        setModal(null)
        setAEliminar(null)
        setMensaje(respuesta.message)
        recargar()
    }

    return (
        <section>
            <Boton to={`${rutaCentros}/${sede.trainingcenter_id}`} variante="texto" icono={ArrowLeft} className="mb-4 px-0">
                {sede.trainingcenter?.nombre ?? 'Volver al centro'}
            </Boton>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#081B28]">{sede.nombre}</h2>
                <p className="text-sm text-[#64748b]">{sede.direccion} · Zona {sede.zona}</p>
            </div>

            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            {/* ---------- Ambientes ---------- */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-[#081B28]">Ambientes ({ambientes.length})</h3>
                <Boton icono={Plus} onClick={() => setModal({ tipo: 'ambiente', registro: null })}>Nuevo ambiente</Boton>
            </div>

            {ambientes.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {ambientes.map((ambiente) => (
                        <TarjetaAmbiente
                            key={ambiente.id}
                            ambiente={ambiente}
                            rutaDetalle={`${rutaAmbientes}/${ambiente.id}`}
                            onEditar={() => setModal({ tipo: 'ambiente', registro: ambiente })}
                            onEliminar={() => setAEliminar({ tipo: 'ambiente', registro: ambiente })}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="Esta sede todavía no tiene ambientes" descripcion="Crea el primero con el botón «Nuevo ambiente»." icono={DoorOpen} />
            )}

            {/* ---------- Almacenes ---------- */}
            <div className="mb-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold text-[#081B28]">Almacenes ({almacenes.length})</h3>
                <Boton icono={Plus} onClick={() => setModal({ tipo: 'almacen', registro: null })}>Nuevo almacén</Boton>
            </div>

            {almacenes.length > 0 ? (
                <Tabla columnas={['Almacén', 'Elementos guardados', 'Capacidad', 'Estado', 'Acciones']}>
                    {almacenes.map((almacen) => (
                        <tr key={almacen.id}>
                            <td className="font-semibold text-[#081B28]">{almacen.nombre}</td>
                            <td>{almacen.elements_count ?? 0}</td>
                            <td>{almacen.capacidad_elementos}</td>
                            <td><EstadoBadge estado={capitalizar(almacen.estado)} /></td>
                            <td>
                                <div className="flex items-center gap-1">
                                    <Boton to={`${rutaInventario}?almacen=${almacen.id}`} variante="secundario" icono={Package} className="px-3 py-1.5">
                                        Ver elementos
                                    </Boton>
                                    <BotonIcono icono={Pencil} etiqueta={`Editar ${almacen.nombre}`} onClick={() => setModal({ tipo: 'almacen', registro: almacen })} />
                                    <BotonIcono icono={Trash2} etiqueta={`Eliminar ${almacen.nombre}`} variante="peligro" onClick={() => setAEliminar({ tipo: 'almacen', registro: almacen })} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </Tabla>
            ) : (
                <EstadoVacio titulo="Esta sede todavía no tiene almacenes" descripcion="Crea el primero con el botón «Nuevo almacén»." icono={Warehouse} />
            )}

            {/* ---------- Ventanas ---------- */}
            {modal?.tipo === 'ambiente' && (
                <ModalAmbiente ambiente={modal.registro} sedeId={sede.id} onGuardado={alTerminar} onCerrar={() => setModal(null)} />
            )}
            {modal?.tipo === 'almacen' && (
                <ModalAlmacen almacen={modal.registro} sedeId={sede.id} onGuardado={alTerminar} onCerrar={() => setModal(null)} />
            )}

            {aEliminar && (
                <ModalEliminar
                    titulo={aEliminar.tipo === 'ambiente' ? 'Eliminar ambiente' : 'Eliminar almacén'}
                    nombre={aEliminar.registro.nombre}
                    eliminar={() =>
                        aEliminar.tipo === 'ambiente'
                            ? eliminarAmbiente(aEliminar.registro.id)
                            : eliminarAlmacen(aEliminar.registro.id)
                    }
                    onEliminado={alTerminar}
                    onCerrar={() => setAEliminar(null)}
                />
            )}
        </section>
    )
}

export default DetalleSede
