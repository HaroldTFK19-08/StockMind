import {
    ActualizarCategoria,
    CrearCategoria,
    EliminarCategoria,
    ObterCategorias,
} from "../service/ListarCategoria";
import useCrudApi from "../../../Shared/Hooks/useCrudApi";

export const useCategorias = () => {
    const {
        data: categorias,
        loading,
        error,
        recargar: recargarCategorias,
        crear: crearCategoria,
        actualizar: actualizarCategoria,
        eliminar: eliminarCategoria,
    } = useCrudApi({
        listar: ObterCategorias,
        crear: CrearCategoria,
        actualizar: ActualizarCategoria,
        eliminar: EliminarCategoria,
    });

    return {
        categorias,
        loading,
        error,
        recargarCategorias,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,
    };
};
