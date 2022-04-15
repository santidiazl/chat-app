import { Router } from 'express';
import chatRouter from './chats';
// import session from 'express-session';

const apiRouter = Router();

// apiRouter.use(
//   session({ secret: process.env.SESSION_SECRET || '', resave: false }),
// );

apiRouter.use('/chats', chatRouter);

apiRouter.use((req, res, next) => {
  const error = new Error('Not Found');
  // error.status = 404;
  next(error);
});

export default apiRouter;
