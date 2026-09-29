import { Link } from "react-router-dom";
import { Bell, UserRound } from "lucide-react";

export default function Header({ contenido }) {
    return (
        <header className="w-full h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
            {/* Título */}
            <div>
                <h1 className="text-2xl font-semibold text-[#081B28]">
                    {contenido.titulo}
                </h1>
            </div>
            {/* Acciones */}
            <div className="flex items-center gap-4">
                {/* Notificaciones */}
                <button
                    type="button"
                    className="
                        relative
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        text-[#081B28]
                        hover:bg-[#F4F7FA]
                        hover:text-[#39A900]
                        transition-all
                        duration-200
                    "
                >
                    <Bell size={21} strokeWidth={1.8} />
                    {/* Indicador */}
                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            rounded-full
                            bg-[#39A900]
                        "
                    ></span>
                </button>
                {/* Perfil */}
                <Link
                    to={contenido.enlace}
                    className="
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-[#E8F7E3]
                        text-[#39A900]
                        hover:bg-[#D8F0D0]
                        transition-all
                        duration-200
                    "
                >
                    <UserRound size={19} strokeWidth={2} />
                </Link>
            </div>
        </header>
    );
}