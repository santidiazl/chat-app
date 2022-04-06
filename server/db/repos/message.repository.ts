import db from '../db';
import { Message } from '../entities';

const MessageRepo = db.getRepository(Message).extend({});

export default MessageRepo;
