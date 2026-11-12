import { useEffect, useRef } from "react";
import Header from "../Components/Header";
import Seccion_inicio from "../Components/SeccionIntroductorio";
import Nosotros from "../Components/Nosotros";
import Servicios from "../Components/Servicios";
import Contactos from "../Components/Contactos";
import Footer from "../Components/Footer";
import MindBotComponent from "../Components/MindBot";
import TarjetaMindBot from "../../../Shared/Components/Cards/TarjetaMindBot";

export default function Inicio() {
  const inicioRef = useRef(null);

  useEffect(() => {
    const cards = inicioRef.current?.querySelectorAll("[data-reveal-card]");
    if (!cards?.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) =>
        card.classList.add(
          "animate-auth-card-reveal",
          "[animation-delay:var(--auth-card-delay,0ms)]",
        ),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate-auth-card-reveal",
              "[animation-delay:var(--auth-card-delay,0ms)]",
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -24px 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={inicioRef}
      className="m-0 min-h-screen box-border p-0 font-['Plus_Jakarta_Sans'] text-[#1F2937]"
    >
      <Header />
      <Seccion_inicio />
      <Nosotros />
      <Servicios />
      <MindBotComponent />
      <Contactos />
      <Footer />
      <a
        href="#mindbot"
        aria-label="Ir a la sección informativa sobre MindBot"
        className="fixed bottom-4 right-4 z-50 block rounded-2xl transition-transform hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39A900]"
      >
        <TarjetaMindBot />
      </a>
    </div>
  );
}
