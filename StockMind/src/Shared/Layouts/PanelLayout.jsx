import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import NavegacionLayout from "./Aside";
import Cabecera from "./Header";
import ContenidoPrincipal from "./Main";

/**
 * Layout de los paneles internos (Aprendiz, Instructor, Admin...).
 * Se monta UNA sola vez y las páginas se pintan dentro del <Outlet />,
 * así el menú no se recarga al navegar.
 *
 * - enlaces: enlaces del menú lateral.
 * - enlacePerfil: ruta del botón de perfil de la cabecera.
 * - titulosExtra: títulos para rutas que no están en el menú
 *   (ej. { "/aprendiz/perfil": "Mi perfil" }).
 */
export default function PanelLayout({ enlaces = [], enlacePerfil, titulosExtra = {} }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { pathname } = useLocation();
    const ruta = pathname.replace(/\/+$/, "");
    const titulo =
        enlaces.find((enlace) => enlace.ruta === ruta)?.titulo ??
        titulosExtra[ruta] ??
        "";
    return (
        <div>
            <NavegacionLayout
                enlaces={enlaces}
                abierto={menuAbierto}
                onCerrar={() => setMenuAbierto(false)}
            />
            <ContenidoPrincipal>
                <Cabecera
                    contenido={titulo}
                    enlacePerfil={enlacePerfil}
                    onAbrirMenu={() => setMenuAbierto(true)}
                />
                <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8">
                    <Outlet />
                </div>
            </ContenidoPrincipal>
        </div>
    );
}
