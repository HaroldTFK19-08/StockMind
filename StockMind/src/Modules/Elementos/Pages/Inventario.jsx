import { useState } from 'react'
import { AlertOctagon, CircleCheck, Package, Plus, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import Boton from '../../../Shared/Components/UI/Boton'
import { claseInput } from '../../../Shared/Components/Forms/Campo'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import ambientesData, { nombreAmbiente } from '../../Ambientes/Data/ambientesData'
import FotoElemento from '../Components/FotoElemento'
import ModalNuevoElemento from '../Components/ModalNuevoElemento'
import inventarioData, { categorias, estadosElemento } from '../Data/inventarioData'

/**
 * Inventario de elementos.
 * - Cuentadante: <Inventario elementos={elementosDeSusAmbientes} />
 * - Administrador: <Inventario puedeAgregar />  (ve todo y puede agregar)
 */
const Inventario = ({ elementos: elementosIniciales = inventarioData, puedeAgregar = false }) => {
    const [elementos, setElementos] = useState(elementosIniciales)
    const [busqueda, setBusqueda] = useState('')
    const [categoria, setCategoria] = useState('Todas')
    const [estado, setEstado] = useState('')
    const [ambienteId, setAmbienteId] = useState('')
    const [modalAbierto, setModalAbierto] = useState(false)
    const [mensaje, setMensaje] = useState('')

    // Solo se muestran en el filtro los ambientes que tienen elementos
    const ambientesConElementos = ambientesData.filter((a) => elementos.some((e) => e.ambienteId === a.id))

    const filtrados = elementos.filter((elemento) => {
        return (
            (categoria === 'Todas' || elemento.categoria === categoria) &&
            (estado === '' || elemento.estado === estado) &&
            (ambienteId === '' || elemento.ambienteId === Number(ambienteId)) &&
            incluyeTexto(elemento.id + elemento.nombre + elemento.placa, busqueda)
        )
    })

    const conteoCategorias = { Todas: elementos.length }
    categorias.forEach((c) => (conteoCategorias[c] = contarPor(elementos, 'categoria', c)))

    const agregarElemento = (nuevo) => {
        const id = String(elementos.length + 1).padStart(3, '0')
        setElementos([{ ...nuevo, id }, ...elementos])
        setMensaje(`Se agregó "${nuevo.nombre}" al inventario`)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Total de elementos" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="En buen estado" valor={contarPor(elementos, 'estado', 'Buen estado')} icono={CircleCheck} color="azul" />
                <StatCard etiqueta="En reparación" valor={contarPor(elementos, 'estado', 'En reparación')} icono={Wrench} color="ambar" />
                <StatCard etiqueta="Dañados" valor={contarPor(elementos, 'estado', 'Dañado')} icono={AlertOctagon} color="rojo" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Elementos</h2>
                {puedeAgregar && (
                    <Boton icono={Plus} onClick={() => setModalAbierto(true)}>Agregar elemento</Boton>
                )}
            </div>

            <SearchBar placeholder="Buscar por código, nombre o placa..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} className={claseInput}>
                    <option value="">Todos los estados</option>
                    {estadosElemento.map((e) => <option key={e}>{e}</option>)}
                </select>
                <select aria-label="Filtrar por ambiente" value={ambienteId} onChange={(e) => setAmbienteId(e.target.value)} className={claseInput}>
                    <option value="">Todos los ambientes</option>
                    {ambientesConElementos.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                </select>
            </div>

            <FiltroChips opciones={['Todas', ...categorias]} valor={categoria} onCambiar={setCategoria} conteos={conteoCategorias} />

            {filtrados.length > 0 ? (
                <Tabla columnas={['Código', 'Elemento', 'Categoría', 'Ambiente', 'Placa', 'Estado']}>
                    {filtrados.map((elemento) => (
                        <tr key={elemento.id}>
                            <td className="font-semibold text-[#081B28]">{elemento.id}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <FotoElemento elemento={elemento} />
                                    <span className="font-semibold text-[#081B28]">{elemento.nombre}</span>
                                </div>
                            </td>
                            <td>{elemento.categoria}</td>
                            <td>{nombreAmbiente(elemento.ambienteId)}</td>
                            <td>{elemento.placa}</td>
                            <td><EstadoBadge estado={elemento.estado} /></td>
                        </tr>
                    ))}
                </Tabla>
            ) : (
                <EstadoVacio titulo="No hay elementos con esos filtros" descripcion="Cambia la categoría, el estado o el ambiente." />
            )}

            {puedeAgregar && (
                <ModalNuevoElemento abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} onGuardar={agregarElemento} />
            )}
        </section>
    )
}

export default Inventario
