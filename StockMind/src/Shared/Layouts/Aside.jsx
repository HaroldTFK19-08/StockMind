import { NavLink } from "react-router-dom";
import StockMind from "../../assets/Capa 1.svg";

const Aside = ({ enlaces }) => {
    return (
        <aside className="fixed top-0 left-0 w-[250px] h-screen bg-white border-r border-gray-200 shadow-sm">
            {/* Logo */}
            <div className="h-[100px] flex items-center justify-center border-b border-gray-100">
                <img
                    src={StockMind}
                    alt="StockMind"
                    className="w-[150px] h-auto"
                />
            </div>
            {/* Navegación */}
            <nav className="px-3 py-6">
                <ul className="list-none p-0 m-0 space-y-2">
                    {enlaces.map((enlace) => (
                        <NavLink
                            key={enlace.ruta}
                            to={enlace.ruta}
                            className="block no-underline"
                        >
                            {({ isActive }) => (
                                <li
                                    className={`
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-xl
                                        text-sm
                                        transition-all
                                        duration-200
                                        cursor-pointer
                                        ${
                                            isActive
                                                ? "bg-green-50 text-green-700 font-semibold"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    {/* Indicador activo */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-green-600 rounded-r-full"></span>
                                    )}
                                    {/* Icono */}
                                    <i
                                        className={`
                                            ${enlace.icono}
                                            text-lg
                                            w-6
                                            text-center
                                            transition-colors
                                            duration-200
                                            ${
                                                isActive
                                                    ? "text-green-600"
                                                    : "text-gray-400 group-hover:text-gray-700"
                                            }
                                        `}
                                    ></i>
                                    {/* Nombre */}
                                    <span>
                                        {enlace.nombre}
                                    </span>
                                </li>
                            )}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
export default Aside;