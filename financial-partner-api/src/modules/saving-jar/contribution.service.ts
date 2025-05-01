import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contribution } from './entities/contribution.entity';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { SavingJar } from './entities/saving-jar.entity';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    @InjectRepository(SavingJar)
    private readonly savingJarRepository: Repository<SavingJar>,
  ) {}

  async create(createContributionDto: CreateContributionDto, userId: string): Promise<Contribution> {
    // Check if saving jar exists and user has access
    const savingJar = await this.savingJarRepository.findOne({
      where: { id: createContributionDto.savingJarId },
    });

    if (!savingJar) {
      throw new NotFoundException('Saving jar not found');
    }

    // Create and save the contribution
    const contribution = this.contributionRepository.create({
      ...createContributionDto,
      userId,
      date: new Date(),
    });

    return this.contributionRepository.save(contribution);
  }

  async findAllBySavingJar(savingJarId: string): Promise<Contribution[]> {
    const contributions = await this.contributionRepository.find({
      where: { savingJarId },
      order: { date: 'DESC' },
    });

    return contributions;
  }

  async findAllByUser(userId: string): Promise<Contribution[]> {
    const contributions = await this.contributionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
    });

    return contributions;
  }
} 