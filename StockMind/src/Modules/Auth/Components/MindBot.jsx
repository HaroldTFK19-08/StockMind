import { Sparkles } from "lucide-react";
import MindBot from "../../../assets/mindbot-logo.svg";

export default function MindBotComponent() {
    return (
        <section
            id="mindbot"
            aria-labelledby="mindbot-title"
            className="bg-white px-[5%] py-14 sm:py-20"
        >
            <div className="mx-auto max-w-[1200px]">
                <div className="relative grid items-center gap-8 overflow-hidden rounded-[32px] border border-[#dce9d8] bg-gradient-to-br from-[#f3faef] via-white to-[#eff8ec] p-6 shadow-[0_16px_50px_rgba(8,27,40,0.08)] sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#39A900]/10 blur-3xl"
                    />

                    <div className="relative z-10 max-w-2xl">
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8ebd1] bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2f8f00]">
                            <Sparkles size={14} />
                            Inteligencia artificial en StockMind
                        </span>
                        <h2
                            id="mindbot-title"
                            className="text-3xl font-extrabold tracking-tight text-[#081B28] sm:text-4xl"
                        >
                            Conoce a MindBot
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#52616b] sm:text-base">
                            MindBot es el asistente de inteligencia artificial de StockMind,
                            diseñado para acompañarte y orientarte durante tu experiencia en
                            la plataforma.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2f8f00]">
                            <span className="h-2 w-2 rounded-full bg-[#39A900]" />
                            Tu asistente virtual
                        </span>
                    </div>

                    <div className="relative z-10 mx-auto flex h-40 w-40 items-center justify-center rounded-[32px] border border-white/80 bg-white/75 shadow-[0_18px_45px_rgba(8,27,40,0.10)] sm:h-48 sm:w-48">
                        <img
                            src={MindBot}
                            alt="Ilustración de MindBot, asistente de inteligencia artificial de StockMind"
                            className="h-32 w-32 sm:h-40 sm:w-40"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}