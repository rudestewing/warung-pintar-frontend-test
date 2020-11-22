import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import pokemonApi from '../service/api/pokemonApi';
import typeApi from '../service/api/typeApi';
import PokemonList from '../components/PokemonList';
import usePageBottom from '../lib/hooks/usePageBottom';
import { func } from 'prop-types';

function PokemonsIndex(props) {
    const router = useRouter();
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(router.query.page || 1);
    const [filter, setFilter] = useState({
        name: null,
        value: '',
    });
    const [availableTypes, setAvailableTypes] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false); 
    
    const isPageBottom = usePageBottom();

    async function fetchData() {
        const pokemon = await pokemonApi.fetch(page, filter);
        
        return await Promise.all(
            pokemon.results.map(async (item) => {
                const pokemon = await pokemonApi.getByName(item.name);
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
                        sprites
                    };
                }
                return item;
            })
        );
    }

    useEffect(async () => {
        const types = await typeApi.fetchAll();
        setAvailableTypes([...types]);
        setPokemons([]);
        setInitialized(false);

        const activePokemons = await fetchData();

        setPokemons([...activePokemons]);
        setInitialized(true);
    }, [])

    useEffect(async () => {
        if(initialized) {
            setPage(1);
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

    useEffect(() => {
        if(initialized) {
            setPage(page + 1);
        }
    }, [isPageBottom]);
    
    return (
        <div>
            <div className="mb-3">
                <select onChange={(e) => {
                    if(e.target.value == '') {
                        return setFilter({
                            name: null,
                            value: null,
                        });
                    }
                    return setFilter({
                        name: 'type',
                        value: e.target.value,
                    });
                }} value={filter.value || ''}>
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
            {
                pokemons.length
                    ? <PokemonList pokemons={pokemons} />
                    : ('')
            }
            <div className="mb-3">
                <button onClick={() => setPage(page + 1)} disabled={loading ? true : false}>
                    {loading ? 'loading ...' : 'load more'}
                </button>
            </div>
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