import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Partner } from './entities/partner.entity';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Partner])],
  controllers: [UsersController, PartnerController],
  providers: [UsersService, PartnerService],
  exports: [UsersService],
})
export class UsersModule {}
