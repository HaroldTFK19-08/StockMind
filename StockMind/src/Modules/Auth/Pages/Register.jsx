import PanelRegistro from '../Components/PanelRegistro'
import PanelFormularioRegistro from '../Components/PanelFormularioRegistro'

// Página de registro:
// - Mantiene la estructura de dos paneles (información + formulario).
// - Mejora el contenedor visual para una apariencia más profesional y moderna.
const Register = () => {
    return (
        <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f7faf6_0%,#f4f8f4_45%,#f5f8f5_100%)] px-4 py-6 sm:px-6 sm:py-8">
            {/* Decoración suave de fondo (no interactiva) */}
            <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#39A900]/8 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8AFD5D]/10 blur-3xl" />

            <div className="relative flex w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-[#e6ece5] bg-white shadow-[0_24px_70px_rgba(8,27,40,0.12)]">
                <PanelRegistro />
                <PanelFormularioRegistro />
            </div>
        </main>
    )
}

export default Register