import { useEffect, useState } from "react";
import availablePokemonTypes from "../availablePokemonTypes";

export default function usePokemonTypeStyle(pokemon = null) {
    const [bgClass, setBgClass] = useState('bg-white');
    const [textClass, setTextClass] = useState('text-gray-800');

    const availableTypes = availablePokemonTypes;
    
    useEffect(() => {
        if(pokemon) {
            const filteredTypes = pokemon.types.filter((type) => {
                return String(type.type.name) !== 'normal';
            });
            
            const firstType = filteredTypes.length ? filteredTypes[0] : null;
    
            if(firstType) {
                const selectedType = availableTypes.find((availableType) => {
                    return String(availableType.name) === String(firstType.type.name);
                });
    
                setBgClass(selectedType.bgClass);
                setTextClass(selectedType.textClass);
            } 
        }
    }, []);

    return {
        bgClass,
        textClass,
        availableTypes
    };

}