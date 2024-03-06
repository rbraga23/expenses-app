import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expense } from './Expense';
import { UserToken } from './UserToken';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  secret: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  userTokens: UserToken[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
