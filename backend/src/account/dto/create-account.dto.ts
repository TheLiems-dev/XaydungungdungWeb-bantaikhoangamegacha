import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AccountStatus } from '../entities/account.entity';

export class CreateAccountDto {
  @IsString()
  username!: string;

  @IsString()
  game_server!: string;

  @IsOptional()
  @IsString()
  game_type?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  level?: number;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsIn([AccountStatus.AVAILABLE, AccountStatus.SOLD])
  status?: AccountStatus;
}
