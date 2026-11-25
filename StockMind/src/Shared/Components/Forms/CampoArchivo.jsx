import { ImagePlus, UploadCloud } from 'lucide-react'

/**
 * Campo visual para seleccionar archivos/imágenes en formularios.
 * - Mantiene un <input type="file"> real (oculto) para conservar el comportamiento
 *   nativo y la compatibilidad con hooks como useFormulario (evento onChange).
 * - Muestra una zona clickeable con icono, texto principal y nombre del archivo.
 *
 * Props principales:
 * - id/name: identificadores del input (name es clave para guardar en el estado del formulario).
 * - accept: tipos permitidos (ej. "image/jpeg,image/png,image/webp").
 * - required: si el archivo es obligatorio.
 * - onChange: manejador del input (ej. formulario.cambiar).
 * - archivo: valor actual (File | null | undefined) para mostrar el nombre seleccionado.
 * - textoAyuda: mensaje secundario (formatos/tamaño recomendado).
 * - icono: componente de icono opcional (por defecto ImagePlus).
 */
const CampoArchivo = ({
    id,
    name,
    accept,
    required = false,
    onChange,
    onBlur,
    inputRef,
    archivo,
    textoAyuda = 'Formatos permitidos según el formulario.',
    placeholder = 'Haz clic para seleccionar un archivo',
    titulo = 'Subir archivo',
    compacto = false,
    icono: Icono = ImagePlus,
    className = '',
}) => {
    // Nombre visible del archivo seleccionado (si existe).
    const nombreArchivo = archivo?.name ?? ''
    const clasesContenedor = compacto
        ? 'gap-2 rounded-xl p-2'
        : 'gap-4 rounded-2xl p-4'
    const clasesIcono = compacto
        ? 'h-9 w-9 rounded-lg ring-0'
        : 'h-12 w-12 rounded-xl ring-4 ring-[#39A900]/5'

    return (
        <div className={className}>
            {/* Etiqueta visual que actúa como área interactiva del input de archivo */}
            <label
                htmlFor={id}
                className={`group relative flex cursor-pointer items-center border border-dashed border-[#cbd5e1] bg-slate-50 transition-all duration-200 hover:border-[#39A900]/60 hover:bg-[#f7fbf6] hover:shadow-[0_8px_22px_rgba(57,169,0,0.08)] focus-within:border-[#39A900] focus-within:shadow-[0_0_0_4px_rgba(57,169,0,0.10)] ${clasesContenedor}`}
            >
                {/* Icono principal para reforzar visualmente que es una carga de archivo/imagen */}
                <span className={`flex shrink-0 items-center justify-center bg-[#39A900]/10 text-[#2F8F00] transition-transform duration-200 group-hover:scale-[1.03] ${clasesIcono}`}>
                    <Icono size={22} />
                </span>

                {/* Texto descriptivo + estado del archivo seleccionado */}
                <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#081B28]">
                        <UploadCloud size={16} className="text-[#2F8F00]" />
                        {nombreArchivo ? 'Archivo seleccionado' : titulo}
                    </span>
                    <span className="mt-1 block truncate text-sm text-[#475569]">
                        {nombreArchivo || placeholder}
                    </span>
                    <span className="mt-1 block text-xs text-[#64748b]">{textoAyuda}</span>
                </span>

                {/* Badge lateral con acción sugerida */}
                <span className="hidden shrink-0 rounded-xl border border-[#dce8dd] bg-white px-3 py-2 text-xs font-semibold text-[#2F8F00] shadow-sm sm:inline-flex">
                    {nombreArchivo ? 'Cambiar' : 'Seleccionar'}
                </span>

                {/* Input real de archivo (oculto visualmente pero funcional y accesible por label) */}
                <input
                    id={id}
                    name={name}
                    type="file"
                    accept={accept}
                    required={required}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={inputRef}
                    className="sr-only"
                />
            </label>
        </div>
    )
}

export default CampoArchivo
