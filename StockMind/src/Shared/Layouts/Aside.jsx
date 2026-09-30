import { NavLink, Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import StockMind from "../../assets/Capa 1.svg";

export default function NavegacionLayout({
    enlaces = [],
    abierto = false,
    onCerrar,
}) {
    return (
        <>
            {/* Overlay móvil */}
            <div
                onClick={onCerrar}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    abierto
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            />
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-out ${
                    abierto
                        ? "translate-x-0"
                        : "-translate-x-full"
                } lg:translate-x-0`}
            >
                {/* Header */}
                <div className="relative flex h-[100px] items-center justify-center border-b border-slate-100">
                    {/* Logo centrado */}
                    <img
                        src={StockMind}
                        alt="StockMind"
                        className="h-15 w-auto object-contain"
                    />
                    {/* Botón cerrar móvil */}
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar menú"
                        className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>
                {/* Navegación */}
                <nav className="flex-1 overflow-y-auto px-4 py-8">
                    {/* Título */}
                    <p className="mb-5 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                        Menú principal
                    </p>
                    <ul className="m-0 list-none space-y-3 p-0">
                        {enlaces.map(
                            ({ id, titulo, ruta, icono: Icono }) => (
                                <li key={id ?? ruta}>
                                    <NavLink
                                        to={ruta}
                                        end
                                        onClick={onCerrar}
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3.5 text-sm no-underline transition-all duration-200 ${
                                                isActive
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {/* Barra activa */}
                                                {isActive && (
                                                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" />
                                                )}
                                                {/* Icono */}
                                                {Icono && (
                                                    <div
                                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                                                            isActive
                                                                ? "bg-white text-emerald-600 shadow-sm"
                                                                : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-emerald-600"
                                                        }`}
                                                    >
                                                        <Icono
                                                            size={18}
                                                            strokeWidth={
                                                                isActive
                                                                    ? 2.2
                                                                    : 1.8
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                {/* Texto */}
                                                <span
                                                    className={
                                                        isActive
                                                            ? "font-semibold"
                                                            : ""
                                                    }
                                                >
                                                    {titulo}
                                                </span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                {/* Cerrar sesión */}
                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                    <Link
                        to="/login"
                        className="group flex items-center gap-3.5 rounded-xl px-3.5 py-3.5 text-sm font-medium text-slate-600 no-underline transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all duration-200 group-hover:bg-red-100 group-hover:text-red-500">
                            <LogOut
                                size={18}
                                strokeWidth={1.8}
                            />
                        </div>

                        <span>Cerrar sesión</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

