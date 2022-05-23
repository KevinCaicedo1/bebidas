import axios from 'axios';
import React, {createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CategoriasContext = createContext();


// provider es donde se encuentran las variables y funciones que se van a utilizar en el resto de los componentes
const CategoriasProvider = (props) => {
    
    // crear el state del contexto
   const [categorias, guardarCategorias] = useState([]);
   //
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);

        }
        consultarApi();
    }, []);



    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriasProvider;

