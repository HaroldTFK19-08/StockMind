import { useState } from "react"
import StatCard from "../../../Shared/Components/Cards/StatCard"
import { useCategorias } from "../hook/categoria"
import { Layers, Plus, Pencil, Trash2 } from "lucide-react"
import Tabla from "../../../Shared/Components/Tables/Tabla"
import EstadoVacio from "../../../Shared/Components/Feedback/EstadoVacio"
import {useCategoriasModal} from "../hook/useModal"
import CategoriasModal from "../components/ModalCategoria"
import ConfirmarEliminarCategoria from "../components/ConfirmarEliminarCategoria"
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

    const mostrarError = (err) => err.response?.data?.message || err.message || 'Ocurrió un error inesperado.';

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
            setErrorOperacion(mostrarError(err));
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
            setErrorOperacion(mostrarError(err));
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
                <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    Error al cargar categorías: {error.message}
                </p>
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
                <Tabla columnas={['Nombre', 'Descripción', 'Acciones']}>
                    <tr><td colSpan={3} className="py-6 text-center">Cargando categorías...</td></tr>
                </Tabla>
            ) : categorias.length === 0 ? (
                <EstadoVacio
                    titulo="Todavía no hay categorías"
                    descripcion="Crea la primera categoría para organizar los elementos del inventario."
                    icono={Layers}
                />
            ) : (
                <Tabla columnas={['Nombre', 'Descripción', 'Acciones']}>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td className="font-medium text-[#1e293b]">
                                {categoria.nombre}
                            </td>
                            <td className="text-[#64748b]">
                                {categoria.descripcion || 'Sin descripción'}
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
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
                            </td>
                        </tr>
                    ))}
                </Tabla>
            )}
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