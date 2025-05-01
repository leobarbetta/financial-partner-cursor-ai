import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SavingJarService } from './saving-jar.service';
import { CreateSavingJarDto } from './dto/create-saving-jar.dto';
import { UpdateSavingJarDto } from './dto/update-saving-jar.dto';
import { SavingJar } from './entities/saving-jar.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('saving-jars')
@ApiBearerAuth('JWT')
@Controller('saving-jars')
@UseGuards(JwtAuthGuard)
export class SavingJarController {
    constructor(private readonly savingJarService: SavingJarService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new saving jar' })
    @ApiResponse({ status: 201, description: 'The saving jar has been created', type: SavingJar })
    create(
        @Request() req: any,
        @Body() createSavingJarDto: CreateSavingJarDto,
    ): Promise<SavingJar> {
        const userId = req.user.id
        return this.savingJarService.create(createSavingJarDto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all saving jars for the current user' })
    @ApiResponse({ status: 200, description: 'List of saving jars', type: [SavingJar] })
    findAll(@Request() req: any): Promise<SavingJar[]> {
        const userId = req.user.id
        return this.savingJarService.findAll(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific saving jar' })
    @ApiResponse({ status: 200, description: 'The saving jar', type: SavingJar })
    @ApiResponse({ status: 404, description: 'Saving jar not found' })
    findOne(
        @Request() req: any,
        @Param('id') id: string,
    ): Promise<SavingJar> {
        const userId = req.user.id
        return this.savingJarService.findOne(id, userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a saving jar' })
    @ApiResponse({ status: 200, description: 'The saving jar has been updated', type: SavingJar })
    @ApiResponse({ status: 404, description: 'Saving jar not found' })
    update(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateSavingJarDto: UpdateSavingJarDto,
    ): Promise<SavingJar> {
        const userId = req.user.id
        return this.savingJarService.update(id, userId, updateSavingJarDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a saving jar' })
    @ApiResponse({ status: 200, description: 'The saving jar has been deleted' })
    @ApiResponse({ status: 404, description: 'Saving jar not found' })
    remove(
        @Request() req: any,
        @Param('id') id: string,
    ): Promise<void> {
        const userId = req.user.id
        return this.savingJarService.remove(id, userId);
    }
} 