import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContributionDto {
  @ApiProperty({ description: 'The contribution amount', example: 100.50 })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'The ID of the saving jar', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  savingJarId: string;
} 