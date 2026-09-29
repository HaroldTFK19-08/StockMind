const ElementoCard = ({ elemento }) => {
    const {
        nombre,
        codigoVisible,
        ubicacion,
        instructor,
        fecha,
        hora,
        estado
    } = elemento
    return (
        <section className="w-full overflow-hidden rounded-[18px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-[rgba(73,169,25,0.2)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse font-jakarta">
                    <thead>
                        <tr className="bg-[#f8fafc]">
                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Elemento
                            </th>

                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Centro / Ambiente
                            </th>

                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Instructor
                            </th>

                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Fecha Asignación
                            </th>

                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Hora
                            </th>

                            <th className="border-b-2 border-[#f1f5f9] px-5 py-[18px] text-left text-[0.85rem] font-bold uppercase tracking-[0.5px] text-[#64748b]">
                                Estado
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="transition-colors duration-200 hover:bg-[#fcfdfe]">
                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle">
                                <div className="flex flex-col gap-1">
                                    <strong className="text-base font-bold text-[#111827]">
                                        {nombre}
                                    </strong>

                                    <span className="w-fit rounded-md bg-[#f0fdf4] px-2 py-0.5 text-[0.8rem] font-semibold text-[#39A900]">
                                        {codigoVisible}
                                    </span>
                                </div>
                            </td>

                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle text-[0.95rem] font-medium text-[#4b5563]">
                                {ubicacion}
                            </td>

                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle text-[0.95rem] font-medium text-[#4b5563]">
                                {instructor}
                            </td>

                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle font-mono text-[0.9rem] font-semibold text-[#6366f1]">
                                {fecha}
                            </td>

                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle font-mono text-[0.9rem] font-semibold text-[#6366f1]">
                                {hora}
                            </td>

                            <td className="border-b border-[#f8fafc] px-5 py-5 align-middle">
                                <span className="inline-flex items-center rounded-[50px] border border-[#d1fae5] bg-[#ecfdf5] px-3.5 py-1.5 text-[0.8rem] font-bold text-[#059669]">
                                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                                    {estado}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ElementoCard
