import Boton from '../UI/Boton'

/**
 * Parte de abajo de un formulario: error general + botones Cancelar y Guardar.
 * <PieFormulario formulario={formulario} onCancelar={onCerrar} textoGuardar="Crear sede" />
 */
const PieFormulario = ({ formulario, onCancelar, textoGuardar = 'Guardar', className = '' }) => (
    // Contenedor de acciones del formulario:
    // - Se separa visualmente del resto con borde superior.
    // - Mantiene botones alineados y con jerarquía clara (Cancelar / Guardar).
    <div className={`mt-2 border-t border-[#edf2f7] pt-5 ${className}`}>
        {formulario.errorGeneral && (
            // Error general del formulario (no asociado a un solo campo).
            <p role="alert" className="animate-inline-error mb-4 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#dc2626]">
                {formulario.errorGeneral}
            </p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            {/* Botón secundario para cerrar/cancelar sin guardar cambios */}
            <Boton variante="texto" className="w-full sm:w-auto" onClick={onCancelar} disabled={formulario.guardando}>
                Cancelar
            </Boton>

            {/* Botón principal de envío; muestra estado mientras guarda */}
            <Boton type="submit" className="w-full sm:w-auto" disabled={formulario.guardando}>
                {formulario.guardando ? 'Guardando...' : textoGuardar}
            </Boton>
        </div>
    </div>
)

export default PieFormulario
