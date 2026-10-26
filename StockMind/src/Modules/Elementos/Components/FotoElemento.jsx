import { Package } from 'lucide-react'
import { iconosCategoria } from '../Data/inventarioData'

// Muestra la foto del elemento. Si no tiene, muestra el ícono de su categoría.
const FotoElemento = ({ elemento, tamano = 'h-11 w-11' }) => {
    if (elemento.foto) {
        return <img src={elemento.foto} alt="" className={`${tamano} shrink-0 rounded-[10px] bg-[#F4F7FA] object-contain p-1`} />
    }

    const Icono = elemento.icono ?? iconosCategoria[elemento.categoria] ?? Package
    return (
        <div className={`${tamano} flex shrink-0 items-center justify-center rounded-[10px] bg-[#f0fdf4] text-[#39A900]`}>
            <Icono size={20} strokeWidth={1.8} />
        </div>
    )
}

export default FotoElemento
