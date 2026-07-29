import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { FilterAccountDto } from './dto/filter-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, AccountStatus } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create({
      ...createAccountDto,
      status: createAccountDto.status ?? AccountStatus.AVAILABLE,
      game_type: createAccountDto.game_type ?? 'wuthering_waves',
    });
    return this.accountRepository.save(account);
  }

  async findAll(filter: FilterAccountDto) {
    const qb = this.accountRepository.createQueryBuilder('account');

    if (filter.game_type) {
      qb.andWhere('account.game_type = :gameType', { gameType: filter.game_type });
    }

    if (filter.status) {
      qb.andWhere('account.status = :status', { status: filter.status });
    }

    if (typeof filter.minPrice === 'number' && !Number.isNaN(filter.minPrice)) {
      qb.andWhere('account.price >= :minPrice', { minPrice: filter.minPrice });
    }

    if (typeof filter.maxPrice === 'number' && !Number.isNaN(filter.maxPrice)) {
      qb.andWhere('account.price <= :maxPrice', { maxPrice: filter.maxPrice });
    }

    return qb.orderBy('account.id', 'DESC').getMany();
  }

  async findOne(id: number) {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    return this.accountRepository.remove(account);
  }
}
