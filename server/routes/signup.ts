import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

import Participant from '../db/entities/Participant';
import ParticipantRepo from '../db/repos/participant.repository';

const signup = Router();
const sessSecret = process.env.SESSION_SECRET || '';

signup.post('/', async (req, res, next) => {
  console.log('create account endpoint');
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

    const user = await ParticipantRepo.save(
      new Participant({ username, password, email }),
    );
    // const token = jwt.sign({ id: user.id }, sessSecret, {
    //   expiresIn: 86400,
    // });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      // token,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }
});

export default signup;
