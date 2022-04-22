import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import * as jose from 'jose';

import { encryptPassword } from '../prisma/middleware/user';

const signinRouter = Router();
const sessSecret = process.env.SESSION_SECRET || '';

const prisma = new PrismaClient();

signinRouter.post('/', async (req, res, next) => {
  console.log('Sign in endpoint');
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Enter a username and password',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      console.log({ error: 'Username not found.' });
      return res.status(401).json({
        error: "Couldn't find your username",
        username: true,
      });
    }

    const isCorrectPassword =
      encryptPassword(password, user.salt as string) === user.password;

    if (!isCorrectPassword) {
      console.log({ error: 'Incorrect password.' });
      return res.status(401).json({
        error: 'Wrong password. Try again.',
        password: true,
      });
    }

    const token = await new jose.SignJWT({ id: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(Buffer.from(sessSecret));
    console.log('SignIn endpoint, token: ', token);
    res.json({ ...user, token });
  } catch (err) {
    next(err);
  }
});

export default signinRouter;
