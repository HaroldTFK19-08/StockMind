import Boton from '../UI/Boton'

/**
 * Parte de abajo de un formulario: error general + botones Cancelar y Guardar.
 * <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar="Crear sede" />
 */
const PieFormulario = ({ formulario, onCancelar, textoGuardar = 'Guardar', className = '' }) => (
    <div className={className}>
        {formulario.errorGeneral && (
            <p role="alert" className="mb-3 text-sm text-[#dc2626]">{formulario.errorGeneral}</p>
        )}
        <div className="flex justify-end gap-2 pt-2">
            <Boton variante="texto" onClick={onCancelar} disabled={formulario.guardando}>Cancelar</Boton>
            <Boton type="submit" disabled={formulario.guardando}>
                {formulario.guardando ? 'Guardando...' : textoGuardar}
            </Boton>
        </div>
    </div>
)

export default PieFormulario
