import { useCallback, useEffect, useState } from 'react';

const useCrudApi = ({ listar, crear, actualizar, eliminar }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const recargar = useCallback(async () => {
        setLoading(true);
        try {
            const resultado = await listar();
            setData(resultado);
            setError(null);
            return resultado;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [listar]);

    useEffect(() => {
        const cargarInicial = async () => {
            await recargar();
        };

        void cargarInicial();
    }, [recargar]);

    return {
        data,
        loading,
        error,
        recargar,
        crear,
        actualizar,
        eliminar,
    };
};

export default useCrudApi;
