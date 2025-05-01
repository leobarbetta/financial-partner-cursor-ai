import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+1234567890'
  })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'strongPassword123',
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
