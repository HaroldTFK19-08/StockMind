import MindBot from "../../../assets/mindbot-logo.svg";

export default function TarjetaMindBot() {
    return (
        <div className="flex w-[188px] shrink-0 items-center gap-2 rounded-2xl border border-[#e5eee4] bg-white p-2.5 text-left shadow-sm">
            <img src={MindBot} alt="" className="h-11 w-11 shrink-0" />
            <span>
                <span className="block text-sm font-bold text-[#081B28]">MindBot</span>
                <span className="block text-xs text-[#64748b]">Asistente de StockMind</span>
            </span>
        </div>
    );
}
