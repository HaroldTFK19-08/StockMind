import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import CampoArchivo from '../../../Shared/Components/Forms/CampoArchivo'
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
        <Modal abierto titulo={editando ? 'Editar centro de formación' : 'Nuevo centro de formación'} onCerrar={onCerrar} ancho="max-w-[600px]">
            {/* Formulario de centro:
                - Sección agrupada para datos y carga de imagen.
                - Misma lógica de validación/guardado, con presentación más clara y sin scroll interno. */}
            <form onSubmit={formulario.enviar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del centro</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Nombre del centro" htmlFor="nombre" error={errores.nombre} className="sm:col-span-2">
                            <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} maxLength={150} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Regional" htmlFor="regional" error={errores.regional}>
                            <input id="regional" name="regional" value={valores.regional} onChange={cambiar} placeholder="Ej: Cauca" maxLength={150} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Ciudad" htmlFor="ciudad" error={errores.ciudad}>
                            <input id="ciudad" name="ciudad" value={valores.ciudad} onChange={cambiar} placeholder="Ej: Popayán" maxLength={100} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta={editando ? 'Cambiar foto (opcional)' : 'Foto del centro'} htmlFor="foto_centro" error={errores.foto_centro} className="sm:col-span-2">
                            {/* Selector de foto con zona visual e iconos, reutilizando el componente compartido. */}
                            <CampoArchivo
                                id="foto_centro"
                                name="foto_centro"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={cambiar}
                                required={!editando}
                                archivo={valores.foto_centro}
                                placeholder="Selecciona una foto del centro"
                                textoAyuda="JPG, PNG o WEBP de máximo 5 MB."
                            />
                        </Campo>
                    </div>
                </section>

                {/* Pie del formulario: error general y botones de acción */}
                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear centro'} />
            </form>
        </Modal>
    )
}

export default ModalCentro
