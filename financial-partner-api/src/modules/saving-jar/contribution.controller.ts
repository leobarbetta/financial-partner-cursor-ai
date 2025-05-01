import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContributionService } from './contribution.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { Contribution } from './entities/contribution.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@ApiTags('contributions')
@Controller('contributions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contribution' })
  @ApiResponse({ status: 201, description: 'The contribution has been successfully created.', type: Contribution })
  async create(@Body() createContributionDto: CreateContributionDto, @Request() req: RequestWithUser): Promise<Contribution> {
    return this.contributionService.create(createContributionDto, req.user.id);
  }

  @Get('saving-jar/:savingJarId')
  @ApiOperation({ summary: 'Get all contributions for a saving jar' })
  @ApiResponse({ status: 200, description: 'List of contributions for the saving jar.', type: [Contribution] })
  async findAllBySavingJar(@Param('savingJarId') savingJarId: string): Promise<Contribution[]> {
    return this.contributionService.findAllBySavingJar(savingJarId);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get all contributions for the current user' })
  @ApiResponse({ status: 200, description: 'List of contributions for the user.', type: [Contribution] })
  async findAllByUser(@Request() req: RequestWithUser): Promise<Contribution[]> {
    return this.contributionService.findAllByUser(req.user.id);
  }
} 