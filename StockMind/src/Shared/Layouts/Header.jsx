import { Link } from "react-router-dom";
import { Bell, Menu, UserRound } from "lucide-react";

export default function Cabecera({ contenido, enlacePerfil, onAbrirMenu }) {
    return (
        <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
            <div className="flex items-center gap-3">
                {/* Botón de menú (solo móvil) */}
                <button
                    type="button"
                    onClick={onAbrirMenu}
                    aria-label="Abrir menú"
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-[#081B28] hover:bg-[#F4F7FA] lg:hidden"
                >
                    <Menu size={21} strokeWidth={1.8} />
                </button>

                <h1 className="text-xl font-semibold text-[#081B28] sm:text-2xl">
                    {contenido}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Notificaciones */}
                <button
                    type="button"
                    aria-label="Notificaciones"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#081B28] transition-all duration-200 hover:bg-[#F4F7FA] hover:text-[#39A900]"
                >
                    <Bell size={21} strokeWidth={1.8} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#39A900]" />
                </button>

                {/* Perfil */}
                <Link
                    to={enlacePerfil}
                    aria-label="Mi perfil"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7E3] text-[#39A900] transition-all duration-200 hover:bg-[#D8F0D0]"
                >
                    <UserRound size={19} strokeWidth={2} />
                </Link>
            </div>
        </header>
    );
}
