import { useEffect, useState } from 'react'
import { ImagePlus, UploadCloud } from 'lucide-react'

/**
 * Campo visual para seleccionar archivos/imágenes en formularios.
 * - Mantiene un <input type="file"> real (oculto) para conservar el comportamiento
 *   nativo y la compatibilidad con hooks como useFormulario/react-hook-form.
 * - Muestra una zona clickeable con icono, texto, nombre del archivo y vista previa
 *   cuando el archivo seleccionado es una imagen.
 *
 * Props principales:
 * - id/name: identificadores del input (name es clave para guardar en el estado).
 * - accept: tipos permitidos (ej. "image/jpeg,image/png,image/webp").
 * - required: si el archivo es obligatorio.
 * - onChange/onBlur/inputRef: integración con formularios controlados por hooks.
 * - archivo: valor actual (File | null | undefined) para mostrar nombre/preview.
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
    const nombreArchivo = archivo?.name ?? ''
    const esImagen = Boolean(archivo?.type?.startsWith('image/'))
    const [previewUrl, setPreviewUrl] = useState('')

    // Genera/revoca URL temporal para vista previa de imágenes seleccionadas.
    useEffect(() => {
        if (!archivo || !esImagen) {
            setPreviewUrl('')
            return undefined
        }

        const url = URL.createObjectURL(archivo)
        setPreviewUrl(url)
        return () => URL.revokeObjectURL(url)
    }, [archivo, esImagen])

    // Clases visuales según modo compacto (usado en formularios densos/registro).
    const clasesContenedor = compacto
        ? 'gap-1.5 rounded-lg p-1.5'
        : 'gap-4 rounded-2xl p-4'
    const clasesPreview = compacto
        ? 'h-7 w-7 rounded-lg'
        : 'h-14 w-14 rounded-xl'
    const clasesIcono = compacto
        ? 'h-7 w-7 rounded-lg'
        : 'h-12 w-12 rounded-xl ring-4 ring-[#39A900]/5'

    return (
        <div className={className}>
            {/* Área interactiva: toda la tarjeta dispara el selector de archivo */}
            <label
                htmlFor={id}
                className={`group relative flex cursor-pointer items-center border border-dashed border-[#cbd5e1] bg-[#f8fafc] transition-all duration-200 hover:border-[#39A900]/55 hover:bg-[#f7fbf6] hover:shadow-[0_8px_22px_rgba(57,169,0,0.08)] focus-within:border-[#39A900] focus-within:shadow-[0_0_0_4px_rgba(57,169,0,0.10)] ${clasesContenedor}`}
            >
                {/* Vista previa para imágenes o icono genérico */}
                {previewUrl ? (
                    <span className={`relative shrink-0 overflow-hidden border border-[#dbe7d8] bg-white shadow-sm ${clasesPreview}`}>
                        <img
                            src={previewUrl}
                            alt="Vista previa del archivo seleccionado"
                            className="h-full w-full object-cover"
                        />
                    </span>
                ) : (
                    <span className={`flex shrink-0 items-center justify-center bg-[#39A900]/10 text-[#2F8F00] transition-transform duration-200 group-hover:scale-[1.03] ${clasesIcono}`}>
                        <Icono size={compacto ? 14 : 22} />
                    </span>
                )}

                {/* Texto descriptivo + estado actual */}
                <span className="min-w-0 flex-1">
                    <span className={`flex items-center gap-1.5 font-semibold text-[#081B28] ${compacto ? 'text-[10px]' : 'text-sm'}`}>
                        <UploadCloud size={compacto ? 12 : 15} className="shrink-0 text-[#2F8F00]" />
                        {nombreArchivo ? 'Archivo seleccionado' : titulo}
                    </span>
                    <span className={`mt-0.5 block truncate text-[#475569] ${compacto ? 'text-[9px]' : 'text-sm'}`}>
                        {nombreArchivo || placeholder}
                    </span>
                    <span className={`mt-0.5 block text-[#64748b] ${compacto ? 'hidden text-[8px] min-[640px]:block' : 'text-xs'}`}>
                        {textoAyuda}
                    </span>
                </span>

                {/* Acción sugerida */}
                <span className={`shrink-0 rounded-md border border-[#dce8dd] bg-white font-semibold text-[#2F8F00] shadow-sm ${compacto ? 'px-1 py-0.5 text-[8px]' : 'hidden px-3 py-2 text-xs sm:inline-flex'}`}>
                    {nombreArchivo ? 'Cambiar' : 'Seleccionar'}
                </span>

                {/* Input real (oculto, accesible por label) */}
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
