// Clase para inputs, selects y textareas (así todos se ven igual)
export const claseInput =
    'w-full rounded-[12px] border-2 border-[#edf2f7] bg-white px-4 py-2.5 text-sm text-[#081B28] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#39A900] focus:shadow-[0_0_0_4px_rgba(73,169,25,0.1)]'

/**
 * Etiqueta + campo + mensaje de error.
 * <Campo etiqueta="Nombre" htmlFor="nombre" error={errores.nombre}>
 *     <input id="nombre" className={claseInput} />
 * </Campo>
 */
const Campo = ({ etiqueta, htmlFor, error, children, className = '' }) => (
    <div className={className}>
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[#081B28]">
            {etiqueta}
        </label>
        {children}
        {error && <p className="mt-1.5 text-sm text-[#dc2626]">{error}</p>}
    </div>
)

export default Campo
