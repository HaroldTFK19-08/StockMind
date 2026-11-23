import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import NavegacionLayout from "./Aside";
import Cabecera from "./Header";
import ContenidoPrincipal from "./Main";
import { buscarTituloRuta } from "../Utils/rutas";
import Cargando from "../Components/Feedback/Cargando";

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
    const [rutaCargada, setRutaCargada] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === rutaCargada) return;

        const temporizador = setTimeout(() => setRutaCargada(pathname), 500);
        return () => clearTimeout(temporizador);
    }, [pathname, rutaCargada]);

    return (
        <>
            <a href="#contenido-principal" className="skip-link">
                Saltar al contenido principal
            </a>
            {pathname !== rutaCargada && <Cargando texto="Cargando página..." />}
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
                        menuAbierto={menuAbierto}
                    />

                    {/* Área de contenido de cada página del módulo/rol.
                        - Ancho máximo para lectura cómoda.
                        - Espaciado amplio y animación de entrada para una UI más pulida. */}
                    <div
                        id="contenido-principal"
                        tabIndex="-1"
                        className="animate-page-enter mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10 focus:outline-none"
                    >
                        <Outlet />
                    </div>
                </ContenidoPrincipal>
            </div>
        </>
    );
}
