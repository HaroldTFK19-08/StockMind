/**
 * Tabla con el estilo de la app.
 * columnas: títulos de las columnas. children: las filas (<tr>...</tr>).
 * Las celdas <td> toman el estilo automáticamente.
 */
const Tabla = ({ columnas = [], children }) => (
    <div className="surface-card overflow-x-auto rounded-[20px] border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm [&_td]:px-5 [&_td]:py-3.5 [&_td]:align-middle [&_td]:text-[#475569] [&_tbody_tr]:border-t [&_tbody_tr]:border-[#edf1ed] [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[#f7faf6]">
            <thead className="bg-[#f5f8f5]">
                <tr>
                    {columnas.map((columna) => (
                        <th key={columna} className="px-5 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#64748b]">
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
