import { DataSource } from 'typeorm';

import db from './db';
import { Chat, Participant, Message } from './entities';
import { ParticipantRepo, ChatRepo } from './repos/';

const seed = async () => {
  const joseph = new Participant({
    username: 'joseph_the_great',
    email: 'joseph@email.com',
    password: '123456',
    photoUrl:
      'https://raw.githubusercontent.com/santidiazl/chat-app/main/profile-images/joseph.jpghttps://raw.githubusercontent.com/santidiazl/chat-app/main/profile-images/joseph.jpg',
  });

  const luis = new Participant({
    username: 'luis',
    email: 'luis@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/luis.jpg',
  });

  const josephLuisChat = new Chat({
    participants: [joseph, luis],
    messages: [
      new Message({
        sender: joseph,
        message: "My main man Luis, how's it going bro?",
      }),
      new Message({
        sender: luis,
        message: 'Joseph! Long time no talk, doing well and you?',
      }),
      new Message({
        sender: joseph,
        message: "Good! I heard you're in NY, send some pics!",
      }),
    ],
  });

  const ayo = new Participant({
    username: 'ayo',
    email: 'ayo@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/ayo.jpg',
  });

  const ayoChat = new Chat({
    participants: [ayo, joseph],
    messages: [
      new Message({
        sender: ayo,
        message: 'What time are we meeting?',
      }),
    ],
  });

  const melissa = new Participant({
    username: 'melissa',
    email: 'melissa@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/melissa.jpg',
  });

  const melissaChat = new Chat({
    participants: [melissa, joseph],
    messages: [
      ...[...Array(15)].map(
        () =>
          new Message({
            sender: melissa,
            message: 'Hello!',
          }),
      ),
      new Message({
        sender: joseph,
        message: "😂 😂 😂, you're wild!",
      }),
    ],
  });

  const zoe = new Participant({
    username: 'zoe',
    email: 'zoe@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/zoe.jpg',
  });

  const aatik = new Participant({
    username: 'aatik',

    email: 'aatik@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/aatik.jpg',
  });

  const charles = new Participant({
    username: 'charles',
    email: 'charles@email.com',
    password: '123456',
    photoUrl:
      'https://github.com/santidiazl/chat-app/raw/main/profile-images/charles.jpg',
  });

  await ParticipantRepo.save([joseph, luis, ayo, melissa, zoe, aatik, charles]);
  await ChatRepo.save([josephLuisChat, melissaChat, ayoChat]);

  console.log('Succesfully seeded the DB.');
};

const runSeed = async () => {
  try {
    const dbConnection = await db.initialize();
    await dbConnection.dropDatabase();
    await dbConnection.synchronize();
    await seed();
    await dbConnection.destroy();
  } catch (err) {
    console.error('Error during DB seed:', err);
    process.exitCode = 1;
  }
};

if (module === require.main) {
  runSeed();
}
