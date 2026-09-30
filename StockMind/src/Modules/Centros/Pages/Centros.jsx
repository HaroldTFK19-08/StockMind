import { useState } from 'react'
import { Building2, DoorOpen, Package, Plus } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'

import TarjetaCentro from '../Components/TarjetaCentro'
import centrosData from '../Data/centrosData'
import ambientesData from '../../Ambientes/Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'

const centroVacio = { nombre: '', sigla: '', ciudad: 'Popayán' }

// Centros de formación (Administrador)
const Centros = ({ rutaBase = '/admin/centros' }) => {
    const [centros, setCentros] = useState(centrosData)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [nuevo, setNuevo] = useState(centroVacio)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    // Ambientes y elementos de un centro
    const ambientesDe = (centroId) => ambientesData.filter((a) => a.centroId === centroId)
    const elementosDe = (centroId) => {
        const ids = ambientesDe(centroId).map((a) => a.id)
        return inventarioData.filter((e) => ids.includes(e.ambienteId))
    }

    const cambiarCampo = (evento) => setNuevo({ ...nuevo, [evento.target.name]: evento.target.value })

    const guardarCentro = (evento) => {
        evento.preventDefault()
        if (!nuevo.nombre.trim() || !nuevo.sigla.trim()) return setError('Escribe el nombre y la sigla')

        setCentros([...centros, { ...nuevo, id: centros.length + 1, estado: 'Activa' }])
        setMensaje(`Se creó el centro ${nuevo.nombre}`)
        setNuevo(centroVacio)
        setError('')
        setModalAbierto(false)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Centros de formación" valor={centros.length} icono={Building2} />
                <StatCard etiqueta="Ambientes" valor={ambientesData.length} icono={DoorOpen} color="azul" />
                <StatCard etiqueta="Elementos" valor={inventarioData.length} icono={Package} color="ambar" />
            </div>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#081B28]">Centros de formación</h2>
                    <p className="text-sm text-[#64748b]">Consulta los ambientes y elementos de cada centro.</p>
                </div>
                <Boton icono={Plus} onClick={() => setModalAbierto(true)}>Nuevo centro</Boton>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {centros.map((centro) => (
                    <TarjetaCentro
                        key={centro.id}
                        centro={centro}
                        totalAmbientes={ambientesDe(centro.id).length}
                        totalElementos={elementosDe(centro.id).length}
                        rutaDetalle={`${rutaBase}/${centro.id}`}
                    />
                ))}
            </div>

            <Modal abierto={modalAbierto} titulo="Nuevo centro de formación" onCerrar={() => setModalAbierto(false)} ancho="max-w-[460px]">
                <form onSubmit={guardarCentro} className="space-y-4">
                    <Campo etiqueta="Nombre del centro" htmlFor="nombre">
                        <input id="nombre" name="nombre" value={nuevo.nombre} onChange={cambiarCampo} className={claseInput} />
                    </Campo>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Sigla" htmlFor="sigla">
                            <input id="sigla" name="sigla" value={nuevo.sigla} onChange={cambiarCampo} placeholder="Ej: CCYS" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Ciudad" htmlFor="ciudad">
                            <input id="ciudad" name="ciudad" value={nuevo.ciudad} onChange={cambiarCampo} className={claseInput} />
                        </Campo>
                    </div>
                    {error && <p className="text-sm text-[#dc2626]">{error}</p>}
                    <div className="flex justify-end gap-2 pt-2">
                        <Boton variante="texto" onClick={() => setModalAbierto(false)}>Cancelar</Boton>
                        <Boton type="submit">Crear centro</Boton>
                    </div>
                </form>
            </Modal>
        </section>
    )
}

export default Centros
