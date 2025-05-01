import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { User } from './entities/user.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addPartner(userId: string, createPartnerDto: CreatePartnerDto): Promise<Partner> {
    // Check if partner exists
    const partner = await this.userRepository.findOne({ where: { id: createPartnerDto.partnerId } });
    if (!partner) {
      throw new NotFoundException('Partner user not found');
    }

    // Check if partnership already exists
    const existingPartnership = await this.partnerRepository.findOne({
      where: [
        { userId, partnerId: createPartnerDto.partnerId },
        { userId: createPartnerDto.partnerId, partnerId: userId }
      ]
    });

    if (existingPartnership) {
      throw new ConflictException('Partnership already exists');
    }

    // Create new partnership
    const newPartner = this.partnerRepository.create({
      userId,
      partnerId: createPartnerDto.partnerId,
    });

    return this.partnerRepository.save(newPartner);
  }

  async getPartners(userId: string): Promise<Partner[]> {
    return this.partnerRepository.find({
      where: [
        { userId },
        { partnerId: userId }
      ],
      relations: ['user', 'partner'],
    });
  }
} 