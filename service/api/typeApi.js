import pokeapiHttp from '../../lib/http/pokeapiHttp';

export async function fetchAll() {
    try {
        const response = await pokeapiHttp.get('type');
        return response.data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}