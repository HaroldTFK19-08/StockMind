import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Archive, CircleCheck, Package, Pencil, Plus, Trash2, Wrench } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Tabla from '../../../Shared/Components/Tables/Tabla'
import EstadoBadge from '../../../Shared/Components/UI/EstadoBadge'
import Boton from '../../../Shared/Components/UI/Boton'
import BotonIcono from '../../../Shared/Components/UI/BotonIcono'
import Cargando from '../../../Shared/Components/Feedback/Cargando'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import { claseInput } from '../../../Shared/Components/Forms/Campo'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { capitalizar, contarPor, incluyeTexto } from '../../../Shared/Utils/texto'

import FotoElemento from '../Components/FotoElemento'
import ModalElemento from '../Components/ModalElemento'
import { estadosElemento, ubicacionDe } from '../Data/opcionesElemento'
import { eliminarElemento, obtenerElementos } from '../Services/elementosService'
import { obtenerAmbientes } from '../../Ambientes/Services/ambientesService'
import { obtenerAlmacenes } from '../../Almacenes/Services/almacenesService'
import { ObterCategorias } from '../../categorias/service/ListarCategoria'

// Pide al mismo tiempo los elementos y las listas que usan los filtros y el formulario
const cargarDatos = async () => {
    const [elementos, categorias, ambientes, almacenes] = await Promise.all([
        obtenerElementos(),
        ObterCategorias(),
        obtenerAmbientes(),
        obtenerAlmacenes(),
    ])
    return { elementos, categorias, ambientes, almacenes }
}

// ¿El elemento está en la ubicación elegida? La ubicación es "", "ambiente:3" o "almacen:2"
const estaEn = (elemento, ubicacion) => {
    if (ubicacion === '') return true
    const [tipo, id] = ubicacion.split(':')
    const idElemento = tipo === 'ambiente' ? elemento.environment_id : elemento.warehouse_id
    return idElemento === Number(id)
}

/**
 * Inventario de elementos (GET /elementos).
 * - Cuentadante: <Inventario />               (solo consulta)
 * - Administrador: <Inventario puedeAgregar /> (puede agregar, editar y eliminar)
 *
 * También se puede abrir ya filtrado: /admin/inventario?almacen=2 o ?ambiente=5
 */
const Inventario = ({ puedeAgregar = false }) => {
    const { datos, cargando, error, recargar } = useCarga(cargarDatos)
    const [parametros] = useSearchParams()

    // Filtro de ubicación que llega en la URL (si llega)
    const ubicacionUrl = parametros.get('almacen')
        ? `almacen:${parametros.get('almacen')}`
        : parametros.get('ambiente')
          ? `ambiente:${parametros.get('ambiente')}`
          : ''

    const [busqueda, setBusqueda] = useState('')
    const [categoria, setCategoria] = useState('Todas')
    const [estado, setEstado] = useState('')
    const [ubicacion, setUbicacion] = useState(ubicacionUrl)
    const [modal, setModal] = useState(null) // null = cerrado | { elemento: null } = nuevo | { elemento } = editar
    const [elementoAEliminar, setElementoAEliminar] = useState(null)
    const [mensaje, setMensaje] = useState('')

    if (cargando) return <Cargando texto="Cargando inventario..." />
    if (!datos) return <MensajeError>{error}</MensajeError>

    const { elementos, categorias, ambientes, almacenes } = datos

    const filtrados = elementos.filter((elemento) => {
        return (
            (categoria === 'Todas' || elemento.category?.nombre === categoria) &&
            (estado === '' || elemento.estado === estado) &&
            estaEn(elemento, ubicacion) &&
            incluyeTexto(elemento.codigo_inventario + elemento.nombre + (elemento.serial ?? ''), busqueda)
        )
    })

    // Chips de categorías con la cantidad de elementos de cada una
    const nombresCategorias = categorias.map((c) => c.nombre)
    const conteoCategorias = { Todas: elementos.length }
    nombresCategorias.forEach((nombre) => {
        conteoCategorias[nombre] = elementos.filter((e) => e.category?.nombre === nombre).length
    })

    const alTerminar = (respuesta) => {
        setModal(null)
        setElementoAEliminar(null)
        setMensaje(respuesta.message)
        recargar()
    }

    const columnas = ['Código', 'Elemento', 'Categoría', 'Ubicación', 'Condición', 'Estado']

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
            {error && <MensajeError>{error}</MensajeError>}

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard etiqueta="Total de elementos" valor={elementos.length} icono={Package} />
                <StatCard etiqueta="Disponibles" valor={contarPor(elementos, 'estado', 'disponible')} icono={CircleCheck} color="azul" />
                <StatCard etiqueta="En mantenimiento" valor={contarPor(elementos, 'estado', 'en mantenimiento')} icono={Wrench} color="ambar" />
                <StatCard etiqueta="Dados de baja" valor={contarPor(elementos, 'estado', 'dado de baja')} icono={Archive} color="rojo" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Elementos</h2>
                {puedeAgregar && (
                    <Boton icono={Plus} onClick={() => setModal({ elemento: null })}>Agregar elemento</Boton>
                )}
            </div>

            <SearchBar placeholder="Buscar por código, nombre o serial..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

            <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} className={claseInput}>
                    <option value="">Todos los estados</option>
                    {estadosElemento.map((e) => <option key={e} value={e}>{capitalizar(e)}</option>)}
                </select>
                <select aria-label="Filtrar por ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className={claseInput}>
                    <option value="">Todas las ubicaciones</option>
                    <optgroup label="Ambientes">
                        {ambientes.map((a) => <option key={a.id} value={`ambiente:${a.id}`}>{a.nombre}</option>)}
                    </optgroup>
                    <optgroup label="Almacenes">
                        {almacenes.map((a) => <option key={a.id} value={`almacen:${a.id}`}>{a.nombre}</option>)}
                    </optgroup>
                </select>
            </div>

            <FiltroChips opciones={['Todas', ...nombresCategorias]} valor={categoria} onCambiar={setCategoria} conteos={conteoCategorias} />

            {filtrados.length > 0 ? (
                <Tabla columnas={puedeAgregar ? [...columnas, 'Acciones'] : columnas}>
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
                            <td>{ubicacionDe(elemento)}</td>
                            <td><EstadoBadge estado={capitalizar(elemento.condicion)} /></td>
                            <td><EstadoBadge estado={capitalizar(elemento.estado)} /></td>
                            {puedeAgregar && (
                                <td>
                                    <div className="flex items-center gap-1">
                                        <BotonIcono icono={Pencil} etiqueta={`Editar ${elemento.nombre}`} onClick={() => setModal({ elemento })} />
                                        <BotonIcono icono={Trash2} etiqueta={`Eliminar ${elemento.nombre}`} variante="peligro" onClick={() => setElementoAEliminar(elemento)} />
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </Tabla>
            ) : elementos.length === 0 ? (
                <EstadoVacio titulo="El inventario está vacío" descripcion="Todavía no se ha registrado ningún elemento." icono={Package} />
            ) : (
                <EstadoVacio titulo="No hay elementos con esos filtros" descripcion="Cambia la categoría, el estado o la ubicación." />
            )}

            {modal && (
                <ModalElemento
                    elemento={modal.elemento}
                    categorias={categorias}
                    ambientes={ambientes}
                    almacenes={almacenes}
                    onGuardado={alTerminar}
                    onCerrar={() => setModal(null)}
                />
            )}

            {elementoAEliminar && (
                <ModalEliminar
                    titulo="Eliminar elemento"
                    nombre={elementoAEliminar.nombre}
                    eliminar={() => eliminarElemento(elementoAEliminar.id)}
                    onEliminado={alTerminar}
                    onCerrar={() => setElementoAEliminar(null)}
                />
            )}
        </section>
    )
}

export default Inventario
