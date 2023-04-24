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

export interface Planet {
    name: string;
    population: string;
    climate: string;
    residents: string[];
}

export interface Resident {
    name: string;
    films: Film[];
}

export interface SearchResult {
    character?: { character: Character; films: Film[] };
    planet?: { planet: Planet; residents: Resident[] };
    planetsData?: { planet: Planet; residents: Resident[] }[];
}
