import { PartialType } from '@nestjs/swagger';
import { CreateSavingJarDto } from './create-saving-jar.dto';

export class UpdateSavingJarDto extends PartialType(CreateSavingJarDto) {} 