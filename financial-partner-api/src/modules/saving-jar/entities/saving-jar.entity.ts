import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('saving_jars')
export class SavingJar {
  @ApiProperty({ description: 'The unique identifier of the saving jar' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the saving jar' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'The target date for the saving goal' })
  @Column({ type: 'timestamp' })
  date: Date;

  @ApiProperty({ description: 'The monetary goal to save' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @ApiProperty({ description: 'The ID of the user who created the saving jar' })
  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
} 