import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, ArrowLeft, CircleCheck, Package, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { claseInput } from '../../../Shared/Components/Forms/Campo'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import { buscarAmbiente } from '../Data/ambientesData'
import { buscarCentro } from '../../Centros/Data/centrosData'
import inventarioData, { estadosElemento } from '../../Elementos/Data/inventarioData'
import FotoElemento from '../../Elementos/Components/FotoElemento'
import ModalReporteFalla from '../../Reportes/Components/ModalReporteFalla'

/**
 * Inventario de un ambiente. El id viene de la URL: /instructor/ambientes/:id
 * puedeReportar: muestra el botón "Reportar" en cada elemento (Instructor).
 */
const DetalleAmbiente = ({ puedeReportar = false }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('')
    const [elementoAReportar, setElementoAReportar] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const ambiente = buscarAmbiente(id)
    if (!ambiente) {
        return (
            <EstadoVacio titulo="Este ambiente no existe" descripcion="Puede que lo hayan eliminado o que el enlace esté mal.">
                <Boton variante="secundario" onClick={() => navigate(-1)}>Volver</Boton>
            </EstadoVacio>
        )
    }
    const elementos = inventarioData.filter((e) => e.ambienteId === ambiente.id)
    const filtrados = elementos.filter(
        (e) => (estado === '' || e.estado === estado) && incluyeTexto(e.nombre + e.placa + e.id, busqueda)
    )
    const enviarReporte = (reporte) => {
        console.log('Reporte de falla:', reporte) // TODO: enviar al backend
        setElementoAReportar(null)
        setMensaje(`Reporte enviado para ${reporte.elemento} (${reporte.placa})`)
    }
    return (
        <section>
            <Boton variante="texto" icono={ArrowLeft} className="mb-4 px-0" onClick={() => navigate(-1)}>
                Volver
            </Boton>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#081B28]">{ambiente.nombre}</h2>
                <p className="text-sm text-[#64748b]">
                    {ambiente.area} · {buscarCentro(ambiente.centroId)?.nombre} · Capacidad {ambiente.capacidad} aprendices
                </p>
            </div>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Total de elementos" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="Buen estado" valor={contarPor(elementos, 'estado', 'Buen estado')} icono={CircleCheck} color="azul" />
                <StatCard etiqueta="En reparación" valor={contarPor(elementos, 'estado', 'En reparación')} icono={Wrench} color="ambar" />
                <StatCard etiqueta="Dañados" valor={contarPor(elementos, 'estado', 'Dañado')} icono={AlertOctagon} color="rojo" />
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                <SearchBar placeholder="Buscar por nombre, código o placa..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} className={`${claseInput} mb-5 py-[13px]`}>
                    <option value="">Todos los estados</option>
                    {estadosElemento.map((e) => <option key={e}>{e}</option>)}
                </select>
            </div>
            {filtrados.length > 0 ? (
                <Tabla columnas={puedeReportar ? ['Código', 'Elemento', 'Placa', 'Estado', ''] : ['Código', 'Elemento', 'Placa', 'Estado']}>
                    {filtrados.map((elemento) => (
                        <tr key={elemento.id}>
                            <td className="font-semibold text-[#081B28]">{elemento.id}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <FotoElemento elemento={elemento} />
                                    <span className="font-semibold text-[#081B28]">{elemento.nombre}</span>
                                </div>
                            </td>
                            <td>{elemento.placa}</td>
                            <td><EstadoBadge estado={elemento.estado} /></td>
                            {puedeReportar && (
                                <td className="text-right">
                                    <Boton variante="secundario" icono={AlertTriangle} className="px-3 py-1.5" onClick={() => setElementoAReportar(elemento)}>
                                        Reportar
                                    </Boton>
                                </td>
                            )}
                        </tr>
                    ))}
                </Tabla>
            ) : (
                <EstadoVacio titulo="No hay elementos con ese filtro" descripcion="Cambia el estado o la búsqueda." />
            )}
            {puedeReportar && (
                <ModalReporteFalla
                    elemento={elementoAReportar}
                    onCerrar={() => setElementoAReportar(null)}
                    onEnviar={enviarReporte}
                />
            )}
        </section>
    )
}

export default DetalleAmbiente
