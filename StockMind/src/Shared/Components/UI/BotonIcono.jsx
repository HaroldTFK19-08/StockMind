const variantes = {
    normal: 'text-[#475569] hover:bg-[#F4F7FA] hover:text-[#081B28]',
    peligro: 'text-[#dc2626] hover:bg-[#fef2f2]',
}

/**
 * Botón pequeño que solo muestra un ícono (editar, eliminar...).
 * <BotonIcono icono={Pencil} etiqueta="Editar sede" onClick={...} />
 */
const BotonIcono = ({ icono: Icono, etiqueta, variante = 'normal', className = '', ...props }) => (
    <button
        type="button"
        aria-label={etiqueta}
        title={etiqueta}
        className={`rounded-[10px] p-2 transition-colors ${variantes[variante]} ${className}`}
        {...props}
    >
        <Icono size={17} />
    </button>
)

export default BotonIcono
