import { useState } from "react"
import StatCard from "../../../Shared/Components/Cards/StatCard"
import { useCategorias } from "../hook/categoria"
import { Layers, Plus, Pencil, Trash2 } from "lucide-react"
import Tarjeta from "../../../Shared/Components/Cards/Tarjeta"
import EstadoVacio from "../../../Shared/Components/Feedback/EstadoVacio"
import {useCategoriasModal} from "../hook/useModal"
import CategoriasModal from "../components/ModalCategoria"
import ConfirmarEliminarCategoria from "../components/ConfirmarEliminarCategoria"
import { mensajeError } from "../../../Core/Services/apiUtils"
const Categorias = () => {
    const {
        categorias,
        loading,
        error,
        recargarCategorias,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,
    } = useCategorias();
    const modal = useCategoriasModal();
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
    const [guardando, setGuardando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [errorOperacion, setErrorOperacion] = useState('');

    const abrirModalNueva = () => {
        setCategoriaEditando(null);
        setErrorOperacion('');
        modal.setNombre('');
        modal.setDescripcion('');
        modal.abrirModal();
    };

    const abrirModalEdicion = (categoria) => {
        setCategoriaEditando(categoria);
        setErrorOperacion('');
        modal.setNombre(categoria.nombre || '');
        modal.setDescripcion(categoria.descripcion || '');
        modal.abrirModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setGuardando(true);
        setErrorOperacion('');
        try {
            const datosCategoria = {
                nombre: modal.nombre.trim(),
                descripcion: modal.descripcion.trim(),
            };
            if (categoriaEditando) {
                await actualizarCategoria(categoriaEditando.id, datosCategoria);
            } else {
                await crearCategoria(datosCategoria);
            }
            await recargarCategorias();
            modal.cerrarModal();
            setCategoriaEditando(null);
        } catch (err) {
            setErrorOperacion(mensajeError(err));
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminar = async () => {
        if (!categoriaAEliminar) return;
        setEliminando(true);
        setErrorOperacion('');
        try {
            await eliminarCategoria(categoriaAEliminar.id);
            await recargarCategorias();
            setCategoriaAEliminar(null);
        } catch (err) {
            setErrorOperacion(mensajeError(err));
        } finally {
            setEliminando(false);
        }
    }

    return (
        <div className="-mt-3 space-y-6 p-6">
            <h1 className="text-2xl font-semibold text-[#1e293b]">Gestión de Categorías</h1>
            <p className="text-sm text-[#64748b]">
                Aquí puedes gestionar las categorías de los elementos del inventario, consultar las que ya están registradas y mantener su clasificación organizada.
            </p>
            {error && (
                <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    <p>Error al cargar categorías: {mensajeError(error)}</p>
                    <button
                        type="button"
                        onClick={() => void recargarCategorias()}
                        disabled={loading}
                        className="rounded-lg border border-red-200 px-3 py-1.5 font-medium hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Reintentando...' : 'Reintentar'}
                    </button>
                </div>
            )}
            {errorOperacion && (
                <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {errorOperacion}
                </p>
            )}
            {/* tarjeta contador*/}
            <div className="flex items-center justify-between">
                <div className="w-full sm:w-1/3">
                    <StatCard 
                        etiqueta="Total de categorías" 
                        valor={loading ? 'Cargando...' : categorias.length} 
                        icono={Layers} 
                        color="verde" 
                    />
                </div>
                <button 
                    onClick={abrirModalNueva}
                    className="flex items-center gap-2 rounded-xl bg-sena px-4 py-2.5 text-white font-medium hover:bg-[#329600] transition-colors"
                >
                    <Plus size={20} />
                    Nueva Categoría
                </button>
            </div>

            {loading ? (
                <Tarjeta className="text-center text-sm text-[#64748b]">Cargando categorías...</Tarjeta>
            ) : categorias.length === 0 && !error ? (
                <EstadoVacio
                    titulo="Todavía no hay categorías"
                    descripcion="Crea la primera categoría para organizar los elementos del inventario."
                    icono={Layers}
                />
            ) : categorias.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {categorias.map((categoria) => (
                        <Tarjeta key={categoria.id} className="flex h-full flex-col">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#39A900]">Categoría #{categoria.id}</p>
                                    <h2 className="mt-1 text-lg font-bold text-[#081B28]">{categoria.nombre}</h2>
                                </div>
                                <div className="flex shrink-0 items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => abrirModalEdicion(categoria)}
                                        aria-label={`Editar ${categoria.nombre}`}
                                        className="rounded-lg p-2 text-[#475569] hover:bg-gray-100"
                                    >
                                        <Pencil size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCategoriaAEliminar(categoria)}
                                        aria-label={`Eliminar ${categoria.nombre}`}
                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-[#64748b]">
                                {categoria.descripcion || 'Sin descripción'}
                            </p>
                        </Tarjeta>
                    ))}
                </div>
            ) : null}
            <CategoriasModal
                abierto={modal.modalAbierto}
                onCerrar={modal.cerrarModal}
                nombre={modal.nombre}
                setNombre={modal.setNombre}
                descripcion={modal.descripcion}
                setDescripcion={modal.setDescripcion}
                onSubmit={handleSubmit}
                titulo={categoriaEditando ? "Editar categoría" : "Registrar nueva categoría"}
                guardando={guardando}
            />
            <ConfirmarEliminarCategoria
                abierto={Boolean(categoriaAEliminar)}
                categoria={categoriaAEliminar}
                eliminando={eliminando}
                onCerrar={() => {
                    if (!eliminando) setCategoriaAEliminar(null);
                }}
                onConfirmar={handleEliminar}
            />
        </div>
    )
}

export default Categorias;