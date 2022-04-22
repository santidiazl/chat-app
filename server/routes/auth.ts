import { Router } from 'express';

const authRouter = Router();

authRouter.get('/user', (req, res, next) => {
  console.log('/user endpoint');
  return res.json(req.user || {});
});

export default authRouter;
