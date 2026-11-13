import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertOctagon, AlertTriangle, ArrowLeft, CircleCheck, Package, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import SearchBar from '../../../Shared/Forms/SearchBar'
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
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtrados.map((elemento) => (
                        <Tarjeta key={elemento.id} className="flex h-full flex-col">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <FotoElemento elemento={elemento} tamano="h-12 w-12" />
                                    <div className="min-w-0">
                                        <h3 className="truncate font-bold text-[#081B28]">{elemento.nombre}</h3>
                                        <p className="text-sm text-[#64748b]">{elemento.codigo_inventario}</p>
                                    </div>
                                </div>
                                <EstadoBadge estado={capitalizar(elemento.estado)} />
                            </div>
                            <dl className="mt-5 grid grid-cols-2 gap-3 rounded-[14px] bg-[#F7F9F6] p-3 text-sm">
                                <div className="col-span-2">
                                    <dt className="text-xs text-[#64748b]">Categoría</dt>
                                    <dd className="font-semibold text-[#081B28]">{elemento.category?.nombre ?? 'Sin categoría'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Condición</dt>
                                    <dd className="mt-1"><EstadoBadge estado={capitalizar(elemento.condicion)} /></dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-[#64748b]">Estado</dt>
                                    <dd className="mt-1"><EstadoBadge estado={capitalizar(elemento.estado)} /></dd>
                                </div>
                            </dl>
                            {puedeReportar && (
                                <Boton
                                    variante="secundario"
                                    icono={AlertTriangle}
                                    className="mt-4 w-full"
                                    onClick={() => setElementoAReportar({ ...elemento, placa: elemento.codigo_inventario })}
                                >
                                    Reportar
                                </Boton>
                            )}
                        </Tarjeta>
                    ))}
                </div>
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
