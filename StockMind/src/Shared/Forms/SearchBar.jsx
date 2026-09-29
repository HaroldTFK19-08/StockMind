import { Search, SlidersHorizontal } from 'lucide-react'

const SearchBar = ({
    placeholder = 'Buscar...',
    value,
    onChange,
    onFiltrar
}) => {
    return (
        <div className="mb-[30px] flex w-full gap-[15px]">
            <div className="relative flex flex-1 items-center">
                <Search
                    size={18}
                    strokeWidth={2}
                    className="absolute left-5 text-[#64748b]"
                />

                <input
                    type="text"
                    placeholder={placeholder}
                    value={value ?? ''}
                    onChange={onChange}
                    className="w-full rounded-[15px] border-2 border-[#edf2f7] bg-white py-[15px] pl-[55px] pr-[15px] font-jakarta text-[0.95rem] text-[#081B28] outline-none transition-all duration-300 placeholder:text-[#94a3b8] focus:border-[#39A900] focus:bg-white focus:shadow-[0_0_0_4px_rgba(73,169,25,0.1)]"
                />
            </div>

            <button
                type="button"
                onClick={onFiltrar}
                className="flex items-center gap-2 rounded-[15px] border-2 border-[#edf2f7] bg-white px-[25px] font-jakarta font-semibold text-[#081B28] transition-all duration-300 hover:border-[#cbd5e1] hover:bg-[#f8f9fa]"
            >
                <SlidersHorizontal
                    size={18}
                    strokeWidth={2}
                    className="text-[#39A900]"
                />

                <span>Filtros</span>
            </button>
        </div>
    )
}

export default SearchBar
