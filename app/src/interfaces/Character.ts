import {Episode} from "./Episode";
import {Location} from "./Location";

export interface Character {
    id: number;
    name: string;
    species: string;
    image: string;
    episode: Episode[];
    created: string;
    status: string;
    origin: Location;
    location: Location;
}