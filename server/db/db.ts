import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Participant, Chat, Message } from './entities';

const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'chatapp',
  synchronize: true,
  entities: [Participant, Chat, Message],
});

export default db;
