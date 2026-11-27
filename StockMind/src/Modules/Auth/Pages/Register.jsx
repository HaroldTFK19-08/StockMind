import PanelRegistro from "../Components/PanelRegistro";
import PanelFormularioRegistro from "../Components/PanelFormularioRegistro";

// Página de registro:
// - Mantiene la estructura de dos paneles del módulo Auth.
// - La página ocupa el viewport: el panel izquierdo queda fijo y el derecho tiene scroll.
const Register = () => {
  return (
    <main className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-[#f5f8f3] p-0">
      {/* Decoración suave de fondo (no interactiva) */}
      <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#39A900]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#8AFD5D]/12 blur-3xl" />

      {/* Card principal a altura de viewport: solo el panel derecho scrollea */}
      <div className="relative flex h-full min-h-0 w-full max-w-[1120px] overflow-hidden rounded-[18px] border border-[#e4eadf] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
        <PanelRegistro />
        <PanelFormularioRegistro />
      </div>
    </main>
  );
};

export default Register;
