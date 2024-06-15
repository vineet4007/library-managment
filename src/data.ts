// src/data.ts
import { User, Artist, Album, Track, Favorites } from './interfaces';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: []
};
