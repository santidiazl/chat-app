import { Router } from 'express';

import { ChatRepo } from '../../db/repos';

const chatRouter = Router();

chatRouter.get('/', async (req, res, next) => {
  // const userId = req.body.id;
  const results = await ChatRepo.findAllUserChats(1);
  res.json({ results });
});

export default chatRouter;
