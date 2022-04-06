import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Participant, Message } from '.';

interface constructorParams {
  participants: Participant[];
  messages: Message[];
}

@Entity()
export default class Chat {
  constructor(values?: constructorParams) {
    if (!values) {
      return;
    }
    const { participants, messages } = values;
    this.participants = participants;
    this.messages = messages;
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Participant)
  @JoinTable()
  participants!: Participant[];

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
  })
  messages!: Message[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
