import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import CampoArchivo from '../../../Shared/Components/Forms/CampoArchivo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'
import { capitalizar } from '../../../Shared/Utils/texto'

import { condicionesElemento, estadosAutomaticos, estadosManuales } from '../Data/opcionesElemento'
import { actualizarElemento, crearElemento } from '../Services/elementosService'

// La ubicación se elige en una sola lista. El valor es "ambiente:3" o "almacen:2".
const ubicacionInicial = (elemento) => {
    if (elemento?.environment_id) return `ambiente:${elemento.environment_id}`
    if (elemento?.warehouse_id) return `almacen:${elemento.warehouse_id}`
    return ''
}

// Convierte el formulario en los campos que espera el backend
const prepararDatos = (valores, estadoBloqueado) => {
    const { ubicacion, ...datos } = valores
    const [tipo, id] = ubicacion.split(':')

    // El elemento está en un ambiente O en un almacén; el otro campo se envía vacío (queda en null)
    datos.environment_id = tipo === 'ambiente' ? id : ''
    datos.warehouse_id = tipo === 'almacen' ? id : ''

    // "asignado" y "prestado" los maneja el backend: no se envía el estado
    if (estadoBloqueado) delete datos.estado

    return datos
}

/**
 * Formulario para crear o editar un elemento del inventario.
 * - elemento = null   -> crea uno nuevo  (POST /elementos)
 * - elemento = {...}  -> edita ese elemento (PUT /elementos/:id)
 * categorias, ambientes y almacenes: listas del backend para los selects.
 */
const ModalElemento = ({ elemento, categorias, ambientes, almacenes, onGuardado, onCerrar }) => {
    const editando = Boolean(elemento)
    const estadoBloqueado = editando && estadosAutomaticos.includes(elemento.estado)

    const formulario = useFormulario(
        {
            nombre: elemento?.nombre ?? '',
            codigo_inventario: elemento?.codigo_inventario ?? '',
            category_id: elemento?.category_id ?? '',
            ubicacion: ubicacionInicial(elemento),
            serial: elemento?.serial ?? '',
            marca: elemento?.marca ?? '',
            modelo: elemento?.modelo ?? '',
            estado: elemento?.estado ?? 'disponible',
            condicion: elemento?.condicion ?? 'bueno',
            descripcion: elemento?.descripcion ?? '',
            img_elemento: null, // archivo elegido; al editar solo se envía si se cambia la imagen
        },
        (valores) => {
            const datos = prepararDatos(valores, estadoBloqueado)
            return editando ? actualizarElemento(elemento.id, datos) : crearElemento(datos)
        },
        onGuardado
    )
    const { valores, cambiar, errores } = formulario

    return (
        <Modal
            abierto
            titulo={editando ? 'Editar elemento' : 'Agregar elemento'}
            descripcion={editando ? 'Actualiza los datos del elemento.' : 'Registra un elemento nuevo en el inventario.'}
            onCerrar={onCerrar}
            ancho="max-w-[1040px]"
        >
            {/* Formulario de elemento:
                - Se organiza en secciones para separar identificación, ubicación y detalles.
                - Mantiene la misma lógica de envío/validación (prepararDatos, useFormulario). */}
            <form onSubmit={formulario.enviar} className="space-y-4">
                <section className="rounded-2xl border border-[#edf2f7] bg-[#fbfdfb] p-4">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Información principal</h3>
                    {/* Grilla optimizada para formularios con muchos campos:
                        - Más columnas en pantallas grandes para reducir altura total.
                        - Espaciado compacto sin perder legibilidad. */}
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Campo etiqueta="Nombre del elemento" htmlFor="nombre" error={errores.nombre} className="sm:col-span-2 xl:col-span-2">
                            <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} placeholder="Ej: Portátil Dell Latitude" maxLength={150} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Código de inventario" htmlFor="codigo_inventario" error={errores.codigo_inventario}>
                            <input id="codigo_inventario" name="codigo_inventario" value={valores.codigo_inventario} onChange={cambiar} placeholder="SENA-CPU-0000" maxLength={30} required className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Categoría" htmlFor="category_id" error={errores.category_id}>
                            <select id="category_id" name="category_id" value={valores.category_id} onChange={cambiar} required className={claseInput}>
                                <option value="">Selecciona</option>
                                {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                            </select>
                        </Campo>

                        <Campo etiqueta="Ubicación" htmlFor="ubicacion" error={errores.environment_id ?? errores.warehouse_id} className="sm:col-span-2 xl:col-span-4">
                            <select id="ubicacion" name="ubicacion" value={valores.ubicacion} onChange={cambiar} className={claseInput}>
                                <option value="">Sin ubicación</option>
                                <optgroup label="Ambientes">
                                    {ambientes.map((a) => (
                                        <option key={a.id} value={`ambiente:${a.id}`}>{a.nombre} — {a.headquarter?.nombre}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Almacenes">
                                    {almacenes.map((a) => (
                                        <option key={a.id} value={`almacen:${a.id}`}>{a.nombre} — {a.headquarter?.nombre}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </Campo>
                    </div>
                </section>

                <section className="rounded-2xl border border-[#edf2f7] bg-white p-4">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.04em] text-[#2F8F00]">Detalles y estado</h3>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Campo etiqueta="Marca (opcional)" htmlFor="marca" error={errores.marca}>
                            <input id="marca" name="marca" value={valores.marca} onChange={cambiar} maxLength={60} className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Modelo (opcional)" htmlFor="modelo" error={errores.modelo}>
                            <input id="modelo" name="modelo" value={valores.modelo} onChange={cambiar} maxLength={60} className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Serial (opcional)" htmlFor="serial" error={errores.serial} className="sm:col-span-2 xl:col-span-2">
                            <input id="serial" name="serial" value={valores.serial} onChange={cambiar} maxLength={60} className={claseInput} />
                        </Campo>

                        <Campo etiqueta="Estado" htmlFor="estado" error={errores.estado}>
                            {estadoBloqueado ? (
                                <>
                                    {/* Si el backend controla el estado (asignado/prestado), se muestra bloqueado */}
                                    <input id="estado" value={capitalizar(elemento.estado)} disabled className={`${claseInput} bg-[#F4F7FA] text-[#64748b]`} />
                                    <p className="mt-1.5 text-xs text-[#94a3b8]">Se cambia desde asignaciones o préstamos.</p>
                                </>
                            ) : (
                                <select id="estado" name="estado" value={valores.estado} onChange={cambiar} className={claseInput}>
                                    {estadosManuales.map((e) => <option key={e} value={e}>{capitalizar(e)}</option>)}
                                </select>
                            )}
                        </Campo>

                        <Campo etiqueta="Condición" htmlFor="condicion" error={errores.condicion}>
                            <select id="condicion" name="condicion" value={valores.condicion} onChange={cambiar} className={claseInput}>
                                {condicionesElemento.map((c) => <option key={c} value={c}>{capitalizar(c)}</option>)}
                            </select>
                        </Campo>

                        <Campo etiqueta="Descripción (opcional)" htmlFor="descripcion" error={errores.descripcion} className="sm:col-span-2 xl:col-span-4">
                            <textarea id="descripcion" name="descripcion" value={valores.descripcion} onChange={cambiar} rows={2} maxLength={500} className={claseInput} />
                        </Campo>

                        <Campo etiqueta={editando ? 'Cambiar imagen (opcional)' : 'Imagen del elemento'} htmlFor="img_elemento" error={errores.img_elemento} className="sm:col-span-2 xl:col-span-4">
                            {/* Selector de imagen con diseño visual (icono, zona de carga y nombre del archivo).
                                Usa el input real oculto internamente para mantener compatibilidad con formulario.cambiar. */}
                            <CampoArchivo
                                id="img_elemento"
                                name="img_elemento"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={cambiar}
                                required={!editando}
                                archivo={valores.img_elemento}
                                placeholder="Selecciona una imagen del elemento"
                                textoAyuda="JPG, PNG o WEBP de máximo 5 MB."
                            />
                        </Campo>
                    </div>
                </section>

                {/* Pie del formulario: error general y botones de acción */}
                <PieFormulario
                    formulario={formulario}
                    onCancelar={onCerrar}
                    textoGuardar={editando ? 'Guardar cambios' : 'Agregar elemento'}
                />
            </form>
        </Modal>
    )
}

export default ModalElemento
