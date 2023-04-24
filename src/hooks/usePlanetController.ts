import { useEffect, useState } from "react";

export const usePlanetController = () => {
    const [planets, setPlanets] = useState<any[]>([]);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/planets/`);
                const data = await response.json();
                setPlanets(data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPlanets();
    }, []);

    return { planets };
};