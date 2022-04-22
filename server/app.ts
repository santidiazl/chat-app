import 'dotenv/config';
import express, { ErrorRequestHandler, json, urlencoded } from 'express';
import { join } from 'path';
import logger from 'morgan';
import session from 'express-session';
import createError from 'http-errors';
import * as jose from 'jose';

import apiRouter from './routes/api';
import signinRouter from './routes/signin';
import signupRouter from './routes/signup';
import authRouter from './routes/auth';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
const sessSecret = process.env.SESSION_SECRET || '';
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

// Custom user property on Express request
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// CHECK FOR AUTH TOKEN
app.use(async (req, res, next) => {
  const token = req.headers?.authorization;
  console.log('Checking auth token: ', token);
  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token, Buffer.from(sessSecret));
      console.log('Payload: ', payload);
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id as number,
        },
      });
      console.log('User found:', user);
      if (user) {
        req.user = user;
      }
    } catch (err: any) {
      if (err?.code && err.code === 'ERR_JWT_EXPIRED') {
        return next();
      }
      return next(err);
    }
  }

  return next();
});

app.use('/api', apiRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/auth', authRouter);

// app.use((req, res, next) => {
//   //  next(createError(404));
// });

app.use(((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  return res.json({ error: err });
}) as ErrorRequestHandler);

export default app;
