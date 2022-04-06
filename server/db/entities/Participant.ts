import crypto from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsEmail, Min } from 'class-validator';

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /* Might be worth moving all this to a parent class */
  @BeforeInsert()
  @BeforeUpdate()
  setSaltAndPassword() {
    this.salt = this.createSalt();
    this.password = this.encryptPassword(this.password, this.salt);
  }

  createSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  encryptPassword(unencrypted: string, salt: string) {
    return crypto
      .createHash('RSA-SHA256')
      .update(unencrypted)
      .update(salt)
      .digest('hex');
  }

  correctPassword(password: string) {
    return this.encryptPassword(password, this.salt) === this.password;
  }
}
