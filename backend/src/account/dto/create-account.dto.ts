import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  username!: string;

  @IsString()
  game_server!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  level?: number;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsOptional()
  @IsString()
  status?: string;
}
