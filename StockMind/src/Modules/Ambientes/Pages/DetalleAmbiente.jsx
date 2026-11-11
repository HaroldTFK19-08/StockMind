import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, ArrowLeft, CircleCheck, Package, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import { claseInput } from '../../../Shared/Components/Forms/Campo'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { capitalizar, contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import { obtenerAmbiente } from '../Services/ambientesService'
import { obtenerElementosDeAmbiente } from '../../Elementos/Services/elementosService'
import { estadosElemento } from '../../Elementos/Data/opcionesElemento'
import FotoElemento from '../../Elementos/Components/FotoElemento'
import ModalReporteFalla from '../../Reportes/Components/ModalReporteFalla'

/**
 * Inventario de un ambiente. El id viene de la URL: /instructor/ambientes/:id
 * Consume GET /ambientes/:id y GET /elementos (filtrando los de este ambiente).
 * puedeReportar: muestra el botón "Reportar" en cada elemento (Instructor).
 */
const DetalleAmbiente = ({ puedeReportar = false }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { datos, cargando, error } = useCarga(async () => {
        const [ambiente, elementos] = await Promise.all([obtenerAmbiente(id), obtenerElementosDeAmbiente(id)])
        return { ambiente, elementos }
    }, id)

    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('')
    const [elementoAReportar, setElementoAReportar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    if (cargando) return <Cargando texto="Cargando ambiente..." />

    if (!datos) {
        return (
            <EstadoVacio titulo="No pudimos abrir este ambiente" descripcion={error}>
                <Boton variante="secundario" onClick={() => navigate(-1)}>Volver</Boton>
            </EstadoVacio>
        )
    }

    const { ambiente, elementos } = datos

    const filtrados = elementos.filter(
        (e) => (estado === '' || e.estado === estado) && incluyeTexto(e.nombre + e.codigo_inventario + (e.serial ?? ''), busqueda)
    )

    const enviarReporte = (reporte) => {
        console.log('Reporte de falla:', reporte) // TODO: enviar al backend (módulo de reportes)
        setElementoAReportar(null)
        setMensaje(`Reporte enviado para ${reporte.elemento} (${reporte.placa})`)
    }

    const columnas = ['Código', 'Elemento', 'Categoría', 'Condición', 'Estado']

    return (
        <section>
            <Boton variante="texto" icono={ArrowLeft} className="mb-4 px-0" onClick={() => navigate(-1)}>
                Volver
            </Boton>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#081B28]">{ambiente.nombre}</h2>
                <p className="text-sm text-[#64748b]">
                    {ambiente.tipo} · {ambiente.headquarter?.nombre} · Capacidad {ambiente.capacidad}
                </p>
            </div>

            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Total de elementos" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="En buena condición" valor={contarPor(elementos, 'condicion', 'bueno')} icono={CircleCheck} color="azul" />
                <StatCard etiqueta="Condición regular" valor={contarPor(elementos, 'condicion', 'regular')} icono={Wrench} color="ambar" />
                <StatCard etiqueta="En mala condición" valor={contarPor(elementos, 'condicion', 'malo')} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                <SearchBar placeholder="Buscar por nombre, código o serial..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} className={`${claseInput} mb-5 py-[13px]`}>
                    <option value="">Todos los estados</option>
                    {estadosElemento.map((e) => <option key={e} value={e}>{capitalizar(e)}</option>)}
                </select>
            </div>

            {filtrados.length > 0 ? (
                <Tabla columnas={puedeReportar ? [...columnas, ''] : columnas}>
                    {filtrados.map((elemento) => (
                        <tr key={elemento.id}>
                            <td className="font-semibold text-[#081B28]">{elemento.codigo_inventario}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <FotoElemento elemento={elemento} />
                                    <span className="font-semibold text-[#081B28]">{elemento.nombre}</span>
                                </div>
                            </td>
                            <td>{elemento.category?.nombre}</td>
                            <td><EstadoBadge estado={capitalizar(elemento.condicion)} /></td>
                            <td><EstadoBadge estado={capitalizar(elemento.estado)} /></td>
                            {puedeReportar && (
                                <td className="text-right">
                                    {/* El formulario de reporte usa "placa": aquí es el código de inventario */}
                                    <Boton
                                        variante="secundario"
                                        icono={AlertTriangle}
                                        className="px-3 py-1.5"
                                        onClick={() => setElementoAReportar({ ...elemento, placa: elemento.codigo_inventario })}
                                    >
                                        Reportar
                                    </Boton>
                                </td>
                            )}
                        </tr>
                    ))}
                </Tabla>
            ) : elementos.length === 0 ? (
                <EstadoVacio titulo="Este ambiente todavía no tiene elementos" descripcion="Los elementos se registran desde el inventario." icono={Package} />
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
