import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 100 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 50, default: UserRole.CUSTOMER })
  role!: UserRole;

  @Column({ type: 'int', default: 0 })
  balance!: number;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
