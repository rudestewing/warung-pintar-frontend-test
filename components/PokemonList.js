import Link from 'next/link';
import PokemonCard from './PokemonCard';

export default function PokemonList(props) {
    const {pokemons} = props;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {
                pokemons.map((pokemon) => {
                    return (
                        <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`} className="cursor-pointer hover:cursor-pointer" >
                            <a>
                                <PokemonCard pokemon={pokemon} />
                            </a>
                        </Link>
                    )
                })
            }
        </div>
    )
}