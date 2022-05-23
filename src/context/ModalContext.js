import React,{createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    // state del provider
    const [ idReceta, guardarIdReceta ] = useState(null);
    const [ informacion, guardarReceta ] = useState({});

    useEffect(() => {
        if(idReceta) {
            const obtenerReceta = async () => {
                
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
                const receta = await axios.get(url);
                guardarReceta(receta.data.drinks[0]);

            }
            obtenerReceta();
        }
    }, [idReceta]);
    

    return(
        <ModalContext.Provider
            value={{
                idReceta,
                guardarIdReceta,
                informacion,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;
