import { data } from 'autoprefixer';
import pokeapiHttp from '../../lib/http/pokeApiHttp';

async function fetchAll() {
    let data = [];

    try {
        const response = await pokeapiHttp.get('type');
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