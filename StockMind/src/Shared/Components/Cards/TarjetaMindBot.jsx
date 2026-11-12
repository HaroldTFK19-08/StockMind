import { motion } from "motion/react";
import MindBot from "../../../assets/mindbot-logo.svg";

export default function TarjetaMindBot() {
    return (
        <motion.div
            // Tarjeta compacta con entrada y hover usando motion.
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="flex w-[188px] shrink-0 items-center gap-2 rounded-2xl border border-[#e5eee4] bg-white p-2.5 text-left shadow-sm"
        >
            <motion.img
                src={MindBot}
                alt=""
                className="h-11 w-11 shrink-0"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>
                <span className="block text-sm font-bold text-[#081B28]">MindBot</span>
                <span className="block text-xs text-[#64748b]">Asistente de StockMind</span>
            </span>
        </motion.div>
    );
}
