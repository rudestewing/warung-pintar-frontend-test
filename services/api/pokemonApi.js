import pokeApiHttp from '../../lib/http/pokeApiHttp';

async function fetchByType(page = 1, filterValue = null) {
    console.log('fetch by type ', page, filterValue);
    const data = {
        results: [],
        count: 0,
        next: null
    }

    try {
        if(filterValue) {
            const response = await pokeApiHttp.get(`/type/${filterValue}`);
            data.count = response.data.pokemon.length;
            data.results = response.data.pokemon.length 
                ? response.data.pokemon.map((item) => {
                    return {
                        name: item.pokemon.name,
                    }
                }) 
                : [];
        }
    } catch (error) {
        console.log(error);
    } finally {
        return data;
    }
}

async function fetchGlobal(page) {
    const data = {
        results: [],
        count: 0,
        next: null
    }
    
    let offset;
    let limit = 20;
    
    offset = (limit * page) - limit;

    try {
        const response = await pokeApiHttp.get('/pokemon', {
            params: {
                offset,
                limit
            }
        });

        data.count = response.data.count;
        data.results = response.data.results;
        data.next = response.data.next || null;
    } catch (error) {
        console.log(error);
    } finally {
        return data;
    }
}

async function fetch({page = 1, type = null}) {
    console.log(page, type);
    if(type) {
        return fetchByType(page, type);
    }

    return fetchGlobal(page);
}

async function getByName(value) {
    let data;

    try {
        const response = await pokeApiHttp.get(`/pokemon/${value}`);
        // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`);
        data = response.data;
    } catch (error) {
        console.log(error);
    } finally {
        return data;
    }
}

export default {
    fetch,
    getByName
}