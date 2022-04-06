import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import Participant from '../../db/entities/Participant';
import ParticipantRepo from '../../db/repos/participant.repository';

const router = Router();
const sessSecret = process.env.SESSION_SECRET || '';

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        error: 'Please enter a username, email, and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters.',
      });
    }

    const user = await ParticipantRepo.save(new Participant(req.body));
    const token = jwt.sign({ id: user.id }, sessSecret, {
      expiresIn: 86400,
    });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      token,
    });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Please enter a username and password.',
      });
    }

    const user = await ParticipantRepo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      console.log({ error: 'Username not found.' });
      return res.status(401).json({
        error: 'Username not found.',
      });
    }

    if (password !== user.password) {
      console.log({ error: 'Incorrect password.' });
      return res.status(401).json({
        error: 'Incorrect password.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      sessSecret,
      { expiresIn: 86400 },
    );

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      token,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', (req, res, next) => {
  res.sendStatus(204);
});

router.get('/user', (req, res, next) => {
  if (req.body.user) return res.json(req.body.user);
  return res.json({});
});

export default router;
