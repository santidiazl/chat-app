import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

import Participant from '../db/entities/Participant';
import ParticipantRepo from '../db/repos/participant.repository';

const signin = Router();
const sessSecret = process.env.SESSION_SECRET || '';

signin.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Enter a username and password',
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
        error: "Couldn't find your username.",
      });
    }

    if (!user.correctPassword(password)) {
      console.log({ error: 'Incorrect password.' });
      return res.status(401).json({
        error:
          'Wrong password. Try again or click Forgot password to reset it.',
      });
    }

    const { correctPassword, ...data } = user;

    const token = jwt.sign(
      {
        id: user.id,
      },
      sessSecret,
      { expiresIn: 86400 },
    );

    res.json({ ...data, token });
  } catch (err) {
    next(err);
  }
});

export default signin;
