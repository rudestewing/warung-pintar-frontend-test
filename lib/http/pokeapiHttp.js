import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_POKEAPI_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;