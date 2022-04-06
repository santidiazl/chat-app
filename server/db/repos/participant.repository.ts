import db from '../db';
import Participant from '../entities/Participant';

const ParticipantRepo = db.getRepository(Participant).extend({
  // findAllChats(id: number) {
  //   this.find({
  //     where: {
  //       id
  //     },
  //     relations: {
  //       chats:
  //     }
  //   })
  // },
});

export default ParticipantRepo;
