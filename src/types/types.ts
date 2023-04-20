export interface Character {
    name: string;
    homeworld: string;
    population: string;
    films: string[];
}

export interface Film {
    title: string;
    releaseDate: string;
    openingCrawl: string;
}

export interface SearchResult {
    character: Character;
    films: Film[];
}