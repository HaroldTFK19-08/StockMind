import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import useFormularioNuevoTraslado from '../Hooks/useFormularioNuevoTraslado'

const ModalNuevoTraslado = ({ abierto, ambientes, elementos, danteaccountId, onCerrar, onGuardar }) => {
    const {
        alternarElemento,
        cambiarCampo,
        cerrar,
        destinos,
        elementosOrigen,
        error,
        formulario,
        guardando,
        guardar,
        origen,
        seleccionados,
    } = useFormularioNuevoTraslado({ ambientes, elementos, danteaccountId, onCerrar, onGuardar })

    return (
        <Modal abierto={abierto} titulo="Nuevo traslado" descripcion="Mueve elementos de un ambiente a otro lugar." onCerrar={cerrar} ancho="max-w-[760px]">
            {/* Formulario de traslado sin scroll interno:
                - Campos principales en grilla para mejor lectura.
                - Lista de elementos en columnas (sin contenedor con overflow). */}
            <form onSubmit={guardar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del traslado</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Ambiente de origen" htmlFor="origenId">
                            <select id="origenId" name="origenId" value={formulario.origenId} onChange={cambiarCampo} className={claseInput}>
                                <option value="">Selecciona</option>
                                {ambientes.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                            </select>
                        </Campo>
                        <Campo etiqueta="Ambiente de destino" htmlFor="destinoId">
                            <select id="destinoId" name="destinoId" value={formulario.destinoId} onChange={cambiarCampo} className={claseInput} disabled={!formulario.origenId}>
                                <option value="">Selecciona</option>
                                {destinos.map((ambiente) => <option key={ambiente.id} value={ambiente.id}>{ambiente.nombre}</option>)}
                            </select>
                        </Campo>
                        {!danteaccountId && (
                            <Campo etiqueta="ID de cuenta Cuentadante" htmlFor="danteaccountId">
                                <>
                                    <input id="danteaccountId" name="danteaccountId" type="number" min="1" value={formulario.danteaccountId} onChange={cambiarCampo} placeholder="ID asignado por el sistema" className={claseInput} />
                                    <p className="mt-1 text-xs text-[#64748b]">El backend lo exige; consúltalo con el administrador del sistema.</p>
                                </>
                            </Campo>
                        )}
                        <Campo etiqueta="Motivo" htmlFor="motivo" className="sm:col-span-2">
                            <input id="motivo" name="motivo" value={formulario.motivo} onChange={cambiarCampo} placeholder="Ej: Revisión técnica" className={claseInput} />
                        </Campo>
                    </div>
                </section>

                {formulario.origenId && (
                    <fieldset className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                        <legend className="px-1 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                            Elementos de {origen?.nombre} ({seleccionados.length} seleccionados)
                        </legend>

                        {/* Lista de elementos visible completa en grilla (sin max-height ni overflow) */}
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {elementosOrigen.length === 0 && (
                                <p className="rounded-xl border border-dashed border-[#d7e4d8] p-4 text-sm text-[#64748b] sm:col-span-2">
                                    Este ambiente no tiene elementos.
                                </p>
                            )}
                            {elementosOrigen.map((elemento) => (
                                <label key={elemento.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#edf2f7] p-3 text-sm transition-colors hover:border-[#dce8dd] hover:bg-[#F7F9F6]">
                                    <input type="checkbox" checked={seleccionados.includes(elemento.id)} onChange={() => alternarElemento(elemento.id)} className="h-4 w-4 accent-[#39A900]" />
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold text-[#081B28]">{elemento.codigo_inventario} · {elemento.nombre}</span>
                                        <span className="block text-xs text-[#64748b]">{elemento.estado}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                )}

                {/* Error de validación del formulario */}
                {error && <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">{error}</p>}

                {/* Acciones finales */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={cerrar}>Cancelar</Boton>
                    <Boton type="submit" disabled={guardando} className="w-full sm:w-auto">{guardando ? 'Registrando...' : 'Registrar traslado'}</Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoTraslado
