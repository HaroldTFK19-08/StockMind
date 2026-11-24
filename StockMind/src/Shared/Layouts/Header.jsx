import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Bell, Menu, UserRound } from "lucide-react";

export default function Cabecera({ contenido, enlacePerfil, enlaceNotificaciones, onAbrirMenu, menuAbierto = false }) {
    // Clase base para botones/iconos del header: consistente, accesible y con feedback visual.
    const claseBoton =
        "flex h-10 w-10 items-center justify-center rounded-xl text-[#081B28] transition-[color,background-color,border-color,box-shadow,transform] duration-[180ms] hover:-translate-y-px active:translate-y-0 hover:bg-[#F1F7F0] hover:text-[#2F8F00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]";

    return (
        <motion.header
            // Entrada sutil del header para una sensación más pulida al cargar el panel.
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#e9efea]/90 bg-white/90 px-5 shadow-[0_4px_18px_rgba(8,27,40,0.03)] backdrop-blur-md sm:px-8"
        >
            <div className="flex items-center gap-3">
                {/* Botón de menú: solo en celular */}
                <button
                    type="button"
                    onClick={onAbrirMenu}
                    aria-label="Abrir menú"
                    aria-controls="menu-principal"
                    aria-expanded={menuAbierto}
                    className={`${claseBoton} lg:hidden`}
                >
                    <Menu size={21} />
                </button>
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#39A900]">StockMind</p>
                    <h1 className="text-xl font-semibold tracking-tight text-[#081B28] sm:text-2xl">{contenido}</h1>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <Link to={enlaceNotificaciones} aria-label="Notificaciones" className={`relative ${claseBoton}`}>
                    <Bell size={21} strokeWidth={1.8} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#39A900] ring-2 ring-white" />
                </Link>
                <Link
                    to={enlacePerfil}
                    aria-label="Mi perfil"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F7E3] text-[#2F8F00] ring-1 ring-[#39A900]/10 transition-[color,background-color,box-shadow,transform] duration-[180ms] hover:-translate-y-px hover:bg-[#D8F0D0] hover:shadow-[0_8px_20px_rgba(57,169,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                >
                    <UserRound size={19} />
                </Link>
            </div>
        </motion.header>
    );
}
