// Contenedor principal del panel.
// Reserva espacio para el aside en escritorio y aplica fondo suave de la plataforma.
export default function ContenidoPrincipal({ children }) {
    return (
        <main className="min-h-dvh bg-[linear-gradient(180deg,#f7faf6_0%,#f4f8f4_45%,#f5f8f5_100%)] lg:ml-[288px]">
            {children}
        </main>
    );
}
