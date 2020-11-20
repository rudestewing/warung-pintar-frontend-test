import pokeapiHttp from '../../lib/http/pokeapiHttp';

async function fetchByType(page, filter) {
    console.log('filter by ', filter);
    if(!filter.name) {
        return {
            results: [],
            count: 0,
        }
    };

    try {
        const response = await pokeapiHttp.get(`/type/${filter.valueName}`);

        const {data} = response;
        console.log(data);

        return {
            results: data.pokemon.length 
                ? data.pokemon.map((item) => {
                    return {
                        name: item.pokemon.name,
                    }
                }) 
                : [],
            count: data.pokemon.length
        }
        
    } catch (error) {
        console.log(error);
        return {};
    }
}

async function fetchGlobal(page) {
    try {
        let offset;
        let limit = 20;

        offset = (limit * page) - limit;

        const response = await pokeapiHttp.get('pokemon', {
            params: {
                offset,
                limit
            }
        });

        return response.data;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetch(page, filter) {
    switch (filter.name) {
        case 'type':
            console.log(filter);
            return fetchByType(page, filter);

        default:
            return fetchGlobal(page);
    }
}

export async function getByName(name) {
    try {
        const response = await pokeapiHttp.get(`/pokemon/${name}`);
        return response.data;
    } catch (error) {
        return null;
    }
}