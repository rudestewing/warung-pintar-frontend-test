import { useEffect, useState } from "react";

export default function PokemonCard(props) {
    const {pokemon} = props;
    const [bgClass, setBgClass] = useState('bg-white');
    const [textClass, setTextClass] = useState('text-gray-800');

    useEffect(() => {
        decideCardStyle();
    }, []);

    const availableTypes = [
        {
            name: "normal",
            bgClass: 'bg-white',
            textClass: '',
        },
        {
            name: "fighting",
            bgClass: 'bg-gray-300',
            textClass: '',
        },
        {
            name: "flying",
            bgClass: 'bg-blue-300',
            textClass: '',
        },
        {
            name: "poison",
            bgClass: 'bg-indigo-700',
            textClass: 'text-white',
        },
        {
            name: "ground",
            bgClass: 'bg-gray-400',
            textClass: '',
        },
        {
            name: "rock",
            bgClass: 'bg-orange-500',
            textClass: '',
        },
        {
            name: "bug",
            bgClass: 'bg-green-200',
            textClass: '',
        },
        {
            name: "ghost",
            bgClass: 'bg-gray-700 ',
            textClass: 'text-white',
        },
        {
            name: "steel",
            bgClass: 'bg-gray-400',
            textClass: '',
        },
        {
            name: "fire",
            bgClass: 'bg-red-600 ',
            textClass: 'text-white',
        },
        {
            name: "water",
            bgClass: 'bg-blue-700 ',
            textClass: 'text-white',
        },
        {
            name: "grass",
            bgClass: 'bg-green-600 ',
            textClass: 'text-white',
        },
        {
            name: "electric",
            bgClass: 'bg-yellow-400',
            textClass: '',
        },
        {
            name: "psychic",
            bgClass: 'bg-purple-800 ',
            textClass: 'text-white',
        },
        {
            name: "ice",
            bgClass: 'bg-blue-200',
            textClass: '',
        },
        {
            name: "dragon",
            bgClass: 'bg-pink-700 ',
            textClass: 'text-white',
        },
        {
            name: "dark",
            bgClass: 'bg-gray-800 ',
            textClass: 'text-white',
        },
        {
            name: "fairy",
            bgClass: 'bg-yellow-200',
            textClass: '',
        },
        {
            name: "unknown",
            bgClass: 'bg-gray-900 ',
            textClass: 'text-white',
        },
        {
            name: "shadow",
            bgClass: 'bg-gray-400',
            textClass: '',
        }
    ];

    function decideCardStyle() {
        const filteredTypes = pokemon.types.filter((type) => {
            return String(type.type.name) !== 'normal';
        });
        
        const firstType = filteredTypes.length ? filteredTypes[0] : null;

        if(firstType) {
            const selectedType = availableTypes.find((availableType) => {
                console.log(firstType.type.name);
                return String(availableType.name) === String(firstType.type.name);
            });

            setBgClass(selectedType.bgClass);
            setTextClass(selectedType.textClass);
        } 
    }

    return (
        <div className={`rounded-lg shadow-lg cursor-pointer hover:cursor-pointer p-3 ${bgClass}`}>
            <div className={`font-bold tracking-wider ${textClass}`}>
                {String(pokemon.name).toUpperCase()}
            </div>
            <div className="flex">
                <div className="w-1/3 pr-2">
                    {
                        pokemon.types.map((type, index) => {
                            return (
                                <div key={index}>
                                    {type.type.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-2/3">
                    <div>
                        <img src={pokemon?.sprites?.front_default} alt="" className="w-full h-full object-center object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    )
}