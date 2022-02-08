import React, { createContext,  useState } from "react";

export const RestaurentsContext = createContext();

export const RestaurentsContextProvider = (props) => {
    const [restaurents, setRestaurents] = useState([]);
    const [selectedRestaurent , setSelectedRestaurent] = useState(null);
    
    const addRestaurents = (restaurent) => {
        setRestaurents([...restaurents,restaurent]);
    };  
 
    return ( <
        RestaurentsContext.Provider value = {
            { restaurents, setRestaurents ,addRestaurents , selectedRestaurent , setSelectedRestaurent }
        } > { props.children }
        </RestaurentsContext.Provider >
    );
};