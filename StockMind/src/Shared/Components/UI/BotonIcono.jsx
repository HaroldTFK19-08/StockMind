import { motion } from 'motion/react'

const variantes = {
    normal: 'text-[#475569] hover:bg-[#F4F7FA] hover:text-[#081B28]',
    peligro: 'text-[#dc2626] hover:bg-[#fef2f2]',
}

/**
 * Botón pequeño que solo muestra un ícono (editar, eliminar...).
 * <BotonIcono icono={Pencil} etiqueta="Editar sede" onClick={...} />
 */
const BotonIcono = ({ icono: Icono, etiqueta, variante = 'normal', className = '', ...props }) => (
    <motion.button
        type="button"
        aria-label={etiqueta}
        title={etiqueta}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`rounded-[10px] p-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900] ${variantes[variante]} ${className}`}
        {...props}
    >
        <Icono size={17} />
    </motion.button>
)

export default BotonIcono
