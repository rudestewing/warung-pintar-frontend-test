import {createContext, useState} from 'react';

const Context = createContext();

const Provider = (props) => {
    const [pokemons, setPokemons] = useState([]);

    return (
        <Context.Provider value={{
            
        }}>

        </Context.Provider>
    )
}

export default {
    Context,
    Provider,
}