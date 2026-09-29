import { Bell, Settings } from 'lucide-react'

import AprendizPerfil from '../../../assets/aprendizlogo.png'

const BarraSuperiorAprendiz = ({
    rol = 'Aprendiz SENA',
    nombre = 'Andres Estrada'
}) => {
    return (
        <header className="mb-5 flex items-center justify-end bg-transparent pr-[30px] pt-5">
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-[15px] text-[1.3rem] text-[#444]">
                    <button
                        type="button"
                        className="flex items-center justify-center transition-colors duration-200 hover:text-sena"
                        aria-label="Notificaciones"
                    >
                        <Bell size={21} strokeWidth={2} />
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center transition-colors duration-200 hover:text-sena"
                        aria-label="Configuración"
                    >
                        <Settings size={21} strokeWidth={2} />
                    </button>
                </div>

                <div className="flex cursor-pointer items-center gap-3">
                    <div className="flex flex-col text-right">
                        <span className="text-[15px] font-bold text-black">
                            {rol}
                        </span>

                        <small className="font-medium text-[#28a745]">
                            {nombre}
                        </small>
                    </div>

                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#eee]">
                        <img
                            src={AprendizPerfil}
                            alt={`Perfil de ${nombre}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default BarraSuperiorAprendiz

