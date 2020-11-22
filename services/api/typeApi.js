import pokeApiHttp from '../../lib/http/pokeApiHttp';

async function fetchAll() {
    let data = [];

    try {
        const response = await pokeApiHttp.get('type');
        data = [...response.data.results];
    } catch (error) {
        console.log(error);
    } finally {
        return data;
    }
}

export default {
    fetchAll
}