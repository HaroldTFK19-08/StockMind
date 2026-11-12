import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'
import { capitalizar } from '../../../Shared/Utils/texto'

import { estadosActivo } from '../../Ambientes/Data/opcionesAmbiente'
import { actualizarAlmacen, crearAlmacen } from '../Services/almacenesService'

/**
 * Formulario para crear o editar un almacén.
 * - almacen = null   -> crea uno nuevo en la sede "sedeId" (POST /almacenes)
 * - almacen = {...}  -> edita ese almacén (PUT /almacenes/:id)
 */
const ModalAlmacen = ({ almacen, sedeId, onGuardado, onCerrar }) => {
    const editando = Boolean(almacen)

    const formulario = useFormulario(
        {
            headquarter_id: almacen?.headquarter_id ?? sedeId,
            nombre: almacen?.nombre ?? '',
            capacidad_elementos: almacen?.capacidad_elementos ?? '',
            estado: almacen?.estado ?? 'activo',
        },
        (valores) => (editando ? actualizarAlmacen(almacen.id, valores) : crearAlmacen(valores)),
        onGuardado
    )
    const { valores, cambiar, errores } = formulario

    return (
        <Modal abierto titulo={editando ? 'Editar almacén' : 'Nuevo almacén'} onCerrar={onCerrar} ancho="max-w-[560px]">
            {/* Formulario de almacén:
                - Sección visual única para agrupar campos relacionados.
                - Sin scroll interno; el contenido se distribuye en grilla responsive. */}
            <form onSubmit={formulario.enviar} className="space-y-6">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información del almacén</h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Campo etiqueta="Nombre del almacén" htmlFor="nombre" error={errores.nombre} className="sm:col-span-2">
                            <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} placeholder="Ej: Almacén principal" maxLength={100} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Capacidad (elementos)" htmlFor="capacidad_elementos" error={errores.capacidad_elementos}>
                            <input id="capacidad_elementos" name="capacidad_elementos" type="number" min="0" step="1" value={valores.capacidad_elementos} onChange={cambiar} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Estado" htmlFor="estado" error={errores.estado}>
                            <select id="estado" name="estado" value={valores.estado} onChange={cambiar} className={claseInput}>
                                {estadosActivo.map((estado) => <option key={estado} value={estado}>{capitalizar(estado)}</option>)}
                            </select>
                        </Campo>
                    </div>
                </section>

                {/* Pie del formulario: muestra error general y acciones Guardar/Cancelar */}
                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear almacén'} />
            </form>
        </Modal>
    )
}

export default ModalAlmacen
