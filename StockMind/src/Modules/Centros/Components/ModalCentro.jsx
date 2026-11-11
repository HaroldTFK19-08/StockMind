import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'

import { actualizarCentro, crearCentro } from '../Services/centrosService'

/**
 * Formulario para crear o editar un centro de formación.
 * - centro = null   -> crea uno nuevo  (POST /centros)
 * - centro = {...}  -> edita ese centro (PUT /centros/:id)
 */
const ModalCentro = ({ centro, onGuardado, onCerrar }) => {
    const editando = Boolean(centro)

    const formulario = useFormulario(
        {
            nombre: centro?.nombre ?? '',
            regional: centro?.regional ?? '',
            ciudad: centro?.ciudad ?? '',
            foto_centro: null, // archivo elegido; al editar solo se envía si se cambia la foto
        },
        (valores) => (editando ? actualizarCentro(centro.id, valores) : crearCentro(valores)),
        onGuardado
    )
    const { valores, cambiar, errores } = formulario

    return (
        <Modal abierto titulo={editando ? 'Editar centro de formación' : 'Nuevo centro de formación'} onCerrar={onCerrar} ancho="max-w-[480px]">
            <form onSubmit={formulario.enviar} className="space-y-4">
                <Campo etiqueta="Nombre del centro" htmlFor="nombre" error={errores.nombre}>
                    <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} maxLength={150} required className={claseInput} />
                </Campo>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Campo etiqueta="Regional" htmlFor="regional" error={errores.regional}>
                        <input id="regional" name="regional" value={valores.regional} onChange={cambiar} placeholder="Ej: Cauca" maxLength={150} required className={claseInput} />
                    </Campo>
                    <Campo etiqueta="Ciudad" htmlFor="ciudad" error={errores.ciudad}>
                        <input id="ciudad" name="ciudad" value={valores.ciudad} onChange={cambiar} placeholder="Ej: Popayán" maxLength={100} required className={claseInput} />
                    </Campo>
                </div>

                <Campo etiqueta={editando ? 'Cambiar foto (opcional)' : 'Foto del centro'} htmlFor="foto_centro" error={errores.foto_centro}>
                    <input
                        id="foto_centro"
                        name="foto_centro"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={cambiar}
                        required={!editando}
                        className={claseInput}
                    />
                    <p className="mt-1.5 text-xs text-[#94a3b8]">JPG, PNG o WEBP de máximo 5 MB.</p>
                </Campo>

                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear centro'} />
            </form>
        </Modal>
    )
}

export default ModalCentro
