// src/controllers/userController.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data';
import { User, CreateUserDto, UpdatePasswordDto } from '../interfaces';

const router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  res.status(200).json(usersWithoutPasswords);
});

// GET single user by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  }
});

// POST create user
router.post('/', (req: Request, res: Response) => {
  const { login, password } = req.body as CreateUserDto;
  if (!login || !password) {
    res.status(400).json({ message: 'Login and password are required' });
    return;
  }
  const newUser: User = {
    id: uuidv4(),
    login,
    password,
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// PUT update user's password
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body as UpdatePasswordDto;
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const user = users[index];
  if (user.password !== oldPassword) {
    res.status(403).json({ message: 'Old password is incorrect' });
    return;
  }
  user.password = newPassword;
  user.version++;
  user.updatedAt = Date.now();
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
});

// DELETE user by id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'User not found' });
  } else {
    users.splice(index, 1);
    res.status(204).send();
  }
});

export default router;
