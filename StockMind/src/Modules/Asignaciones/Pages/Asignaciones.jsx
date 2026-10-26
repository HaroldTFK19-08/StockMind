import { useState } from 'react'
import { ClipboardCheck, PackageCheck, Plus, Users } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { fechaHoy, formatearFecha } from '../../../Shared/Utils/fechas'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ModalNuevaAsignacion from '../Components/ModalNuevaAsignacion'
import asignacionesData, { jornadas } from '../Data/asignacionesData'
import inventarioData from '../../Elementos/Data/inventarioData'

// Busca el elemento del inventario por su código
const buscarElemento = (id) => inventarioData.find((e) => e.id === id)

// Asignaciones de elementos a aprendices (Cuentadante)
const Asignaciones = () => {
    const [asignaciones, setAsignaciones] = useState(asignacionesData)
    const [busqueda, setBusqueda] = useState('')
    const [jornada, setJornada] = useState('Todas')
    const [modalAbierto, setModalAbierto] = useState(false)
    const [mensaje, setMensaje] = useState('')

    // Elementos en buen estado que todavía no están asignados
    const idsAsignados = asignaciones.map((a) => a.elementoId)
    const disponibles = inventarioData.filter((e) => e.estado === 'Buen estado' && !idsAsignados.includes(e.id))

    const aprendicesUnicos = new Set(asignaciones.map((a) => a.documento)).size

    const filtradas = asignaciones.filter((a) => {
        const elemento = buscarElemento(a.elementoId)
        return (jornada === 'Todas' || a.jornada === jornada) && incluyeTexto(a.aprendiz + a.documento + elemento.nombre + a.elementoId, busqueda)
    })

    const conteos = { Todas: asignaciones.length }
    jornadas.forEach((j) => (conteos[j] = contarPor(asignaciones, 'jornada', j)))

    // Crea una asignación por cada elemento seleccionado
    const guardarAsignacion = (datosAprendiz, elementosSeleccionados) => {
        const nuevas = elementosSeleccionados.map((elementoId, indice) => ({
            ...datosAprendiz,
            id: Date.now() + indice,
            elementoId,
            fecha: fechaHoy(),
        }))
        setAsignaciones([...nuevas, ...asignaciones])
        setMensaje(`Se asignaron ${nuevas.length} elemento(s) a ${datosAprendiz.aprendiz}`)
    }

    const devolver = (asignacion) => {
        setAsignaciones(asignaciones.filter((a) => a.id !== asignacion.id))
        setMensaje(`${asignacion.aprendiz} devolvió el elemento ${asignacion.elementoId}`)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Asignaciones activas" valor={asignaciones.length} icono={ClipboardCheck} />
                <StatCard etiqueta="Aprendices con elementos" valor={aprendicesUnicos} icono={Users} color="azul" />
                <StatCard etiqueta="Elementos disponibles" valor={disponibles.length} icono={PackageCheck} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Asignaciones</h2>
                <Boton icono={Plus} onClick={() => setModalAbierto(true)}>Nueva asignación</Boton>
            </div>

            <SearchBar placeholder="Buscar por aprendiz, documento o elemento..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={['Todas', ...jornadas]} valor={jornada} onCambiar={setJornada} conteos={conteos} />

            {filtradas.length > 0 ? (
                <Tabla columnas={['Código', 'Elemento', 'Aprendiz a cargo', 'Documento', 'Jornada', 'Desde', '']}>
                    {filtradas.map((asignacion) => (
                        <tr key={asignacion.id}>
                            <td className="font-semibold text-[#081B28]">{asignacion.elementoId}</td>
                            <td>{buscarElemento(asignacion.elementoId).nombre}</td>
                            <td className="font-semibold text-[#081B28]">{asignacion.aprendiz}</td>
                            <td className="whitespace-nowrap">{asignacion.tipoDocumento} {asignacion.documento}</td>
                            <td>{asignacion.jornada}</td>
                            <td className="whitespace-nowrap">{formatearFecha(asignacion.fecha)}</td>
                            <td className="text-right">
                                <Boton variante="secundario" className="px-3 py-1.5" onClick={() => devolver(asignacion)}>Registrar devolución</Boton>
                            </td>
                        </tr>
                    ))}
                </Tabla>
            ) : (
                <EstadoVacio titulo="No hay asignaciones con ese filtro" descripcion="Busca por otro aprendiz o cambia la jornada." />
            )}

            <ModalNuevaAsignacion
                abierto={modalAbierto}
                disponibles={disponibles}
                onCerrar={() => setModalAbierto(false)}
                onGuardar={guardarAsignacion}
            />
        </section>
    )
}

export default Asignaciones
