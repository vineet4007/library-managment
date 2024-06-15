// src/controllers/trackController.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { tracks, artists, albums, favorites } from '../data';
import { Track } from '../interfaces';

const router = express.Router();

// GET all tracks
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(tracks);
});

// GET single track by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const track = tracks.find(track => track.id === id);
  if (!track) {
    res.status(404).json({ message: 'Track not found' });
  } else {
    res.status(200).json(track);
  }
});

// POST create new track
router.post('/', (req: Request, res: Response) => {
  const { name, artistId, albumId, duration } = req.body;
  if (!name || !duration) {
    res.status(400).json({ message: 'Name and duration are required' });
    return;
  }
  if (artistId && !artists.some(artist => artist.id === artistId)) {
    res.status(404).json({ message: 'Artist not found' });
    return;
  }
  if (albumId && !albums.some(album => album.id === albumId)) {
    res.status(404).json({ message: 'Album not found' });
    return;
  }
  const newTrack: Track = {
    id: uuidv4(),
    name,
    artistId: artistId || null,
    albumId: albumId || null,
    duration
  };
  tracks.push(newTrack);
  res.status(201).json(newTrack);
});

// PUT update track info
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, artistId, albumId, duration } = req.body;
  const index = tracks.findIndex(track => track.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Track not found' });
    return;
  }
  if (artistId && !artists.some(artist => artist.id === artistId)) {
    res.status(404).json({ message: 'Artist not found' });
    return;
  }
  if (albumId && !albums.some(album => album.id === albumId)) {
    res.status(404).json({ message: 'Album not found' });
    return;
  }
  tracks[index] = {
    ...tracks[index],
    name: name || tracks[index].name,
    artistId: artistId || null,
    albumId: albumId || null,
    duration: duration || tracks[index].duration
  };
  res.status(200).json(tracks[index]);
});

// DELETE track by id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tracks.findIndex(track => track.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Track not found' });
  } else {
    // Remove from favorites
    favorites.tracks = favorites.tracks.filter(favId => favId !== id);
    tracks.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
