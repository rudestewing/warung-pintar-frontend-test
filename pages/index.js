import { useEffect, useState } from "react"
import {useRouter} from 'next/router';
import pokemonApi from '../services/api/pokemonApi';
import typeApi from '../services/api/typeApi';
import PokemonList from "../components/PokemonList";

export default function Index(props) {
    const [pokemons, setPokemons] = useState([]);
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [availableTypes, setAvailableTypes] = useState([]);
    const [filter, setFilter] = useState({
        page: router.query.page || 1,
        type: null,
    });
    
    useEffect(() => {
        fetchAllTypes();
        initLoad();
    }, []);

    useEffect(() => {
        
    }, [filter.page, filter.type]);

    // useEffect(async () => {
    //     initLoad();
    // }, [filter.type]);

    // useEffect(() => {
        
    // }, [filter]);

    function handleSelectType(e) {
        setFilter({
            ...filter,
            type: e.target.value
        });
        if(filter.page > 1) {
            setFilter({
                page: 1,
            })
        }
    }

    async function fetchAllTypes() {
        const types = await typeApi.fetchAll();
        setAvailableTypes([...types]);
    }

    async function fetchPokemons() {
        const pokemonData = await pokemonApi.fetch(filter);
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

    async function initLoad() {
        setIsFetching(true);
        setPokemons([]);
        const activePokemons = await fetchPokemons();
        setPokemons([...activePokemons]);
        setIsFetching(false);
    }

    async function loadMore() {
        setIsFetching(true);
        const activePokemons = await fetchPokemons();
        setPokemons([...pokemons, ...activePokemons]);
        setIsFetching(false);
    }

    return (
        <div>
            <div>
                Page : {filter.page}    
            </div>
            {
                isFetching ? 
                    (
                        <div>
                            Fetching
                        </div>
                    ) : 
                    ('')
            }
            <div>
                <select name="" id="" onChange={handleSelectType}>
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
                    pokemons.length ?
                        <PokemonList pokemons={pokemons} /> :
                        ('')
                }
            </div>
            <div className="my-5">
                <button onClick={(e) => setFilter({
                    ...filter,
                    page: filter.page + 1
                })}> Load More </button>
            </div>
        </div>
    )
}