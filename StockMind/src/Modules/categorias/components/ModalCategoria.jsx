import Modal from '../../../Shared/Components/Modals/Modal'

const CategoriasModal = ({
    abierto,
    onCerrar,
    formulario,
    cambiarCampo,
    onSubmit,
    titulo = "Registrar nueva categoría",
    guardando = false,
    error = "",
}) => {
    return (
        <Modal
            abierto={abierto}
            titulo={titulo}
            descripcion="Completa los datos de la categoría."
            onCerrar={onCerrar}
            ancho="max-w-[560px]"
        >
            {/* Formulario de categoría:
                - Estructura en sección para una apariencia más limpia y profesional.
                - Mantiene la misma lógica/props del componente (sin cambiar arquitectura). */}
            <form onSubmit={onSubmit} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Datos de la categoría</h3>

                    <div className="space-y-4">
                        <div>
                            {/* Etiqueta del campo nombre */}
                            <label htmlFor="nombre-categoria" className="mb-1.5 block text-sm font-semibold text-[#081B28]">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre-categoria"
                                autoFocus
                                value={formulario.nombre}
                                onChange={(evento) => cambiarCampo("nombre", evento.target.value)}
                                required
                                placeholder="Ej. Tecnología"
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? "error-categoria" : undefined}
                                className="w-full rounded-[12px] border-2 border-[#edf2f7] bg-white px-4 py-2.5 text-sm text-[#081B28] outline-none transition-all duration-200 placeholder:text-[#94a3b8] hover:border-[#dce8dd] focus:border-[#39A900] focus:shadow-[0_0_0_4px_rgba(73,169,25,0.1)]"
                            />
                        </div>

                        <div>
                            {/* Etiqueta del campo descripción */}
                            <label htmlFor="descripcion-categoria" className="mb-1.5 block text-sm font-semibold text-[#081B28]">
                                Descripción
                            </label>
                            <textarea
                                id="descripcion-categoria"
                                value={formulario.descripcion}
                                onChange={(evento) => cambiarCampo("descripcion", evento.target.value)}
                                rows="3"
                                placeholder="Ej. Elementos y equipos tecnológicos..."
                                className="w-full rounded-[12px] border-2 border-[#edf2f7] bg-white px-4 py-2.5 text-sm text-[#081B28] outline-none transition-all duration-200 placeholder:text-[#94a3b8] hover:border-[#dce8dd] focus:border-[#39A900] focus:shadow-[0_0_0_4px_rgba(73,169,25,0.1)]"
                            />
                        </div>
                    </div>
                </section>

                {error && (
                    <p
                        id="error-categoria"
                        role="alert"
                        className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b42318]"
                    >
                        {error}
                    </p>
                )}

                {/* Acciones del formulario: cancelar/cerrar o guardar registro */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCerrar}
                        disabled={guardando}
                        className="inline-flex items-center justify-center rounded-[14px] px-5 py-2.5 text-sm font-bold text-[#64748b] transition-colors hover:bg-[#f3f6f2] hover:text-[#081B28] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={guardando}
                        className="inline-flex items-center justify-center rounded-[14px] bg-[#2f8f00] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(57,169,0,0.18)] transition-all hover:bg-[#277500] hover:shadow-[0_12px_26px_rgba(57,169,0,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {guardando ? 'Guardando...' : 'Guardar registro'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CategoriasModal