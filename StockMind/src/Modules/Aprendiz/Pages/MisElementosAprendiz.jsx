import { Box, MapPin } from 'lucide-react'

import BarraSuperiorAprendiz from '../Components/BarraSuperiorAprendiz'
import ElementoCard from '../Components/ElementoCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import { ELEMENTOS_ASIGNADOS } from '../Data/elementosAprendiz'
const MisElementosAprendiz = () => {
    return (
        <div className="min-h-screen w-full px-[50px] py-[30px]">
            <BarraSuperiorAprendiz />
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-[#081B28]">
                <Box
                    size={26}
                    strokeWidth={2}
                    className="text-[#39A900]"
                />
                Mis Elementos Asignados
            </h2>
            <SearchBar placeholder="Buscar por elemento, ambiente o instructor..." />
            <h3 className="mt-10 mb-[15px] ml-[5px] flex items-center gap-2.5 text-[1.1rem] text-[#64748b]">
                <MapPin
                    size={21}
                    strokeWidth={2}
                    className="text-[#39A900]"
                />
                Elementos para tu formación
            </h3>
            <div className="flex flex-col gap-[18px]">
                {ELEMENTOS_ASIGNADOS.map((elemento) => (
                    <ElementoCard
                        key={elemento.id}
                        elemento={elemento}
                    />
                ))}
            </div>
        </div>
    )
}

export default MisElementosAprendiz
