import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'
import { capitalizar } from '../../../Shared/Utils/texto'

import { estadosActivo, tiposAmbiente } from '../Data/opcionesAmbiente'
import { actualizarAmbiente, crearAmbiente } from '../Services/ambientesService'

/**
 * Formulario para crear o editar un ambiente.
 * - ambiente = null   -> crea uno nuevo en la sede "sedeId" (POST /ambientes)
 * - ambiente = {...}  -> edita ese ambiente (PUT /ambientes/:id)
 *
 * El instructor responsable (teacher_id) es opcional y todavía no se envía:
 * la lista de instructores está en /usuarios, que necesita inicio de sesión.
 */
const ModalAmbiente = ({ ambiente, sedeId, onGuardado, onCerrar }) => {
    const editando = Boolean(ambiente)

    const formulario = useFormulario(
        {
            headquarter_id: ambiente?.headquarter_id ?? sedeId,
            nombre: ambiente?.nombre ?? '',
            tipo: ambiente?.tipo ?? '',
            capacidad: ambiente?.capacidad ?? '',
            estado: ambiente?.estado ?? 'activo',
        },
        (valores) => (editando ? actualizarAmbiente(ambiente.id, valores) : crearAmbiente(valores)),
        onGuardado
    )
    const { valores, cambiar, errores } = formulario

    return (
        <Modal abierto titulo={editando ? 'Editar ambiente' : 'Nuevo ambiente'} onCerrar={onCerrar} ancho="max-w-[560px]">
            {/* Formulario de ambiente:
                - Agrupa campos en una sección clara para facilitar el registro.
                - Usa grilla responsive y evita contenedores con scroll. */}
            <form onSubmit={formulario.enviar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del ambiente</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Nombre del ambiente" htmlFor="nombre" error={errores.nombre} className="sm:col-span-2">
                            <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} placeholder="Ej: Software 1" maxLength={100} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Tipo de ambiente" htmlFor="tipo" error={errores.tipo} className="sm:col-span-2">
                            {/* Se puede escribir cualquier tipo; la lista solo da sugerencias */}
                            <input id="tipo" name="tipo" list="tipos-ambiente" value={valores.tipo} onChange={cambiar} placeholder="Ej: Sala de sistemas" maxLength={50} required className={claseInput} />
                            <datalist id="tipos-ambiente">
                                {tiposAmbiente.map((tipo) => <option key={tipo} value={tipo} />)}
                            </datalist>
                        </Campo>

                        <Campo etiqueta="Capacidad" htmlFor="capacidad" error={errores.capacidad}>
                            <input id="capacidad" name="capacidad" type="number" min="0" max="65535" step="1" value={valores.capacidad} onChange={cambiar} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Estado" htmlFor="estado" error={errores.estado}>
                            <select id="estado" name="estado" value={valores.estado} onChange={cambiar} className={claseInput}>
                                {estadosActivo.map((estado) => <option key={estado} value={estado}>{capitalizar(estado)}</option>)}
                            </select>
                        </Campo>
                    </div>
                </section>

                {/* Pie del formulario: error general (si existe) y botones de acción */}
                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear ambiente'} />
            </form>
        </Modal>
    )
}

export default ModalAmbiente
