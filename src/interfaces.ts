// src/interfaces.ts
export interface User {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }
  
  export interface Artist {
    id: string;
    name: string;
    grammy: boolean;
  }
  
  export interface Album {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
  }
  
  export interface Track {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }
  
  export interface Favorites {
    artists: string[];
    albums: string[];
    tracks: string[];
  }
  
  export interface FavoritesResponse {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }
  
  export interface CreateUserDto {
    login: string;
    password: string;
  }
  
  export interface UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
  }
  