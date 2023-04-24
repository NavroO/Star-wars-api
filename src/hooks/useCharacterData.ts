import { useEffect, useMemo, useState } from "react";
import { Character } from "../types/types";

export const useCharacterData = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/`);
                const data = await response.json();
                setCharacters(data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCharacters();
    }, []);

    const memoizedCharacters = useMemo(() => characters, [characters]);

    return { characters: memoizedCharacters };
};