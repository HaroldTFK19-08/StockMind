import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import StockMind from "../../assets/Capa 1.svg";
import useAuth from "../../Modules/Auth/Hooks/useAuth";

/**
 * Aside compartido por los paneles (admin, instructor, aprendiz, etc.).
 * Diseño limpio, intuitivo y alineado con la estructura del layout.
 */
export default function NavegacionLayout({
  enlaces = [],
  abierto = false,
  onCerrar,
}) {
  const navigate = useNavigate();
  const { cerrarSesion } = useAuth();

  useEffect(() => {
    if (!abierto) return undefined;

    const cerrarConEscape = (evento) => {
      if (evento.key === "Escape") onCerrar();
    };

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", cerrarConEscape);
    };
  }, [abierto, onCerrar]);

  const salir = async () => {
    await cerrarSesion();
    onCerrar();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Overlay para móvil */}
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar menú"
        tabIndex={abierto ? 0 : -1}
        className={`fixed inset-0 z-30 bg-[#081B28]/35 transition-opacity duration-200 lg:hidden ${
          abierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="menu-principal"
        aria-label="Navegación principal"
        className={`fixed left-0 top-0 z-40 flex h-dvh w-[288px] flex-col border-r border-[#e7ece6] bg-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="relative flex h-[100px] shrink-0 items-center justify-center border-b border-[#edf2ec] px-6">
          <div className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#2F8F00] via-[#39A900] to-[#8AFD5D]" />
          <img
            src={StockMind}
            alt="StockMind"
            className="w-[148px] object-contain"
          />

          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="absolute right-4 top-4 rounded-lg p-2 text-[#64748b] transition-colors hover:bg-[#f3f6f3] hover:text-[#081B28] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
            Navegación
          </p>

          <ul className="space-y-1">
            {enlaces.map((enlace) => {
              const Icono = enlace.icono;
              return (
                <li key={enlace.id}>
                  <NavLink
                    to={enlace.ruta}
                    end={enlace.exacto}
                    onClick={onCerrar}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#edf7e9] text-[#2f7d20]"
                          : "text-[#5b6b76] hover:bg-[#f5f8f4] hover:text-[#081B28]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Indicador activo */}
                        <span
                          className={`absolute left-0 h-6 w-[3px] rounded-r-full bg-[#39A900] transition-opacity duration-200 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-[#39A900]/12 text-[#2f7d20]"
                              : "text-[#70838f] group-hover:bg-[#eaf3e7] group-hover:text-[#2f7d20]"
                          }`}
                        >
                          <Icono size={18} strokeWidth={1.9} />
                        </span>

                        <span>{enlace.titulo}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Cerrar sesión */}
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            onClick={salir}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition-[color,background-color,transform] duration-[180ms] hover:translate-x-0.5 hover:bg-red-50 hover:text-red-600"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-red-100/70">
              <LogOut size={18} strokeWidth={1.9} />
            </span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
