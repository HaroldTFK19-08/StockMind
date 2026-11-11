import { useState } from 'react'
import { Building2, DoorOpen, MapPinned, Plus, Warehouse } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Boton from '../../../Shared/Components/UI/Boton'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { useCarga } from '../../../Shared/Hooks/useCarga'

import TarjetaCentro from '../Components/TarjetaCentro'
import ModalCentro from '../Components/ModalCentro'
import { eliminarCentro, obtenerCentros } from '../Services/centrosService'
import { obtenerSedes } from '../../Sedes/Services/sedesService'

// Pide al mismo tiempo los centros y las sedes (las sedes se usan para los conteos)
const cargarDatos = async () => {
    const [centros, sedes] = await Promise.all([obtenerCentros(), obtenerSedes()])
    return { centros, sedes }
}

// Suma un campo numérico de una lista: sumar(sedes, 'environments_count')
const sumar = (lista, campo) => lista.reduce((total, item) => total + (item[campo] ?? 0), 0)

// Centros de formación (Administrador)
const Centros = ({ rutaBase = '/admin/centros' }) => {
    const { datos, cargando, error, recargar } = useCarga(cargarDatos)
    const [modal, setModal] = useState(null) // null = cerrado | { centro: null } = nuevo | { centro } = editar
    const [centroAEliminar, setCentroAEliminar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    if (cargando) return <Cargando texto="Cargando centros..." />
    if (error && !datos) return <MensajeError>{error}</MensajeError>

    const { centros, sedes } = datos
    const sedesDe = (centroId) => sedes.filter((sede) => sede.trainingcenter_id === centroId)

    // Después de crear, editar o eliminar: cerrar la ventana, avisar y volver a pedir la lista
    const alTerminar = (respuesta) => {
        setModal(null)
        setCentroAEliminar(null)
        setMensaje(respuesta.message)
        recargar()
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Centros de formación" valor={centros.length} icono={Building2} />
                <StatCard etiqueta="Sedes" valor={sedes.length} icono={MapPinned} color="azul" />
                <StatCard etiqueta="Ambientes" valor={sumar(sedes, 'environments_count')} icono={DoorOpen} color="ambar" />
                <StatCard etiqueta="Almacenes" valor={sumar(sedes, 'warehouses_count')} icono={Warehouse} color="rojo" />
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#081B28]">Centros de formación</h2>
                    <p className="text-sm text-[#64748b]">Entra a un centro para ver sus sedes, ambientes y almacenes.</p>
                </div>
                <Boton icono={Plus} onClick={() => setModal({ centro: null })}>Nuevo centro</Boton>
            </div>

            {centros.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {centros.map((centro) => (
                        <TarjetaCentro
                            key={centro.id}
                            centro={centro}
                            totalSedes={sedesDe(centro.id).length}
                            rutaDetalle={`${rutaBase}/${centro.id}`}
                            onEditar={() => setModal({ centro })}
                            onEliminar={() => setCentroAEliminar(centro)}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio titulo="Todavía no hay centros" descripcion="Crea el primer centro de formación con el botón «Nuevo centro»." icono={Building2} />
            )}

            {modal && <ModalCentro centro={modal.centro} onGuardado={alTerminar} onCerrar={() => setModal(null)} />}

            {centroAEliminar && (
                <ModalEliminar
                    titulo="Eliminar centro"
                    nombre={centroAEliminar.nombre}
                    eliminar={() => eliminarCentro(centroAEliminar.id)}
                    onEliminado={alTerminar}
                    onCerrar={() => setCentroAEliminar(null)}
                />
            )}
        </section>
    )
}

export default Centros
