import { IsString, IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSavingJarDto {
  @ApiProperty({ description: 'The name of the saving jar', example: 'Vacation Fund' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The target date for achieving the saving goal', example: '2024-12-31' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'The monetary goal to save', example: 5000 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  goal: number;
} 