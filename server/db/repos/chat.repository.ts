import db from '../db';
import { Chat } from '../entities/';

const ChatRepo = db.getRepository(Chat).extend({
  async getUserChats(id: number) {
    return (
      this.createQueryBuilder('chat')
        // .leftJoinAndSelect('chat.messages', 'message')
        .leftJoin('chat.participants', 'participants')
        .where('participants.id = :id', { id })
        .select('participants')
        .getMany()
    );
  },
});

export default ChatRepo;

const conversations = [
  {
    id: 1,
    messages: [[Object], [Object], [Object]],
    user1: null,
    otherUser: {
      id: 2,
      username: 'luis',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/luis.jpg',
      online: false,
    },
    latestMessageText: 'Share photo of your city, please',
    latestMessageTime: 1649620683647,
    lastReadSentId: '',
    unreadReceivedMessages: 2,
  },
  {
    id: 2,
    messages: [[Object]],
    user2: null,
    otherUser: {
      id: 3,
      username: 'ayo',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/ayo.jpg',
      online: false,
    },
    latestMessageText: 'Sure! What time?',
    latestMessageTime: 1649620683660,
    lastReadSentId: '',
    unreadReceivedMessages: 1,
  },
  {
    id: 3,
    messages: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
    ],
    user1: null,
    otherUser: {
      id: 4,
      username: 'melissa',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/melissa.jpg',
      online: false,
    },
    latestMessageText: '😂 😂 😂',
    latestMessageTime: 1649620683716,
    lastReadSentId: '',
    unreadReceivedMessages: 12,
  },
];
