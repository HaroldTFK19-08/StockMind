import Modal from '../../../Shared/Components/Modals/Modal'
import Boton from '../../../Shared/Components/UI/Boton'

const ModalContrasena = ({ abierto, onCerrar }) => (
    <Modal abierto={abierto} titulo="Cambiar contraseña" onCerrar={onCerrar} ancho="max-w-[520px]">
        <div className="space-y-5">
            <p className="text-sm leading-6 text-[#64748b]">
                El backend permite actualizar la contraseña, pero no verifica la contraseña actual que solicita este formulario.
                Para evitar confirmar un cambio que no valida tu identidad, esta acción necesita un endpoint seguro.
            </p>
            <div className="flex justify-end border-t border-[#edf2f7] pt-5">
                <Boton onClick={onCerrar}>Cerrar</Boton>
            </div>
        </div>
    </Modal>
)

export default ModalContrasena
