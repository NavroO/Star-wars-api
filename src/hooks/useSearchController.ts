import { useState } from "react";
import { Character, Film } from "../types/types";
import { MAX_LENGTH, SUBSTR_START } from "../const";
import { fetchFilmDetails } from "../helpers/fetchFilmDetails";

export const useSearchController = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<any>(null);

    const handleSearch = async (searchType: string, minValue?: number, maxValue?: number) => {
        setLoading(true);
        setSearchResult(null);

        try {
            if (searchType == "population") {
                const response = await fetch(`https://swapi.dev/api/planets/`);
                const data = await response.json();

                const filteredPlanets = data.results.filter((planet: any) => {
                    const planetPopulation = parseInt(planet.population);

                    return planetPopulation >= (minValue ?? 0) && (!maxValue || planetPopulation <= maxValue);
                });

                const planetsData = await Promise.all(
                    filteredPlanets.map(async (planet: any) => {
                        const response = await fetch(planet.url);

                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }

                        const planetData = await response.json();

                        const residentsData = await Promise.all(
                            planetData.residents.map(async (url: string) => {
                                const response = await fetch(url);

                                if (!response.ok) {
                                    throw new Error("Network response was not ok");
                                }

                                const resident = await response.json();
                                const films = await fetchFilmDetails(resident.films);

                                return {
                                    name: resident.name,
                                    films: films,
                                }
                            })
                        );

                        const residents: string[] = residentsData.map((residentData) => residentData.name);

                        const planetResult = {
                            name: planetData.name,
                            population: planetData.population,
                            climate: planetData.climate,
                            residents: residents,
                        };

                        return { planet: planetResult, residents: residentsData };
                    })
                );
                setSearchResult(planetsData);
            }

            let url = "";
            if (searchType === "characters") {
                url = `https://swapi.dev/api/people/?search=${searchTerm}`;
            } else if (searchType === "planets") {
                url = `https://swapi.dev/api/planets/?search=${searchTerm}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const [result] = data.results;


            if (result) {
                if (searchType === "characters") {
                    const homeworldResponse = await fetch(result.homeworld);

                    if (!homeworldResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const { name, population } = await homeworldResponse.json();

                    const characterData: Character = {
                        name: result.name,
                        homeworld: name,
                        population: population,
                        films: result.films,
                    };

                    const filmDetails: Film[] = await fetchFilmDetails(characterData.films);

                    setSearchResult({ character: characterData, films: filmDetails });
                } else if (searchType === "planets") {
                    const residentsData = await Promise.all(
                        result.residents.map(async (url: string) => {
                            const response = await fetch(url);

                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }

                            const resident = await response.json();

                            const filmsData = await fetchFilmDetails(resident.films)

                            const films: Film[] = filmsData.map((film) => ({
                                title: film.title,
                                releaseDate: film.releaseDate,
                                openingCrawl: film.openingCrawl.substring(SUBSTR_START, MAX_LENGTH),
                            }));

                            return {
                                name: resident.name,
                                films: films,
                            };
                        })
                    );

                    const residents: string[] = residentsData.map((residentData) => residentData.name);

                    const planetData = {
                        name: result.name,
                        population: result.population,
                        climate: result.climate,
                        residents: residents,
                    };

                    setSearchResult({ planet: planetData, residents: residentsData });
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        loading,
        searchResult,
        handleSearch,
    };
};