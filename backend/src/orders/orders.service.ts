import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, AccountStatus } from '../account/entities/account.entity';
import { User } from '../users/entities/user.entity';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {}

  async create(userId: number, accountId: number) {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const account = await manager
        .getRepository(Account)
        .createQueryBuilder('account')
        .setLock('pessimistic_write')
        .where('account.id = :id', { id: accountId })
        .getOne();
      if (!account) throw new NotFoundException('Account not found');
      if (account.status !== AccountStatus.AVAILABLE) {
        throw new ConflictException('Account has already been sold');
      }
      if (user.balance < account.price) {
        throw new BadRequestException('Insufficient balance');
      }

      user.balance -= account.price;
      account.status = AccountStatus.SOLD;
      await manager.save(user);
      await manager.save(account);
      const order = manager.create(Order, {
        user,
        account,
        totalPrice: account.price,
        status: OrderStatus.COMPLETED,
      });
      return manager.save(order);
    });
  }

  findMine(userId: number) {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: { account: true },
      order: { id: 'DESC' },
    });
  }

  findAll() {
    return this.orderRepository.find({
      relations: { user: true, account: true },
      order: { id: 'DESC' },
    });
  }
}
