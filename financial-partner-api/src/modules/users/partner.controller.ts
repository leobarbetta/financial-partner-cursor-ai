import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Partner } from './entities/partner.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('partners')
@Controller('partners')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new partner' })
  @ApiResponse({ status: 201, description: 'Partner successfully added', type: Partner })
  @ApiResponse({ status: 404, description: 'Partner user not found' })
  @ApiResponse({ status: 409, description: 'Partnership already exists' })
  async addPartner(
    @Request() req: any,
    @Body() createPartnerDto: CreatePartnerDto,
  ): Promise<Partner> {
    return this.partnerService.addPartner(req.user.id, createPartnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all partners' })
  @ApiResponse({ status: 200, description: 'List of all partners', type: [Partner] })
  async getPartners(@Request() req: any): Promise<Partner[]> {
    return this.partnerService.getPartners(req.user.id);
  }
} 