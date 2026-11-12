import StockMind from "../../../assets/Capa 1.svg";

const Cargando = ({ texto = "Cargando..." }) => (
  <div className="fixed inset-0 z-[100] isolate flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#2F8F00_0%,#39A900_52%,#2F8F00_100%)] px-5 py-10 text-[#081B28]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.2),transparent_48%)]" />
    <div className="animate-loader-glow pointer-events-none absolute -left-40 -top-40 size-[32rem] rounded-full bg-white/15 blur-3xl" />
    <div className="animate-loader-glow pointer-events-none absolute -bottom-48 -right-40 size-[36rem] rounded-full bg-[#8AFD5D]/25 blur-3xl [animation-delay:900ms]" />

    <div
      role="status"
      className="animate-card-enter relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/80 bg-white px-7 py-11 text-center shadow-[0_36px_120px_rgba(8,27,40,0.25)] sm:px-16 sm:py-14"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#2F8F00] via-[#39A900] to-[#8AFD5D]" />

      <div className="relative mx-auto mb-8 flex h-48 w-80 max-w-full items-center justify-center">
        <div className="animate-loader-orbit absolute h-36 w-64 max-w-full rounded-[50%] border border-[#39A900]/20 border-t-[#2F8F00]" />
        <div className="animate-loader-orbit-reverse absolute h-44 w-72 max-w-full rounded-[50%] border border-dashed border-[#39A900]/15" />
        <div className="animate-loader-glow absolute h-32 w-56 rounded-full bg-[#8AFD5D]/35 blur-3xl" />
        <span className="animate-pulse absolute left-10 top-8 size-1.5 rounded-full bg-[#2F8F00] shadow-[0_0_14px_#39A900]" />
        <span className="animate-pulse absolute bottom-7 right-12 size-1 rounded-full bg-[#8AFD5D] [animation-delay:700ms]" />
        <img
          src={StockMind}
          alt="StockMind"
          className="animate-loader-float relative z-10 w-60 max-w-[78%] drop-shadow-[0_8px_24px_rgba(57,169,0,0.18)]"
        />
      </div>

      <div className="flex items-center justify-center gap-3 text-xl font-semibold tracking-tight text-[#081B28] sm:text-2xl">
        <span
          className="animate-pulse size-2 rounded-full bg-[#39A900] shadow-[0_0_16px_rgba(57,169,0,0.55)]"
          aria-hidden="true"
        />
        <span aria-live="polite">{texto}</span>
      </div>
      <p className="mt-3 text-sm text-[#6B7280]">
        Estamos preparando todo para ti
      </p>
    </div>
  </div>
);

export default Cargando;
