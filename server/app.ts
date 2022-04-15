import 'reflect-metadata';
import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import { join } from 'path';
import logger from 'morgan';
import jsw from 'jsonwebtoken';
import session from 'express-session';
import createError from 'http-errors';

import db from './db/db';
import ParticipantRepo from './db/repos/participant.repository';
import apiRouter from './routes/api';
import signin from './routes/signin';
import signup from './routes/signup';
const { json, urlencoded } = express;

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, 'public')));

// TOKEN VERIFICATION
// app.use((req, res, next) => {
//   const token = req.headers['x-access-token'] as string;
//   console.log('Token: ', token);
//   if (token) {
//     jsw.verify(
//       token,
//       process.env.SESSION_SECRET || '',
//       async (err, decoded) => {
//         if (err) {
//           return next();
//         }
//         console.log('Decoded: ', decoded as jsw.JwtPayload);
//         const user = await ParticipantRepo.findOne({
//           where: {
//             id:
//           },
//         });
//       },
//     );
//   }

//   return next();
// });

app.use('/api', apiRouter);
app.use('/signin', signin);
app.use('/signup', signup);

app.use((req, res, next) => {
  //  next(createError(404));
});

app.use(((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  return res.json({ error: err });
}) as ErrorRequestHandler);

export default app;
