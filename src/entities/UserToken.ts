import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity('user_tokens')
export class UserToken {
  @PrimaryColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.userTokens)
  user: User;
}
