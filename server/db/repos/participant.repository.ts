import db from '../db';
import Participant from '../entities/Participant';

const ParticipantRepo = db.getRepository(Participant).extend({
  async getUserChats(id: number) {
    return this.createQueryBuilder('participant')
      .where('participant.id = :id', { id })
      .leftJoinAndSelect('participant.chats', 'chat')
      .leftJoinAndSelect('chat.messages', 'message')
      .getMany();
  },
});

export default ParticipantRepo;
