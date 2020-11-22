import { useEffect, useState } from "react"
import {useRouter} from 'next/router';
import pokemonApi from '../services/api/pokemonApi';
import typeApi from '../services/api/typeApi';
import PokemonList from "../components/PokemonList";
import usePageBottom from "../lib/hooks/usePageBottom";

function Index(props) {
    const router = useRouter();
    const [pokemons, setPokemons] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [availableTypes, setAvailableTypes] = useState([]);

    const [filter, setFilter] = useState({
        page: props.query.page ? parseInt(props.query.page) : 1,
        type: props.query.type ? String(props.query.type) : null,
    });

    const [hasNext, setHasNext] = useState(null);

    const isPageBottom = usePageBottom();
    
    function handleSelectType(e) {
        setFilter({
            page: 1,
            type: e.target.value
        });

        router.push({
            pathname: '/',
            query: {
                page: 1,
                type: e.target.value
            }
        })
    }

    async function fetchAllTypes() {
        const types = await typeApi.fetchAll();
        setAvailableTypes([...types]);
    }

    async function fetchPokemons() {
        const pokemonData = await pokemonApi.fetch(filter);
        setHasNext(pokemonData.next ? true : false);
        
        return await Promise.all(
            pokemonData.results.map(async (item) => {
                const pokemon = await pokemonApi.getByName(item.name);
                if(pokemon) {
                    const {
                        id,
                        name,
                        types,
                        sprites
                    } = pokemon;

                    return {
                        id,
                        name,
                        types,
                        sprites
                    }
                } else {
                    return null;
                }
            })
        );
    }

    useEffect(() => {
        fetchAllTypes();
    }, []);

    useEffect(() => {
        if(isPageBottom && !isFetching && hasNext) {
            setFilter({
                ...filter,
                page: filter.page + 1
            });
        }
    }, [isPageBottom]);

    useEffect(() => {
        if(filter.page > 1) {
            router.push({
                pathname: '/',
                query: {
                    page: filter.page,
                    type: router.query.type,
                }
            })
            loadMore();
        }
    }, [filter.page]);

    useEffect(() => {
        initLoad();
    }, [filter.type])

    async function initLoad() {
        setIsFetching(true);
        setPokemons([]);
        const activePokemons = await fetchPokemons();
        setPokemons([...activePokemons]);
        setIsFetching(false);
    }

    async function loadMore() {
        if(hasNext) {
            setIsFetching(true);
            const activePokemons = await fetchPokemons();
            setPokemons([...pokemons, ...activePokemons]);
            setIsFetching(false);
        }
    }

    return (
        <div>
            <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor="" className="block"> Filter Type </label>
                    <select onChange={handleSelectType} value={filter.type} className="block w-full">
                        <option value=""> All </option>
                        {
                            availableTypes.map((type, index) => {
                                return (
                                    <option key={index} value={type.name}>{String(type.name).toUpperCase()}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            
            {
                !pokemons.length ||
                    <PokemonList pokemons={pokemons} />
            }

            <div className="my-5 text-center">
                {
                    !isFetching && hasNext ? 
                        (
                            <button onClick={(e) => setFilter({
                                ...filter,
                                page: filter.page + 1
                            })}
                            className="py-2 px-3 rounded-lg bg-blue-400"
                            > 
                                Load More 
                            </button>
                            
                        ) : 
                        ('')
                }
            </div>
        </div>
    )
}

Index.getInitialProps = (context) => {
    const {query} = context;
    return {
        query,
    }
}


export default Index;