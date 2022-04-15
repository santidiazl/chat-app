import crypto from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { IsEmail, Min } from 'class-validator';

import Chat from './Chat';

interface constructorParams {
  username: string;
  email: string;
  password: string;
  photoUrl?: string;
}
@Entity()
export default class Participant {
  constructor(values?: constructorParams) {
    if (!values) {
      return;
    }
    const { username, email, photoUrl, password } = values;
    this.username = username;
    this.email = email;
    this.photoUrl = photoUrl || '';
    this.password = password;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  username!: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column()
  photoUrl!: string;

  @Column()
  @Min(6)
  password!: string;

  @Column({
    nullable: true,
  })
  salt!: string;

  @ManyToMany(() => Chat, (chat) => chat.participants)
  chats!: Chat[];

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn({ select: false })
  updatedAt!: Date;

  /* Might be worth moving all this to a parent class */
  @BeforeInsert()
  @BeforeUpdate()
  private setSaltAndPassword() {
    this.salt = Participant.createSalt();
    this.password = Participant.encryptPassword(this.password, this.salt);
  }

  private static createSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  private static encryptPassword(unencrypted: string, salt: string) {
    return crypto
      .createHash('RSA-SHA256')
      .update(unencrypted)
      .update(salt)
      .digest('hex');
  }

  correctPassword(password: string) {
    return Participant.encryptPassword(password, this.salt) === this.password;
  }
}
