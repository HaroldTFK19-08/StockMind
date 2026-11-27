import { Layers, Plus } from "lucide-react"
import StatCard from "../../../Shared/Components/Cards/StatCard"
import Tarjeta from "../../../Shared/Components/Cards/Tarjeta"
import EstadoVacio from "../../../Shared/Components/Feedback/EstadoVacio"
import CategoriasModal from "../components/ModalCategoria"
import TarjetaCategoria from "../components/TarjetaCategoria"
import ModalEliminar from "../../../Shared/Components/Modals/ModalEliminar"
import { useGestionCategorias } from "../hook/categoria"
import { mensajeError } from "../../../Core/Services/apiUtils"

const Categorias = () => {
    const {
        categorias,
        loading,
        error,
        recargarCategorias,
        formulario,
        operacion,
        categoriaAEliminar,
        abrirFormulario,
        cerrarFormulario,
        cambiarCampo,
        guardarCategoria,
        abrirEliminar,
        cerrarEliminar,
        eliminarSeleccionada,
        eliminarCompletado,
    } = useGestionCategorias()

    const renderListado = () => {
        if (loading) {
            return <Tarjeta className="text-center text-sm text-[#64748b]">Cargando categorías...</Tarjeta>
        }

        if (!categorias.length) {
            if (error) return null
            return (
                <EstadoVacio
                    titulo="Todavía no hay categorías"
                    descripcion="Crea la primera categoría para organizar los elementos del inventario."
                    icono={Layers}
                />
            )
        }

        return (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {categorias.map((categoria) => (
                    <TarjetaCategoria
                        key={categoria.id}
                        categoria={categoria}
                        onEditar={abrirFormulario}
                        onEliminar={abrirEliminar}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="-mt-3 space-y-6 p-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-[#1e293b]">Gestión de Categorías</h1>
                <p className="text-sm text-[#64748b]">
                    Aquí puedes gestionar las categorías de los elementos del inventario, consultar las que ya están registradas y mantener su clasificación organizada.
                </p>
            </header>

            {error && (
                <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    <p>Error al cargar categorías: {mensajeError(error)}</p>
                    <button
                        type="button"
                        onClick={() => void recargarCategorias()}
                        disabled={loading}
                        className="rounded-lg border border-red-200 px-3 py-1.5 font-medium hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Reintentando..." : "Reintentar"}
                    </button>
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="w-full sm:w-1/3">
                    <StatCard
                        etiqueta="Total de categorías"
                        valor={loading ? "Cargando..." : categorias.length}
                        icono={Layers}
                        color="verde"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => abrirFormulario()}
                    className="flex items-center gap-2 rounded-xl bg-sena px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#329600]"
                >
                    <Plus size={20} />
                    Nueva Categoría
                </button>
            </div>

            {renderListado()}

            <CategoriasModal
                abierto={formulario.abierto}
                onCerrar={cerrarFormulario}
                formulario={formulario}
                cambiarCampo={cambiarCampo}
                onSubmit={guardarCategoria}
                titulo={formulario.categoriaEditando ? "Editar categoría" : "Registrar nueva categoría"}
                guardando={operacion.guardando}
                error={operacion.error}
            />

            {categoriaAEliminar && (
                <ModalEliminar
                    titulo="Eliminar categoría"
                    nombre={categoriaAEliminar.nombre}
                    eliminar={eliminarSeleccionada}
                    onEliminado={eliminarCompletado}
                    onCerrar={cerrarEliminar}
                />
            )}
        </div>
    )
}

export default Categorias