import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import useFormularioAsignacion from '../Hooks/useFormularioAsignacion'

const estadosAsignacion = [
    { value: 'activa', label: 'Activa' },
    { value: 'devuelta', label: 'Devuelta' },
    { value: 'vencida', label: 'Vencida' },
]

const ModalNuevaAsignacion = ({
    abierto,
    asignacion,
    aprendices,
    instructores,
    elementos,
    onCerrar,
    onGuardar,
}) => {
    const { cambiarCampo, error, formulario, guardar, guardando } = useFormularioAsignacion({
        asignacion,
        onCerrar,
        onGuardar,
    })

    return (
        <Modal
            abierto={abierto}
            titulo={asignacion ? 'Editar asignación' : 'Nueva asignación'}
            descripcion="Asigna un elemento a un aprendiz y registra su fecha de devolución esperada."
            onCerrar={guardando ? () => {} : onCerrar}
            ancho="max-w-[760px]"
        >
            <form onSubmit={guardar} className="space-y-5">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                        Personas y elemento
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Aprendiz" htmlFor="apprentice_id">
                            <select
                                id="apprentice_id"
                                name="apprentice_id"
                                value={formulario.apprentice_id}
                                onChange={cambiarCampo}
                                className={claseInput}
                                required
                            >
                                <option value="">Selecciona un aprendiz</option>
                                {aprendices.map((aprendiz) => (
                                    <option key={aprendiz.id} value={aprendiz.id}>
                                        {aprendiz.nombre}{aprendiz.documento ? ` · ${aprendiz.documento}` : ''}
                                    </option>
                                ))}
                            </select>
                        </Campo>
                        <Campo etiqueta="Instructor responsable" htmlFor="teacher_id">
                            <select
                                id="teacher_id"
                                name="teacher_id"
                                value={formulario.teacher_id}
                                onChange={cambiarCampo}
                                className={claseInput}
                                required
                            >
                                <option value="">Selecciona un instructor</option>
                                {instructores.map((instructor) => (
                                    <option key={instructor.id} value={instructor.id}>
                                        {instructor.nombre}
                                    </option>
                                ))}
                            </select>
                        </Campo>
                        <Campo etiqueta="Elemento disponible" htmlFor="element_id" className="sm:col-span-2">
                            <select
                                id="element_id"
                                name="element_id"
                                value={formulario.element_id}
                                onChange={cambiarCampo}
                                className={claseInput}
                                required
                            >
                                <option value="">Selecciona un elemento</option>
                                {elementos.map((elemento) => (
                                    <option key={elemento.id} value={elemento.id}>
                                        {elemento.codigo_inventario ?? `ID ${elemento.id}`} · {elemento.nombre}
                                    </option>
                                ))}
                            </select>
                        </Campo>
                    </div>
                </section>

                <section className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                        Fechas y estado
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Fecha de asignación" htmlFor="fecha_asignacion">
                            <input
                                id="fecha_asignacion"
                                name="fecha_asignacion"
                                type="date"
                                value={formulario.fecha_asignacion}
                                onChange={cambiarCampo}
                                className={claseInput}
                            />
                        </Campo>
                        <Campo etiqueta="Devolución esperada" htmlFor="fecha_devolucion_esperada">
                            <input
                                id="fecha_devolucion_esperada"
                                name="fecha_devolucion_esperada"
                                type="date"
                                value={formulario.fecha_devolucion_esperada}
                                onChange={cambiarCampo}
                                className={claseInput}
                                required
                            />
                        </Campo>
                        {asignacion && (
                            <>
                                <Campo etiqueta="Devolución real" htmlFor="fecha_devolucion_real">
                                    <input
                                        id="fecha_devolucion_real"
                                        name="fecha_devolucion_real"
                                        type="date"
                                        value={formulario.fecha_devolucion_real}
                                        onChange={cambiarCampo}
                                        className={claseInput}
                                    />
                                </Campo>
                                <Campo etiqueta="Estado" htmlFor="estado">
                                    <select
                                        id="estado"
                                        name="estado"
                                        value={formulario.estado}
                                        onChange={cambiarCampo}
                                        className={claseInput}
                                    >
                                        {estadosAsignacion.map((estado) => (
                                            <option key={estado.value} value={estado.value}>{estado.label}</option>
                                        ))}
                                    </select>
                                </Campo>
                            </>
                        )}
                        <Campo etiqueta="Observaciones (opcional)" htmlFor="observaciones" className="sm:col-span-2">
                            <textarea
                                id="observaciones"
                                name="observaciones"
                                rows={3}
                                value={formulario.observaciones}
                                onChange={cambiarCampo}
                                maxLength={255}
                                className={claseInput}
                            />
                        </Campo>
                    </div>
                </section>

                {error && (
                    <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                        {error}
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={onCerrar} disabled={guardando}>
                        Cancelar
                    </Boton>
                    <Boton
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={guardando || !aprendices.length || !instructores.length || !elementos.length}
                        aria-busy={guardando}
                    >
                        {guardando ? 'Guardando...' : asignacion ? 'Guardar cambios' : 'Asignar elemento'}
                    </Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevaAsignacion
