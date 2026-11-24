import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import StockMind from "../../assets/Capa 1.svg";

/**
 * Menú lateral de todos los paneles.
 * Cada enlace es: { id, titulo, ruta, icono }  (icono = componente de lucide-react)
 * En celular se muestra como panel deslizable (abierto / onCerrar).
 */
export default function NavegacionLayout({ enlaces = [], abierto = false, onCerrar }) {
    useEffect(() => {
        if (!abierto) return;

        const alPresionarEscape = (evento) => {
            if (evento.key === "Escape") onCerrar();
        };

        const cuerpo = document.body;
        const desbordamientoAnterior = cuerpo.style.overflow;
        cuerpo.style.overflow = "hidden";
        window.addEventListener("keydown", alPresionarEscape);

        return () => {
            cuerpo.style.overflow = desbordamientoAnterior;
            window.removeEventListener("keydown", alPresionarEscape);
        };
    }, [abierto, onCerrar]);

    return (
        <>
            {/* Fondo oscuro detrás del menú (solo celular) */}
            <button
                type="button"
                onClick={onCerrar}
                aria-label="Cerrar menú"
                tabIndex={abierto ? 0 : -1}
                className={`fixed inset-0 z-30 bg-[#081B28]/40 transition-opacity lg:hidden ${
                    abierto ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                id="menu-principal"
                aria-label="Navegación principal"
                className={`fixed left-0 top-0 z-40 flex h-dvh w-[260px] flex-col border-r border-[#e9efea] bg-white/98 shadow-[8px_0_30px_rgba(8,27,40,0.03)] backdrop-blur-sm transition-transform duration-300 lg:translate-x-0 ${
                    abierto ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Encabezado del sidebar: logo y cierre en móvil */}
                <div className="relative flex h-[96px] items-center justify-center border-b border-[#eef3ee] px-6">
                    <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#2F8F00] via-[#39A900] to-[#8AFD5D]" />
                    <img src={StockMind} alt="StockMind" className="w-[145px]" />
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar menú"
                        className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#081B28] lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Enlaces de navegación del panel */}
                <nav className="flex-1 overflow-y-auto px-3 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <p className="px-4 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">Navegación</p>
                    <ul className="space-y-1.5">
                        {enlaces.map((enlace) => {
                            const Icono = enlace.icono;
                            return (
                                <li key={enlace.id}>
                                    <NavLink
                                        to={enlace.ruta}
                                        end={enlace.exacto}
                                        onClick={onCerrar}
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                                                isActive
                                                    ? "bg-[#eff8ec] font-semibold text-[#2f7d20] shadow-[inset_0_0_0_1px_rgba(57,169,0,0.08)] before:absolute before:left-0 before:h-7 before:w-1 before:rounded-r-full before:bg-[#39a900]"
                                                    : "text-gray-600 hover:translate-x-0.5 hover:bg-[#f5f8f5] hover:text-[#081b28]"
                                            }`
                                        }
                                    >
                                        <Icono size={19} strokeWidth={1.9} className="shrink-0" />
                                        <span>{enlace.titulo}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Cerrar sesión */}
                <div className="border-t border-gray-100 p-3">
                    <Link
                        to="/login"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition-[color,background-color,transform] duration-[180ms] hover:translate-x-0.5 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={19} strokeWidth={1.9} />
                        <span>Cerrar sesión</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
