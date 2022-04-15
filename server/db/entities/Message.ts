import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Chat from './Chat';
import Participant from './Participant';

interface constructorParams {
  message: string;
  sender: Participant;
}

@Entity()
export default class Message {
  constructor(values?: constructorParams) {
    if (!values) {
      return;
    }
    const { message, sender } = values;
    this.message = message;
    this.senderId = sender.id;
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @ManyToOne(() => Participant)
  sender!: Participant;

  @Column()
  senderId!: number;

  @Column({
    default: false,
  })
  read!: boolean;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
