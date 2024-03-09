import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { randomUUID } from 'crypto';

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'datetime', nullable: true })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.userTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.token) {
      this.token = randomUUID();
    }
  }
}
