import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { capitalizar } from '../../../Shared/Utils/texto'

import { estadosActivo, tiposAmbiente } from '../Data/opcionesAmbiente'
import { useModalAmbiente } from '../Hooks/useModalAmbiente'

/**
 * Formulario para crear o editar un ambiente.
 * - ambiente = null   -> crea uno nuevo en la sede "sedeId" (POST /ambientes)
 * - ambiente = {...}  -> edita ese ambiente (PUT /ambientes/:id)
 */
const ModalAmbiente = ({ ambiente, sedeId, onGuardado, onCerrar }) => {
    const {
        editando,
        formulario,
        cuentadantes,
        cargandoCuentadantes,
        errorCuentadantes,
    } = useModalAmbiente({ ambiente, sedeId, onGuardado })
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

                        {!editando && (
                            <Campo
                                etiqueta="Cuentadante (opcional)"
                                htmlFor="cuentadante_id"
                                error={errores.cuentadante_id}
                                className="sm:col-span-2"
                            >
                                <select
                                    id="cuentadante_id"
                                    name="cuentadante_id"
                                    value={valores.cuentadante_id}
                                    onChange={cambiar}
                                    className={claseInput}
                                    disabled={cargandoCuentadantes || Boolean(errorCuentadantes)}
                                    aria-invalid={Boolean(errores.cuentadante_id)}
                                    aria-describedby="cuentadante-ayuda"
                                >
                                    <option value="">Sin asignar</option>
                                    {cuentadantes.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nombre}
                                        </option>
                                    ))}
                                </select>
                                <p id="cuentadante-ayuda" className="mt-1.5 text-xs text-[#64748b]">
                                    Solo aparecen usuarios activos con rol Cuentadante y sin una asignación vigente.
                                </p>
                                {cargandoCuentadantes && (
                                    <p role="status" className="mt-1.5 text-sm text-[#64748b]">
                                        Cargando Cuentadantes...
                                    </p>
                                )}
                                {errorCuentadantes && (
                                    <p role="alert" className="mt-1.5 text-sm text-[#dc2626]">
                                        No fue posible cargar los Cuentadantes: {errorCuentadantes}
                                    </p>
                                )}
                                {!cargandoCuentadantes && !errorCuentadantes && cuentadantes.length === 0 && (
                                    <p className="mt-1.5 text-sm text-[#64748b]">
                                        No hay Cuentadantes disponibles para asignar.
                                    </p>
                                )}
                            </Campo>
                        )}
                    </div>
                </section>

                {/* Pie del formulario: error general (si existe) y botones de acción */}
                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear ambiente'} />
            </form>
        </Modal>
    )
}

export default ModalAmbiente
