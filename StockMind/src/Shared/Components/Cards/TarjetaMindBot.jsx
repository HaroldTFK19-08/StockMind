import MindBot from "../../../assets/mindbot-logo.svg";

export default function TarjetaMindBot() {
    return (
        <button
            type="button"
            aria-label="MindBot, asistente virtual de StockMind"
            className="flex w-[188px] shrink-0 items-center gap-2 rounded-2xl border border-[#e5eee4] bg-white p-2.5 text-left shadow-sm transition hover:border-[#39A900] hover:bg-[#f8fcf7] hover:shadow-md active:scale-[0.98]"
        >
            <img src={MindBot} alt="" className="h-11 w-11 shrink-0" />
            <span>
                <span className="block text-sm font-bold text-[#081B28]">MindBot</span>
                <span className="block text-xs text-[#64748b]">Asistente de StockMind</span>
            </span>
        </button>
    );
}
