import { useState, useEffect, useMemo } from "react";

export const usePlanetData = () => {
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

    const memoizedPlanets = useMemo(() => planets, [planets]);

    return { planets: memoizedPlanets };
};