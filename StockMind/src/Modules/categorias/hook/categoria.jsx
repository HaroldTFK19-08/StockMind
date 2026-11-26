import { useState } from "react"
import {
    ActualizarCategoria,
    CrearCategoria,
    EliminarCategoria,
    ObterCategorias,
} from "../service/ListarCategoria"
import useCrudApi from "../../../Shared/Hooks/useCrudApi"
import { mensajeError } from "../../../Core/Services/apiUtils"

const FORMULARIO_INICIAL = {
    abierto: false,
    categoriaEditando: null,
    nombre: "",
    descripcion: "",
}

const OPERACION_INICIAL = {
    guardando: false,
    error: "",
}

export const useCategorias = () =>
    useCrudApi({
        listar: ObterCategorias,
        crear: CrearCategoria,
        actualizar: ActualizarCategoria,
        eliminar: EliminarCategoria,
    })

export const useGestionCategorias = () => {
    const {
        data: categorias,
        loading,
        error,
        recargar: recargarCategorias,
        crear: crearCategoria,
        actualizar: actualizarCategoria,
        eliminar: eliminarCategoria,
    } = useCategorias()

    const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
    const [operacion, setOperacion] = useState(OPERACION_INICIAL)
    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)

    const limpiarEstadoFormulario = () => {
        setFormulario(FORMULARIO_INICIAL)
        setOperacion(OPERACION_INICIAL)
    }

    const abrirFormulario = (categoria = null) => {
        setOperacion(OPERACION_INICIAL)
        setFormulario({
            abierto: true,
            categoriaEditando: categoria,
            nombre: categoria?.nombre ?? "",
            descripcion: categoria?.descripcion ?? "",
        })
    }

    const cerrarFormulario = () => {
        if (operacion.guardando) return
        limpiarEstadoFormulario()
    }

    const cambiarCampo = (campo, valor) => {
        setFormulario((actual) => ({ ...actual, [campo]: valor }))
        if (operacion.error) {
            setOperacion((actual) => ({ ...actual, error: "" }))
        }
    }

    const guardarCategoria = async (evento) => {
        evento.preventDefault()

        const nombre = formulario.nombre.trim()
        if (!nombre) {
            setOperacion({
                guardando: false,
                error: "El nombre de la categoría es obligatorio.",
            })
            return
        }

        setOperacion({ guardando: true, error: "" })

        const datosCategoria = {
            nombre,
            descripcion: formulario.descripcion.trim(),
        }

        try {
            if (formulario.categoriaEditando) {
                await actualizarCategoria(formulario.categoriaEditando.id, datosCategoria)
            } else {
                await crearCategoria(datosCategoria)
            }

            await recargarCategorias()
            limpiarEstadoFormulario()
        } catch (err) {
            setOperacion({ guardando: false, error: mensajeError(err) })
        }
    }

    const eliminarSeleccionada = async () => {
        if (!categoriaAEliminar) return
        await eliminarCategoria(categoriaAEliminar.id)
    }

    const eliminarCompletado = async () => {
        setCategoriaAEliminar(null)
        await recargarCategorias()
    }

    return {
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
        abrirEliminar: setCategoriaAEliminar,
        cerrarEliminar: () => setCategoriaAEliminar(null),
        eliminarSeleccionada,
        eliminarCompletado,
    }
}