import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, DoorOpen, Plus, Warehouse } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { useCarga } from '../../../Shared/Hooks/useCarga'

import { obtenerSede } from '../Services/sedesService'
import { eliminarAmbiente, obtenerAmbientesDeSede } from '../../Ambientes/Services/ambientesService'
import { eliminarAlmacen, obtenerAlmacenesDeSede } from '../../Almacenes/Services/almacenesService'
import TarjetaAmbiente from '../../Ambientes/Components/TarjetaAmbiente'
import ModalAmbiente from '../../Ambientes/Components/ModalAmbiente'
import TarjetaAlmacen from '../../Almacenes/Components/TarjetaAlmacen'
import ModalAlmacen from '../../Almacenes/Components/ModalAlmacen'
import ModalDetalleAlmacen from '../../Almacenes/Components/ModalDetalleAlmacen'

// Cabecera de sección reutilizable para Ambientes / Almacenes.
const EncabezadoSeccion = ({ titulo, cantidad, icono: Icono, accion }) => (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#39A900]/10 text-[#2F8F00]">
                <Icono size={20} />
            </span>
            <div>
                <h3 className="text-lg font-bold text-[#081B28]">{titulo}</h3>
                <p className="text-sm text-[#64748b]">{cantidad} {cantidad === 1 ? 'registro' : 'registros'}</p>
            </div>
        </div>
        {accion}
    </div>
)

/**
 * Detalle de sede: muestra ambientes y almacenes asociados.
 * Ruta: /admin/sedes/:id (o equivalente por rol).
 */
const DetalleSede = ({
    rutaCentros = '/admin/centros',
    rutaAmbientes = '/admin/ambientes',
    rutaInventario = '/admin/inventario',
}) => {
    const { id } = useParams()
    const [modal, setModal] = useState(null) // { tipo: 'ambiente'|'almacen', registro }
    const [aEliminar, setAEliminar] = useState(null)
    const [almacenAConsultar, setAlmacenAConsultar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    const { datos, cargando, error, recargar } = useCarga(async () => {
        const [sede, ambientes, almacenes] = await Promise.all([
            obtenerSede(id),
            obtenerAmbientesDeSede(id),
            obtenerAlmacenesDeSede(id),
        ])
        return { sede, ambientes, almacenes }
    }, id)

    if (cargando) return <Cargando texto="Cargando sede..." />

    if (!datos) {
        return (
            <EstadoVacio titulo="No pudimos abrir esta sede" descripcion={error}>
                <Boton to={rutaCentros} variante="secundario">Ver centros</Boton>
            </EstadoVacio>
        )
    }

    const { sede, ambientes, almacenes } = datos

    // Cierra modales, muestra mensaje del backend y recarga la vista.
    const alTerminar = (respuesta) => {
        setModal(null)
        setAEliminar(null)
        setMensaje(respuesta.message)
        recargar()
    }

    return (
        <section className="space-y-8">
            {/* Cabecera de la sede */}
            <div>
                <Boton
                    to={`${rutaCentros}/${sede.trainingcenter_id}`}
                    variante="texto"
                    icono={ArrowLeft}
                    className="mb-4 px-0"
                >
                    {sede.trainingcenter?.nombre ?? 'Volver al centro'}
                </Boton>

                <div className="rounded-[24px] border border-[#e6ece4] bg-white p-6 shadow-[0_4px_18px_rgba(8,27,40,0.03)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#39A900]">Sede</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-[#081B28] sm:text-3xl">{sede.nombre}</h2>
                    <p className="mt-2 text-sm text-[#64748b]">{sede.direccion} · Zona {sede.zona}</p>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-sm">
                        <div className="rounded-2xl bg-[#f7faf6] px-4 py-3">
                            <p className="text-2xl font-bold text-[#081B28]">{ambientes.length}</p>
                            <p className="text-xs font-medium text-[#64748b]">Ambientes</p>
                        </div>
                        <div className="rounded-2xl bg-[#f7faf6] px-4 py-3">
                            <p className="text-2xl font-bold text-[#081B28]">{almacenes.length}</p>
                            <p className="text-xs font-medium text-[#64748b]">Almacenes</p>
                        </div>
                    </div>
                </div>
            </div>

            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            {/* Ambientes */}
            <div className="rounded-[24px] border border-[#e6ece4] bg-white p-6 shadow-[0_4px_18px_rgba(8,27,40,0.03)]">
                <EncabezadoSeccion
                    titulo="Ambientes"
                    cantidad={ambientes.length}
                    icono={DoorOpen}
                    accion={<Boton icono={Plus} onClick={() => setModal({ tipo: 'ambiente', registro: null })}>Nuevo ambiente</Boton>}
                />

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
                    <EstadoVacio
                        titulo="Esta sede todavía no tiene ambientes"
                        descripcion="Crea el primero para empezar a organizar los espacios."
                        icono={DoorOpen}
                    />
                )}
            </div>

            {/* Almacenes */}
            <div className="rounded-[24px] border border-[#e6ece4] bg-white p-6 shadow-[0_4px_18px_rgba(8,27,40,0.03)]">
                <EncabezadoSeccion
                    titulo="Almacenes"
                    cantidad={almacenes.length}
                    icono={Warehouse}
                    accion={<Boton icono={Plus} onClick={() => setModal({ tipo: 'almacen', registro: null })}>Nuevo almacén</Boton>}
                />

                {almacenes.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {almacenes.map((almacen) => (
                            <TarjetaAlmacen
                                key={almacen.id}
                                almacen={almacen}
                                rutaInventario={rutaInventario}
                                onConsultar={() => setAlmacenAConsultar(almacen)}
                                onEditar={() => setModal({ tipo: 'almacen', registro: almacen })}
                                onEliminar={() => setAEliminar({ tipo: 'almacen', registro: almacen })}
                            />
                        ))}
                    </div>
                ) : (
                    <EstadoVacio
                        titulo="Esta sede todavía no tiene almacenes"
                        descripcion="Crea el primero para registrar dónde se guardan los elementos."
                        icono={Warehouse}
                    />
                )}
            </div>

            {/* Modales */}
            {modal?.tipo === 'ambiente' && (
                <ModalAmbiente
                    ambiente={modal.registro}
                    sedeId={sede.id}
                    onGuardado={alTerminar}
                    onCerrar={() => setModal(null)}
                />
            )}
            {modal?.tipo === 'almacen' && (
                <ModalAlmacen
                    almacen={modal.registro}
                    sedeId={sede.id}
                    onGuardado={alTerminar}
                    onCerrar={() => setModal(null)}
                />
            )}
            {almacenAConsultar && (
                <ModalDetalleAlmacen
                    key={almacenAConsultar.id}
                    almacenId={almacenAConsultar.id}
                    onCerrar={() => setAlmacenAConsultar(null)}
                />
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
