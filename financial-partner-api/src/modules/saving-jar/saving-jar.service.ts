import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SavingJar } from './entities/saving-jar.entity';
import { CreateSavingJarDto } from './dto/create-saving-jar.dto';
import { UpdateSavingJarDto } from './dto/update-saving-jar.dto';
import { Partner } from '../users/entities/partner.entity';

@Injectable()
export class SavingJarService {
  constructor(
    @InjectRepository(SavingJar)
    private readonly savingJarRepository: Repository<SavingJar>,
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async create(createSavingJarDto: CreateSavingJarDto, userId: string): Promise<SavingJar> {
    const savingJar = this.savingJarRepository.create({
      ...createSavingJarDto,
      userId,
    });
    return this.savingJarRepository.save(savingJar);
  }

  async findAll(userId: string): Promise<SavingJar[]> {
    // Find all partnerships where the user is either the user or the partner
    const partnerships = await this.partnerRepository.find({
      where: [
        { userId },
        { partnerId: userId },
      ],
    });

    // Extract all partner IDs
    const partnerIds = partnerships.map(partnership => 
      partnership.userId === userId ? partnership.partnerId : partnership.userId
    );

    // Find all saving jars where the user is either the owner or a partner
    return this.savingJarRepository.find({
      where: [
        { userId },
        { userId: In(partnerIds) },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string, userId: string): Promise<SavingJar> {
    // First try to find the saving jar
    const savingJar = await this.savingJarRepository.findOne({
      where: { id },
    });

    if (!savingJar) {
      throw new NotFoundException('Saving jar not found');
    }

    // If the user is the owner, return the jar
    if (savingJar.userId === userId) {
      return savingJar;
    }

    // Check if the user is a partner of the owner
    const partnership = await this.partnerRepository.findOne({
      where: [
        { userId: savingJar.userId, partnerId: userId },
        { userId, partnerId: savingJar.userId },
      ],
    });

    if (!partnership) {
      throw new NotFoundException('Saving jar not found');
    }

    return savingJar;
  }

  async update(id: string, userId: string, updateSavingJarDto: UpdateSavingJarDto): Promise<SavingJar> {
    const savingJar = await this.findOne(id, userId);
    
    // Only allow the owner to update the saving jar
    if (savingJar.userId !== userId) {
      throw new NotFoundException('Saving jar not found');
    }
    
    Object.assign(savingJar, updateSavingJarDto);
    
    return this.savingJarRepository.save(savingJar);
  }

  async remove(id: string, userId: string): Promise<void> {
    const savingJar = await this.findOne(id, userId);
    
    // Only allow the owner to delete the saving jar
    if (savingJar.userId !== userId) {
      throw new NotFoundException('Saving jar not found');
    }
    
    await this.savingJarRepository.softRemove(savingJar);
  }
} 