import {useRouter, withRouter} from 'next/router';
import { useEffect, useState } from 'react';
import pokemonApi from '../../services/api/pokemonApi';
import Link from 'next/link';
import usePokemonTypeStyle from '../../lib/hooks/usePokemonTypeStyle';
import PokemonBaseStats from '../../components/PokemonBaseStats';

function PokemonDetail(props) {
    const {pokemon} = props;
    const router = useRouter();
    const [activeAvatar, setActiveAvatar] = useState(pokemon.sprites.front_default || '');
    const [frontAvatar] = useState(pokemon.sprites.front_default || '');
    const {textClass, bgClass} = usePokemonTypeStyle(pokemon);
    const [availableSprites] = useState(
        Object.keys(pokemon.sprites).map((key) => {
            return pokemon.sprites[key];
        })
        .filter((item) => {
            return item !== null && typeof item == 'string';
        })
    )

    return (
        <div className="">
            <div className="text-center mb-4">
                {/* <Link href="/"> */}
                    <a onClick={() => router.back()} className="text-blue-500 underline">Back</a>
                {/* </Link> */}
            </div>
            <div className={`flex flex-col items-center ${bgClass} py-5`}>
                {
                    pokemon.sprites ? 
                        (
                            <div className="w-48 h-48">
                                <img src={activeAvatar} alt="" className="h-full w-full object-cover object-center"/>
                            </div> 
                        ) :
                        ('')
                }
                <div className={`text-center font-bold tracking-wider text-xl md:text-2xl mb-3 ${textClass}`}>
                    {String(pokemon.name).toUpperCase()}
                </div>
                <div className="mb-3 flex flex-wrap justify-center w-full md:w-1/2 mx-auto rounded-lg">
                    {
                        availableSprites.map((availableSprite, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className=" w-20 h-20 bg-white p-1 cursor-pointer border-2 border-transparent hover:border-blue-500" 
                                    onMouseOver={() => setActiveAvatar(availableSprite)}
                                    onMouseLeave={() => setActiveAvatar(frontAvatar)}
                                    >
                                    <img src={availableSprite} alt=""/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
                <div className="bg-white shadow-lg rounded-lg p-5">
                    <h3 className="text-gray-900 font-bold text-xl mb-2">
                        Base Stats
                    </h3>
                    <div>
                        <PokemonBaseStats baseStats={pokemon.stats} />
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5">
                    <div className="mb-4">
                        <h3 className="text-gray-900 font-bold text-xl mb-2">
                            Types
                        </h3>
                        <div>
                            {
                                pokemon.types.map((type, index) => {
                                    return (
                                        <span key={index} className="mr-2 mb-2 rounded-lg border px-2 py-1 border-gray-600 inline-block">
                                            {type.type.name}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-gray-900 font-bold text-xl mb-2">
                            Abilities
                        </h3>
                        <div>
                            {
                                pokemon.abilities.map((ability, index) => {
                                    return (
                                        <span key={index} className="mr-2 mb-2 rounded-lg border px-2 py-1 border-gray-600 inline-block">
                                            {ability.ability.name}
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


PokemonDetail.getInitialProps = async (context) => {
    try {
        const {name: pokemonName} = context.query;
        const pokemon = await pokemonApi.getByName(pokemonName);

        const {
            id,
            name,
            abilities,
            moves,
            types,
            stats,
            sprites
        } = pokemon;

        return {
            pokemon: {
                id,
                name,
                abilities,
                moves,
                types,
                stats,
                sprites
            },
        }
    } catch (error) {
        throw error;
    } 

    
} 

export default PokemonDetail;