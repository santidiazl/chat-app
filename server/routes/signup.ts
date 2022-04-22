import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Router } from 'express';
import * as jose from 'jose';

import { setSaltAndPassword } from '../prisma/middleware/user';

const prisma = new PrismaClient();
const signupRouter = Router();
const sessSecret = process.env.SESSION_SECRET || '';

prisma.$use(setSaltAndPassword);

signupRouter.post('/', async (req, res, next) => {
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

    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    const token = await new jose.SignJWT({ id: user.id })
      .setExpirationTime(86400)
      .sign(Buffer.from(sessSecret));

    res.json({
      ...user,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }
});

export default signupRouter;
