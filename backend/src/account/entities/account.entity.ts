import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  username!: string;

  @Column({ length: 100 })
  game_server!: string;

  @Column({ default: 1 })
  level!: number;

  @Column()
  price!: number;

  @Column({ length: 50, default: 'available' })
  status!: string;
}
