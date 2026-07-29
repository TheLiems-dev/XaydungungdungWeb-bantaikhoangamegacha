import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(request.user!.sub, dto.accountId);
  }

  @Get('me')
  findMine(@Req() request: AuthenticatedRequest) {
    return this.ordersService.findMine(request.user!.sub);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
