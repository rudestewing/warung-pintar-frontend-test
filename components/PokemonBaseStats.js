import { useEffect, useState } from "react";

export default function PokemonBaseStats(props) {
    const {baseStats} = props;

    const [total, setTotal] = useState(
        Array.from(baseStats).reduce((a, b) => {
            return a + (b['base_stat'] || 0);
        }, 0)
    );

    return (
        <div>
            {
                baseStats.map((baseStat, index) => {
                    return (
                        <div key={index} className="mb-2">
                            <div className="mb-1">
                                {baseStat.stat.name} ({baseStat.base_stat})
                            </div>
                            <div className="bg-gray-200 rounded-full w-full block h-3 overflow-hidden">
                                <div className="bg-green-500 rounded-full block h-full" style={{width: `${(baseStat.base_stat / total * 100)}%`}}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}