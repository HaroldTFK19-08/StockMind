import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import Modal from '../../../Shared/Components/Modals/Modal'
import { useModalUsuario } from '../Hooks/useModalUsuario'

const nombreCompleto = (usuario) => (
    [
        usuario.nombre_1,
        usuario.nombre_2,
        usuario.apellido_1,
        usuario.apellido_2,
    ].filter(Boolean).join(' ')
    || usuario.nombre
    || usuario.email
    || `Usuario #${usuario.id}`
)

const textoRol = (rol) => (
    typeof rol === 'string' ? rol : rol?.rol ?? rol?.name ?? ''
)

const ModalUsuario = ({ usuarioId, modo, onCerrar, onGuardado, rolesAsignables = [] }) => {
    const editando = modo === 'editar'
    const {
        usuario,
        valores,
        cargando,
        errorCarga,
        errores,
        errorGeneral,
        guardando,
        cambiar,
        guardar,
    } = useModalUsuario({ usuarioId, onGuardado })

    const cerrar = () => {
        if (!guardando) onCerrar()
    }

    const cuentasDante = Array.isArray(usuario?.danteaccounts) ? usuario.danteaccounts : []
    const rolesUsuario = Array.isArray(usuario?.roles) ? usuario.roles.map(textoRol).filter(Boolean) : []
    const esAdministrador = rolesUsuario.some((rol) => rol.toLowerCase().includes('admin'))

    return (
        <Modal
            abierto
            titulo={editando ? 'Editar datos del usuario' : 'Detalles del usuario'}
            descripcion={usuario ? nombreCompleto(usuario) : 'Información del usuario seleccionado.'}
            onCerrar={cerrar}
            ancho="max-w-[720px]"
        >
            {cargando && (
                <p role="status" className="py-8 text-center text-sm text-[#64748b]">
                    Cargando información del usuario...
                </p>
            )}

            {!cargando && errorCarga && (
                <p role="alert" className="rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                    No fue posible cargar el usuario: {errorCarga}
                </p>
            )}

            {!cargando && usuario && !editando && (
                <div className="space-y-5">
                    <dl className="grid gap-4 rounded-2xl bg-[#F7F9F6] p-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs text-[#64748b]">Nombre</dt>
                            <dd className="font-semibold text-[#081B28]">{nombreCompleto(usuario)}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Correo</dt>
                            <dd className="break-all font-semibold text-[#081B28]">{usuario.email || 'Sin correo'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Identificación</dt>
                            <dd className="font-semibold text-[#081B28]">
                                {[usuario.tipo_identidad, usuario.numero_identidad].filter(Boolean).join(' · ') || 'No registrada'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Teléfono</dt>
                            <dd className="font-semibold text-[#081B28]">{usuario.telefono || 'Sin teléfono'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Estado</dt>
                            <dd className="font-semibold text-[#081B28]">{usuario.estado || 'Sin estado'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#64748b]">Roles</dt>
                            <dd className="font-semibold text-[#081B28]">{rolesUsuario.join(', ') || 'Sin roles'}</dd>
                        </div>
                    </dl>

                    {cuentasDante.length > 0 && (
                        <section>
                            <h3 className="mb-2 text-sm font-bold text-[#081B28]">Historial de ambientes DANTE</h3>
                            <ul className="space-y-2">
                                {cuentasDante.map((cuenta) => (
                                    <li key={cuenta.id} className="flex flex-wrap justify-between gap-2 rounded-xl border border-[#e5ece6] px-3 py-2 text-sm">
                                        <span className="font-semibold text-[#081B28]">
                                            {cuenta.environment?.nombre || `Ambiente #${cuenta.environment_id}`}
                                        </span>
                                        <span className="text-[#64748b]">
                                            {cuenta.fecha_inicio || 'Sin fecha'} – {cuenta.fecha_fin || 'Vigente'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <div className="flex justify-end border-t border-[#edf2f7] pt-4">
                        <button
                            type="button"
                            onClick={cerrar}
                            className="rounded-[14px] border-2 border-[#e5ece6] bg-white px-5 py-2.5 text-sm font-bold text-[#081B28] hover:bg-[#f8fbf7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {!cargando && usuario && editando && valores && (
                <form onSubmit={guardar} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Primer nombre" htmlFor="nombre_1" error={errores.nombre_1}>
                            <input id="nombre_1" name="nombre_1" value={valores.nombre_1} onChange={cambiar} required maxLength={255} autoComplete="given-name" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Segundo nombre" htmlFor="nombre_2" error={errores.nombre_2}>
                            <input id="nombre_2" name="nombre_2" value={valores.nombre_2} onChange={cambiar} required={Boolean(usuario.nombre_2)} maxLength={255} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Primer apellido" htmlFor="apellido_1" error={errores.apellido_1}>
                            <input id="apellido_1" name="apellido_1" value={valores.apellido_1} onChange={cambiar} required maxLength={255} autoComplete="family-name" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Segundo apellido" htmlFor="apellido_2" error={errores.apellido_2}>
                            <input id="apellido_2" name="apellido_2" value={valores.apellido_2} onChange={cambiar} required={Boolean(usuario.apellido_2)} maxLength={255} className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Tipo de identificación" htmlFor="tipo_identidad" error={errores.tipo_identidad}>
                            <select id="tipo_identidad" name="tipo_identidad" value={valores.tipo_identidad} onChange={cambiar} required className={claseInput}>
                                <option value="">Selecciona un tipo</option>
                                <option value="CC">CC</option>
                                <option value="TI">TI</option>
                                <option value="CE">CE</option>
                            </select>
                        </Campo>
                        <Campo etiqueta="Número de identificación" htmlFor="numero_identidad" error={errores.numero_identidad}>
                            <input id="numero_identidad" name="numero_identidad" value={valores.numero_identidad} onChange={cambiar} required maxLength={255} autoComplete="off" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Teléfono" htmlFor="telefono" error={errores.telefono}>
                            <input id="telefono" name="telefono" value={valores.telefono} onChange={cambiar} required maxLength={255} autoComplete="tel" className={claseInput} />
                        </Campo>
                        <Campo etiqueta="Correo electrónico" htmlFor="email" error={errores.email}>
                            <input id="email" name="email" type="email" value={valores.email} onChange={cambiar} required maxLength={255} autoComplete="email" className={claseInput} />
                        </Campo>
                        {!esAdministrador && (
                            <Campo
                                etiqueta="Rol"
                                htmlFor="role_id"
                                error={errores.role_ids ?? errores['role_ids.0'] ?? errores.role_id}
                            >
                                <select
                                    id="role_id"
                                    name="role_id"
                                    value={valores.role_id}
                                    onChange={cambiar}
                                    required={Boolean(valores.role_id)}
                                    className={claseInput}
                                >
                                    <option value="">Selecciona un rol</option>
                                    {rolesAsignables.map((rolDisponible) => (
                                        <option key={rolDisponible.id} value={rolDisponible.id}>
                                            {rolDisponible.nombre}
                                        </option>
                                    ))}
                                </select>
                            </Campo>
                        )}
                        {esAdministrador && (
                            <p className="self-end text-sm text-[#64748b]">
                                El rol Administrador no se puede cambiar desde este módulo.
                            </p>
                        )}
                    </div>

                    <PieFormulario
                        formulario={{ errorGeneral, guardando }}
                        onCancelar={cerrar}
                        textoGuardar="Guardar cambios"
                    />
                </form>
            )}
        </Modal>
    )
}

export default ModalUsuario
