import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../account/entities/account.entity';

export enum OrderStatus {
  COMPLETED = 'completed',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => Account, (account) => account.order, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  account!: Account;

  @Column({ type: 'int' })
  totalPrice!: number;

  @Column({ type: 'varchar', length: 30, default: OrderStatus.COMPLETED })
  status!: OrderStatus;

  @CreateDateColumn({ name: 'order_date' })
  orderDate!: Date;
}
