import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from './expense.entity';
import { UserToken } from './user-token.entity';
import { randomUUID } from 'crypto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  secret: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  userTokens: UserToken[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  constructor() {
    if (!this.secret) {
      this.secret = randomUUID();
    }
  }
}
