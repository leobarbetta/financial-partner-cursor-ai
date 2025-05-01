import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SavingJar } from './saving-jar.entity';

@Entity('contributions')
export class Contribution {
  @ApiProperty({ description: 'The unique identifier of the contribution' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The contribution amount' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @ApiProperty({ description: 'The date of the contribution' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ApiProperty({ description: 'The ID of the user who made the contribution' })
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty({ description: 'The ID of the saving jar' })
  @Column({ name: 'saving_jar_id' })
  savingJarId: string;

  @ManyToOne(() => SavingJar)
  @JoinColumn({ name: 'saving_jar_id' })
  savingJar: SavingJar;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
} 