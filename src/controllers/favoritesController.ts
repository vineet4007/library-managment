// src/controllers/albumController.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { albums, artists, tracks, favorites } from '../data';
import { Album } from '../interfaces';

const router = express.Router();

// GET all albums
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(albums);
});

// GET single album by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const album = albums.find(album => album.id === id);
  if (!album) {
    res.status(404).json({ message: 'Album not found' });
  } else {
    res.status(200).json(album);
  }
});

// POST create new album
router.post('/', (req: Request, res: Response) => {
  const { name, year, artistId } = req.body;
  if (!name || !year || !artistId) {
    res.status(400).json({ message: 'Name, year, and artistId are required' });
    return;
  }
  const artistExists = artists.some(artist => artist.id === artistId);
  if (!artistExists) {
    res.status(404).json({ message: 'Artist not found' });
    return;
  }
  const newAlbum: Album = {
    id: uuidv4(),
    name,
    year,
    artistId
  };
  albums.push(newAlbum);
  res.status(201).json(newAlbum);
});

// PUT update album info
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, year, artistId } = req.body;
  const index = albums.findIndex(album => album.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Album not found' });
  } else {
    if (artistId && !artists.some(artist => artist.id === artistId)) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    albums[index] = {
      ...albums[index],
      name: name || albums[index].name,
      year: year || albums[index].year,
      artistId: artistId || albums[index].artistId
    };
    // Update tracks associated with this album
    tracks.forEach(track => {
      if (track.albumId === id) {
        track.artistId = artistId || null;
      }
    });
    res.status(200).json(albums[index]);
  }
});

// DELETE album by id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = albums.findIndex(album => album.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Album not found' });
  } else {
    // Remove from favorites
    favorites.albums = favorites.albums.filter(favId => favId !== id);
    albums.splice(index, 1);
    // Update tracks associated with this album
    tracks.forEach(track => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    res.status(204).send();
  }
});

export default router;
