import {Episode} from "./Episode";

export interface Character {
    id: number;
    name: string;
    species: string;
    image: string;
    episode: Episode[];
    created: string;
}