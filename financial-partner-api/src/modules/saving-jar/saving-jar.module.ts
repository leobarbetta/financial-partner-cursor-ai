import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingJar } from './entities/saving-jar.entity';
import { Contribution } from './entities/contribution.entity';
import { Partner } from '../users/entities/partner.entity';

import { SavingJarController } from './saving-jar.controller';
import { ContributionController } from './contribution.controller';

import { SavingJarService } from './saving-jar.service';
import { ContributionService } from './contribution.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavingJar, Contribution, Partner]),
  ],
  controllers: [SavingJarController, ContributionController],
  providers: [SavingJarService, ContributionService],
  exports: [SavingJarService, ContributionService],
})
export class SavingJarModule {} 