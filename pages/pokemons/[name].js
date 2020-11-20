import {useRouter, withRouter} from 'next/router';
import { useEffect } from 'react';

function PokemonDetail(props) {
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div>
            <div>
                Pokemon Detail !!!!
            </div>
        </div>
    )
}

export default PokemonDetail;