import Modal from '../../../Shared/Components/Modals/Modal'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import PieFormulario from '../../../Shared/Components/Forms/PieFormulario'
import { useFormulario } from '../../../Shared/Hooks/useFormulario'
import { capitalizar } from '../../../Shared/Utils/texto'

import { zonasSede } from '../Data/opcionesSede'
import { actualizarSede, crearSede } from '../Services/sedesService'

/**
 * Formulario para crear o editar una sede.
 * - sede = null   -> crea una nueva en el centro "centroId" (POST /sedes)
 * - sede = {...}  -> edita esa sede (PUT /sedes/:id)
 */
const ModalSede = ({ sede, centroId, onGuardado, onCerrar }) => {
    const editando = Boolean(sede)

    const formulario = useFormulario(
        {
            trainingcenter_id: sede?.trainingcenter_id ?? centroId,
            nombre: sede?.nombre ?? '',
            direccion: sede?.direccion ?? '',
            zona: sede?.zona ?? 'urbana',
        },
        (valores) => (editando ? actualizarSede(sede.id, valores) : crearSede(valores)),
        onGuardado
    )
    const { valores, cambiar, errores } = formulario

    return (
        <Modal abierto titulo={editando ? 'Editar sede' : 'Nueva sede'} onCerrar={onCerrar} ancho="max-w-[480px]">
            <form onSubmit={formulario.enviar} className="space-y-4">
                <Campo etiqueta="Nombre de la sede" htmlFor="nombre" error={errores.nombre}>
                    <input id="nombre" name="nombre" value={valores.nombre} onChange={cambiar} placeholder="Ej: Sede Alto Cauca" maxLength={100} required className={claseInput} />
                </Campo>

                <Campo etiqueta="Dirección" htmlFor="direccion" error={errores.direccion}>
                    <input id="direccion" name="direccion" value={valores.direccion} onChange={cambiar} placeholder="Ej: Calle 4 # 2-80" maxLength={150} required className={claseInput} />
                </Campo>

                <Campo etiqueta="Zona" htmlFor="zona" error={errores.zona}>
                    <select id="zona" name="zona" value={valores.zona} onChange={cambiar} className={claseInput}>
                        {zonasSede.map((zona) => <option key={zona} value={zona}>{capitalizar(zona)}</option>)}
                    </select>
                </Campo>

                <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar={editando ? 'Guardar cambios' : 'Crear sede'} />
            </form>
        </Modal>
    )
}

export default ModalSede
