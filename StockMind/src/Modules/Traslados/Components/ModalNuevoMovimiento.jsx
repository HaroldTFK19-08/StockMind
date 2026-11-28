import { Save } from 'lucide-react'

import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'
import { tiposMovimiento } from '../Data/movimientosData'
import useFormularioMovimiento from '../Hooks/useFormularioMovimiento'

const ModalNuevoMovimiento = ({ abierto, movimiento, elementos, onCerrar, onGuardar }) => {
    const {
        alternarElemento,
        cambiarCampo,
        error,
        formulario,
        guardar,
        guardando,
    } = useFormularioMovimiento({ movimiento, onCerrar, onGuardar })

    return (
        <Modal
            abierto={abierto}
            titulo={movimiento ? 'Editar movimiento' : 'Registrar movimiento'}
            descripcion="Registra el tipo, motivo y elementos asociados al movimiento."
            onCerrar={guardando ? () => {} : onCerrar}
            ancho="max-w-[760px]"
        >
            <form onSubmit={guardar} className="space-y-5">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                        Información del movimiento
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Tipo de movimiento" htmlFor="tipo">
                            <select
                                id="tipo"
                                name="tipo"
                                value={formulario.tipo}
                                onChange={cambiarCampo}
                                className={claseInput}
                            >
                                {tiposMovimiento.map((tipo) => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </Campo>
                        <Campo etiqueta="Fecha del movimiento" htmlFor="fecha_movimiento">
                            <input
                                id="fecha_movimiento"
                                name="fecha_movimiento"
                                type="date"
                                value={formulario.fecha_movimiento}
                                onChange={cambiarCampo}
                                className={claseInput}
                            />
                        </Campo>
                        <Campo etiqueta="Motivo (máximo 255 caracteres)" htmlFor="motivo" className="sm:col-span-2">
                            <input
                                id="motivo"
                                name="motivo"
                                value={formulario.motivo}
                                onChange={cambiarCampo}
                                maxLength={255}
                                placeholder="Describe el motivo del movimiento"
                                className={claseInput}
                            />
                        </Campo>
                        {formulario.tipo === 'traslado' && (
                            <Campo etiqueta="ID de traslado" htmlFor="transfer_id" className="sm:col-span-2">
                                <input
                                    id="transfer_id"
                                    name="transfer_id"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={formulario.transfer_id}
                                    onChange={cambiarCampo}
                                    placeholder="ID del traslado asociado"
                                    className={claseInput}
                                    required
                                />
                            </Campo>
                        )}
                    </div>
                </section>

                <fieldset className="rounded-2xl border border-[#edf2f7] bg-white p-4 sm:p-5">
                    <legend className="px-1 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">
                        Elementos ({formulario.element_ids.length} seleccionados)
                    </legend>
                    {elementos.length === 0 ? (
                        <p className="rounded-xl border border-dashed border-[#d7e4d8] p-4 text-sm text-[#64748b]">
                            No hay elementos disponibles para asociar.
                        </p>
                    ) : (
                        <div className="grid max-h-64 gap-2 overflow-y-auto sm:grid-cols-2">
                            {elementos.map((elemento) => {
                                const id = Number(elemento.id)
                                return (
                                    <label
                                        key={elemento.id}
                                        htmlFor={`movimiento-elemento-${id}`}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#edf2f7] p-3 text-sm transition-colors hover:border-[#dce8dd] hover:bg-[#F7F9F6]"
                                    >
                                        <input
                                            id={`movimiento-elemento-${id}`}
                                            type="checkbox"
                                            checked={formulario.element_ids.includes(id)}
                                            onChange={() => alternarElemento(id)}
                                            className="h-4 w-4 accent-[#39A900]"
                                        />
                                        <span className="min-w-0">
                                            <span className="block truncate font-semibold text-[#081B28]">
                                                {elemento.nombre}
                                            </span>
                                            <span className="block text-xs text-[#64748b]">
                                                {elemento.codigo_inventario ?? `ID ${elemento.id}`}
                                            </span>
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    )}
                </fieldset>

                {error && (
                    <p role="alert" className="animate-inline-error rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                        {error}
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f7] pt-5 sm:flex-row sm:justify-end">
                    <Boton variante="texto" className="w-full sm:w-auto" onClick={onCerrar} disabled={guardando}>
                        Cancelar
                    </Boton>
                    <Boton type="submit" icono={Save} className="w-full sm:w-auto" disabled={guardando || elementos.length === 0} aria-busy={guardando}>
                        {guardando ? 'Guardando...' : movimiento ? 'Guardar cambios' : 'Registrar movimiento'}
                    </Boton>
                </div>
            </form>
        </Modal>
    )
}

export default ModalNuevoMovimiento
