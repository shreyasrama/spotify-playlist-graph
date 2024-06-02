import { writable } from 'svelte/store';

export type ArtistToGenres = {
    Artist: string;
    SpotifyId: string;
    Genres: string[];
};

export type Node = {
    id: string | undefined;
    group: number;
    weight: number;
    [key: string]: any;
};

export type Link = {
    source: string;
    target: string;
    value: number;
};

const artistToGenreInit: ArtistToGenres[] = [];
export const artistToGenresStore = writable(artistToGenreInit);

const dataInit: { nodes: Node[]; links: Link[] } = { nodes: [], links: [] };
export const dataStore = writable(dataInit);

export const tokenStore = writable<string | undefined>('');
export const userStore = writable<string>('');
