/**
 * Tabla con el estilo de la app.
 * columnas: títulos de las columnas. children: las filas (<tr>...</tr>).
 * Las celdas <td> toman el estilo automáticamente.
 */
const Tabla = ({ columnas = [], children }) => (
    <div className="overflow-x-auto rounded-[20px] border border-[#f1f5f9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
        <table className="w-full min-w-[640px] text-left text-sm [&_td]:px-5 [&_td]:py-3.5 [&_td]:align-middle [&_td]:text-[#475569] [&_tbody_tr]:border-t [&_tbody_tr]:border-[#f1f5f9] [&_tbody_tr:hover]:bg-[#fafbfc]">
            <thead className="bg-[#F7F9F6]">
                <tr>
                    {columnas.map((columna) => (
                        <th key={columna} className="px-5 py-3 text-xs font-semibold text-[#64748b]">
                            {columna}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </div>
)

export default Tabla
