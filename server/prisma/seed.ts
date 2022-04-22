import { PrismaClient } from '@prisma/client';
import { setSaltAndPassword } from './middleware/user';

// Test data seed script

const prisma = new PrismaClient();

prisma.$use(setSaltAndPassword);

async function main() {
  const joseph = await prisma.user.create({
    data: {
      username: 'Santi',
      email: 'santi@chatapp.com',
      password: '123456',
      photoUrl:
        'https://raw.githubusercontent.com/santidiazl/chat-app/main/profile-images/joseph.jpghttps://raw.githubusercontent.com/santidiazl/chat-app/main/profile-images/joseph.jpg',
    },
  });
  console.log('User created: ', joseph);
  const luis = await prisma.user.create({
    data: {
      username: 'luis',
      email: 'luis@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/luis.jpg',
    },
  });
  console.log('User created: ', luis);
  const ayo = await prisma.user.create({
    data: {
      username: 'ayo',
      email: 'ayo@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/ayo.jpg',
    },
  });
  console.log('User created: ', ayo);

  const melissa = await prisma.user.create({
    data: {
      username: 'melissa',
      email: 'melissa@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/melissa.jpg',
    },
  });
  console.log('User created: ', melissa);

  const zoe = await prisma.user.create({
    data: {
      username: 'zoe',
      email: 'zoe@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/zoe.jpg',
    },
  });
  console.log('User created: ', zoe);

  const aatik = await prisma.user.create({
    data: {
      username: 'aatik',
      email: 'aatik@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/aatik.jpg',
    },
  });
  console.log('User created: ', aatik);

  const charles = await prisma.user.create({
    data: {
      username: 'charles',
      email: 'charles@email.com',
      password: '123456',
      photoUrl:
        'https://github.com/santidiazl/chat-app/raw/main/profile-images/charles.jpg',
    },
  });

  console.log('User created: ', charles);

  const josephLuisChat = await prisma.chat.create({
    data: {
      initiatorId: joseph.id,
      recipientId: luis.id,
    },
  });

  console.log('Chat created: ', josephLuisChat);

  await prisma.message.create({
    data: {
      chatId: josephLuisChat.id,
      senderId: joseph.id,
      body: "My main man Luis, how's it going bro?",
    },
  });

  await prisma.message.create({
    data: {
      chatId: josephLuisChat.id,
      senderId: luis.id,
      body: 'Joseph! Long time no talk, doing well and you?',
    },
  });

  await prisma.message.create({
    data: {
      chatId: josephLuisChat.id,
      senderId: joseph.id,
      body: "Good! I heard you're in NY, send some pics!",
    },
  });

  const ayoChat = await prisma.chat.create({
    data: {
      initiatorId: ayo.id,
      recipientId: joseph.id,
    },
  });

  await prisma.message.create({
    data: {
      chatId: ayoChat.id,
      senderId: ayo.id,
      body: 'What time we meeting?',
    },
  });

  const melissaChat = await prisma.chat.create({
    data: {
      initiatorId: melissa.id,
      recipientId: joseph.id,
    },
  });

  [...Array(15)].forEach(async () => {
    await prisma.message.create({
      data: {
        chatId: melissaChat.id,
        senderId: melissa.id,
        body: 'Hello!',
      },
    });
  });

  await prisma.message.create({
    data: {
      chatId: melissaChat.id,
      senderId: joseph.id,
      body: "😂 😂 😂, you're wild!",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
