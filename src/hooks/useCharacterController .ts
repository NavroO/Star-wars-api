import { useEffect, useState } from "react";
import { Character } from "../types/types";

export const useCharacterController = () => {
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

    return { characters };
};