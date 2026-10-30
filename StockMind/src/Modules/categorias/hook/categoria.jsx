import { useEffect, useState } from "react";
import { ObterCategorias } from "../service/ListarCategoria";

export const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await ObterCategorias();
                setCategorias(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    return { categorias, loading, error };
};
