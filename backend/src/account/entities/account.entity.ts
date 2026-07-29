import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum AccountStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
}

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  username!: string;

  @Column({ length: 100 })
  game_server!: string;

  @Column({ length: 100, default: 'wuthering_waves' })
  game_type!: string;

  @Column({ default: 1 })
  level!: number;

  @Column()
  price!: number;

  @Column({ type: 'varchar', length: 50, default: AccountStatus.AVAILABLE })
  status!: AccountStatus;

  @OneToOne(() => Order, (order) => order.account)
  order?: Order;
}
