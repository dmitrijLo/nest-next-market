import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'maxpower', description: 'unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'maxpower@web.de',
    description: 'valid email-adress',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'fs5DD!s',
    description: 'your personal & safe secret',
  })
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
