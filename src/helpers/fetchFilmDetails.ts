import { SUBSTR_START, MAX_LENGTH } from "../const";

export const fetchFilmDetails = async (films: string[]) => {
    const filmData = await Promise.all(films.map(async (url: string) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }));

    return filmData.map((film) => ({
        title: film.title,
        releaseDate: film.release_date,
        openingCrawl: film.opening_crawl.substring(SUBSTR_START, MAX_LENGTH),
    }));
};