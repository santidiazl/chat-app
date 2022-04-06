import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class TimeStamp {
  @CreateDateColumn()
  createdat!: Date;

  @UpdateDateColumn()
  updatedat!: Date;
}
