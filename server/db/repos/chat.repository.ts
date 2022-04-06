import db from '../db';
import { Chat } from '../entities/';

const ChatRepo = db.getRepository(Chat).extend({
  async findAllUserChats(userId: number) {
    return this.find({
      relations: {
        participants: true,
      },
      // where: {
      //   participants: {
      //     id: userId,
      //   },
      // },
      // select: {
      //   id: true,
      // },
      // relations: {
      //   messages: true,
      // },
      // order: {
      //   messages: {
      //     createdAt: 'ASC',
      //   },
      // },
    });
  },
});

export default ChatRepo;
