import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { AccountStatus } from '../entities/account.entity';

export class FilterAccountDto {
  @IsOptional()
  @IsString()
  game_type?: string;

  @IsOptional()
  @IsIn([AccountStatus.AVAILABLE, AccountStatus.SOLD])
  status?: AccountStatus;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
