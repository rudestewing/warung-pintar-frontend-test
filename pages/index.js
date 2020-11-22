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
    const [totalPokemons, setTotalPokemons] = useState(0);

    const [filter, setFilter] = useState({
        page: props.query.page ? parseInt(props.query.page) : 1,
        type: props.query.type ? String(props.query.type) : '',
    });

    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

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

    async function fetchPokemons(activeFilter) {
        const pokemonData = await pokemonApi.fetch(activeFilter);
        setHasNext(pokemonData.next ? true : false);
        setTotalPokemons(pokemonData.count);

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
        setHasPrevious(false);

        if(!filter.type) {
            let mustCountPerPage = (filter.page * 20);
            if((pokemons.length < mustCountPerPage) && pokemons.length < totalPokemons) {
                setHasPrevious(true);
            }
        }
    }, [pokemons]);

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
        if(filter.page > 1 && !isFetching) {
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
        if(!isFetching) {
            setIsFetching(true);
            setPokemons([]);
            const activePokemons = await fetchPokemons(filter);
            setPokemons([...activePokemons]);
            setIsFetching(false);
        }
    }

    async function loadMore() {
        if(hasNext && !isFetching) {
            setIsFetching(true);
            const activePokemons = await fetchPokemons(filter);
            setPokemons([...pokemons, ...activePokemons]);
            setIsFetching(false);
        }
    }

    async function loadPrevious() {
        let limit = 20;
        if(hasPrevious) {
            setIsFetching(true);

            let mustCountPerPage = (filter.page * limit);
            let countRestOfPokemons = mustCountPerPage - pokemons.length;
            let previousPage = countRestOfPokemons / limit;

            const activePokemons = await fetchPokemons({
                ...filter,
                page: previousPage,
            });

            setPokemons([...activePokemons, ...pokemons]);
            setIsFetching(false);
        }
    }

    function handleResetFilter() {
        setFilter({
            page: 1,
            type: '',
        });

        router.push({
            pathname: '/',
            query: {
                page: 1,
                type: ''
            }
        })
    }

    return (
        <div className="px-5 relative">
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
                <div>
                    {
                        filter.type || filter.page > 1 ? 
                            <button onClick={handleResetFilter} className="bg-yellow-500 py-2 px-4 block w-full">Reset Filter</button>
                            : ('')
                    }
                </div>
            </div>

            {
                hasPrevious > 0 ?
                    (
                        <div className="my-5 text-center">
                            <button onClick={loadPrevious}
                            className="py-2 px-3 rounded-lg bg-blue-400"
                            > 
                                Load Previous
                            </button>
                        </div>
                    )
                    : ('')
            }
            
            {
                !pokemons.length ||
                    <PokemonList pokemons={pokemons} />
            }

            {
                !isFetching || 
                    (
                        <div>
                            Fetching Pokemons ...
                        </div>
                    )

            }
            {
                !isFetching && hasNext ? 
                    (
                        <div className="my-5 text-center">
                            <button onClick={(e) => setFilter({
                                ...filter,
                                page: filter.page + 1
                            })}
                            className="py-2 px-3 rounded-lg bg-blue-400"
                            > 
                                Load More 
                            </button>
                        </div>
                    ) : 
                    ('')
            }
            <button onClick={() => window.scrollTo(0, 0)} className="bg-blue-800 text-white px-2 py-2 fixed z-10 block w-auto h-auto rounded-lg opacity-75 hover:opacity-100" style={{bottom: 0, right: 0, margin: '0 15px 15px 0'}}>
                ^ back to top
            </button>
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