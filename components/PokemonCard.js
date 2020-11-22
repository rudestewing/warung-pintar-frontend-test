import { useEffect, useState } from "react";
import usePokemonTypeStyle from "../lib/hooks/usePokemonTypeStyle";

export default function PokemonCard(props) {
    const {pokemon} = props;
    const {textClass, bgClass} = usePokemonTypeStyle(pokemon)

    return (
        <div className={`rounded-lg shadow-lg cursor-pointer hover:cursor-pointer p-3 ${bgClass}`}>
            <div className={`font-bold tracking-wider ${textClass}`}>
                {String(pokemon.name).toUpperCase()}
            </div>
            <div className="flex my-3">
                <div className="w-1/3 pr-2">
                    {
                        pokemon.types.map((type, index) => {
                            return (
                                <div key={index} className={textClass}>
                                    {type.type.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-2/3">
                    <div>
                        <img src={pokemon?.sprites?.front_default} alt="" className="w-full h-full object-center object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    )
}