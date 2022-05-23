import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        if (consultar) {
        const consultarApi = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
            const recetas = await axios.get(url);
            
            guardarRecetas(recetas.data.drinks);

        }
        consultarApi();
        }
    }, [busqueda, consultar]);

    return (
        <RecetasContext.Provider
            value={{
                buscarRecetas,
                guardarConsultar,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;
