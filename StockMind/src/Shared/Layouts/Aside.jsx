import { NavLink, Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import StockMind from "../../assets/Capa 1.svg";

/**
 * Menú lateral de todos los paneles.
 * Cada enlace es: { id, titulo, ruta, icono }  (icono = componente de lucide-react)
 * En celular se muestra como panel deslizable (abierto / onCerrar).
 */
export default function NavegacionLayout({ enlaces = [], abierto = false, onCerrar }) {
    return (
        <>
            {/* Fondo oscuro detrás del menú (solo celular) */}
            <div
                onClick={onCerrar}
                className={`fixed inset-0 z-30 bg-[#081B28]/40 transition-opacity lg:hidden ${
                    abierto ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <aside
                className={`fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
                    abierto ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="relative flex h-[100px] items-center justify-center border-b border-gray-100">
                    <img src={StockMind} alt="StockMind" className="w-[150px]" />
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar menú"
                        className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Enlaces */}
                <nav className="flex-1 overflow-y-auto px-3 py-6">
                    <ul className="space-y-2">
                        {enlaces.map((enlace) => {
                            const Icono = enlace.icono;
                            return (
                                <li key={enlace.id}>
                                    <NavLink
                                        to={enlace.ruta}
                                        end={enlace.exacto}
                                        onClick={onCerrar}
                                        className={({ isActive }) =>
                                            `relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                                                isActive
                                                    ? "bg-green-50 font-semibold text-green-700 before:absolute before:left-0 before:h-7 before:w-1 before:rounded-r-full before:bg-green-600"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`
                                        }
                                    >
                                        <Icono size={19} strokeWidth={1.9} />
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
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={19} strokeWidth={1.9} />
                        <span>Cerrar sesión</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
