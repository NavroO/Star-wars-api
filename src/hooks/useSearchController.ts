import { useEffect, useState } from "react";
import { SearchResult, Character, Film } from "../types/types";

const MAX_LENGTH = 130;
const SUBSTR_START = 0;


export const useSearchController = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/people/");
                const data = await response.json();
                setCharacters(data.results.map((character: Character) => character.name));
            } catch (error) {
                console.error(error);
            }
        };
        fetchCharacters();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(false);
        setSearchResult(null);

        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const [character] = data.results;

            if (character) {
                const homeworldResponse = await fetch(character.homeworld);

                if (!homeworldResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const { name, population } = await homeworldResponse.json();

                const characterData: Character = {
                    name: character.name,
                    homeworld: name,
                    population: population,
                    films: character.films,
                };

                const filmData = await Promise.all(characterData.films.map(async (url: string) => {
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    return response.json();
                }));

                const filmDetails: Film[] = filmData.map((film) => ({
                    title: film.title,
                    releaseDate: film.release_date,
                    openingCrawl: film.opening_crawl.substring(SUBSTR_START, MAX_LENGTH),
                }));

                setSearchResult({ character: characterData, films: filmDetails });
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return {
        setSearchTerm,
        loading,
        error,
        searchResult,
        handleSearch,
        characters,
    };
};