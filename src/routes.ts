// src/routes.ts
import express from 'express';
import artistController from './controllers/artistController'
import  albumController  from './controllers/albumController';
import trackController from './controllers/trackController';
import userController from './controllers/userController';
import favoritesController from './controllers/favoritesController';

const router = express.Router();

router.use('/artists', artistController);
router.use('/albums', albumController);
router.use('/tracks', trackController);
router.use('/users', userController);
router.use('/favs', favoritesController);

export default router;
