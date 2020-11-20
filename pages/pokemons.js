import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import {fetch as fetchPokemons, getByName} from '../service/api/pokemonApi';
import {fetchAll} from '../service/api/typeApi';
import Link from 'next/link';

function PokemonsIndex(props) {
    const router = useRouter();
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(router.query.page || 1);
    const [filter, setFilter] = useState({
        name: router.query.type ? 'type' : null,
        valueName: router.query.type || '',
    });
    const [availableTypes, setAvailableTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);


    async function fetchData() {
        const pokemon = await fetchPokemons(page, filter);
        return await Promise.all(
            pokemon.results.map(async (item) => {
                const pokemon = await getByName(item.name);
                if(pokemon) {
                    const {
                        id,
                        name,
                        types,
                        sprites,
                    } = pokemon;

                    return {
                        id,
                        name,
                        types,
                        sprites: {
                            front_default: sprites.front_default
                        }    
                    };
                }
                return item;
            })
        );
    }

    useEffect(async () => {
        const types = await fetchAll();
        setAvailableTypes([...types]);
        setPokemons([]);
        setInitialized(false);

        const activePokemons = await fetchData();

        setPokemons([...activePokemons]);
        setInitialized(true);
                
        return () => {

        }
    }, [])

    useEffect(async () => {
        if(initialized) {
            setPokemons([]);
            const activePokemons = await fetchData();
            setPokemons([...activePokemons]);
        }
    }, [filter]);

    useEffect(async () => {
        if(initialized) {
            const activePokemons = await fetchData();

            setPokemons([
                ...pokemons,
                ...activePokemons
            ]);
        }
    }, [page]);


    function loadMore() {
        setPage(page+1);
    }

    function loadPrevious() {
        let _page = page -1;
        setPage(_page > 0 ? _page : 0);
    }
    
    return (
        <div>
            <div>
                <select onChange={(e) => {
                    return setFilter({
                        name: 'type',
                        valueName: e.target.value,
                    });
                }} value={filter.valueName}>
                    <option value=""> All </option>
                    {
                        availableTypes.map((availableType, index) => {
                            return (
                                <option key={index} value={availableType.name}>
                                    {availableType.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <button onClick={loadPrevious}>Load Previous</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                            <Link key={index} href={`/pokemons/${pokemon.name}`} className="cursor-pointer hover:cursor-pointer" >
                                <div key={index} className="bg-white rounded-lg shadow-lg cursor-pointer hover:cursor-pointer">
                                    <div>
                                        {pokemon.name}
                                    </div>
                                    <img src={pokemon.sprites.front_default} alt=""/>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <button onClick={loadMore} disabled={loading ? true : false}>
                {loading ? 'loading ...' : 'load more'}
            </button>
        </div>
    )
}

PokemonsIndex.getInitialProps = async (context) => {
    const {
        pathname,
        query,
        asPath,
        // req,
        // res, 
        err
    } = context;
    
    return {
        contextObject: {
            pathname,
            query,
            asPath,
            // req,
            // res, 
            err
        }
    }
}

export default PokemonsIndex;