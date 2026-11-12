// Contenedor principal del panel:
// - Reserva espacio para el sidebar en escritorio (lg:ml).
// - Fondo suave con gradiente para una apariencia más moderna sin perder identidad.
export default function ContenidoPrincipal({ children }) {
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#f7faf6_0%,#f4f8f4_45%,#f5f8f5_100%)] lg:ml-[250px]">
            {children}
        </main>
    );
}
