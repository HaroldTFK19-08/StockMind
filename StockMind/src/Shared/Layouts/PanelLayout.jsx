import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import NavegacionLayout from "./Aside";
import Cabecera from "./Header";
import ContenidoPrincipal from "./Main";
import { buscarTituloRuta } from "../Utils/rutas";

/**
 * Layout de los paneles (Aprendiz, Instructor, Cuentadante, Admin).
 * El menú y la cabecera se montan una vez; cada página se pinta en <Outlet />.
 *
 * panel = {
 *   enlaces: [...]            enlaces del menú
 *   rutaPerfil: "/rol/perfil"
 *   rutaNotificaciones: "/rol/notificaciones"
 *   titulosExtra: { "/rol/perfil": "Mi perfil" }   títulos de rutas que no están en el menú
 * }
 */
export default function PanelLayout({ panel }) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { pathname } = useLocation();

    return (
        <div>
            <NavegacionLayout
                enlaces={panel.enlaces}
                abierto={menuAbierto}
                onCerrar={() => setMenuAbierto(false)}
            />

            <ContenidoPrincipal>
                {/* Cabecera fija del panel (título de ruta, perfil, notificaciones, menú móvil) */}
                <Cabecera
                    contenido={buscarTituloRuta(pathname, panel.enlaces, panel.titulosExtra)}
                    enlacePerfil={panel.rutaPerfil}
                    enlaceNotificaciones={panel.rutaNotificaciones}
                    onAbrirMenu={() => setMenuAbierto(true)}
                />

                {/* Área de contenido de cada página del módulo/rol.
                    - Ancho máximo para lectura cómoda.
                    - Espaciado amplio y animación de entrada para una UI más pulida. */}
                <div className="animate-page-enter mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
                    <Outlet />
                </div>
            </ContenidoPrincipal>
        </div>
    );
}
