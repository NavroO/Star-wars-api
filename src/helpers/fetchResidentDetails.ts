import { MAX_LENGTH, SUBSTR_START } from "../const";
import { Film } from "../types/types";
import { fetchFilmDetails } from "./fetchFilmDetails";

export const fetchResidentDetails = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const resident = await response.json();

    const filmsData = await fetchFilmDetails(resident.films);

    const films: Film[] = filmsData.map((film) => ({
        title: film.title,
        releaseDate: film.releaseDate,
        openingCrawl: film.openingCrawl.substring(SUBSTR_START, MAX_LENGTH),
    }));

    return {
        name: resident.name,
        films: films,
    };
};