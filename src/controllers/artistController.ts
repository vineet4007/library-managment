// src/controllers/artistController.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { artists, albums, tracks, favorites } from '../data';
import { Artist, Album, Track, Favorites } from '../interfaces';

const router = express.Router();

// GET all artists
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(artists);
});

// GET single artist by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const artist = artists.find(artist => artist.id === id);
  if (!artist) {
    res.status(404).json({ message: 'Artist not found' });
  } else {
    res.status(200).json(artist);
  }
});

// POST create new artist
router.post('/', (req: Request, res: Response) => {
  const { name, grammy } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Name is required' });
    return;
  }
  const newArtist: Artist = {
    id: uuidv4(),
    name,
    grammy
  };
  artists.push(newArtist);
  res.status(201).json(newArtist);
});

// PUT update artist info
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, grammy } = req.body;
  const index = artists.findIndex(artist => artist.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Artist not found' });
  } else {
    artists[index] = {
      ...artists[index],
      name: name || artists[index].name,
      grammy: grammy !== undefined ? grammy : artists[index].grammy
    };
    res.status(200).json(artists[index]);
  }
});

// DELETE artist by id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = artists.findIndex(artist => artist.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Artist not found' });
  } else {
    // Remove from albums and tracks
    albums.forEach(album => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    tracks.forEach(track => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    // Remove from favorites
    favorites.artists = favorites.artists.filter(favId => favId !== id);
    artists.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
