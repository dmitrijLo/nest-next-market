import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class CustomerResponseDto {
  @ApiProperty({ example: 'z5hjbc91-5d5k...' })
  uuid: string;

  @ApiProperty({ example: 'maxpower' })
  username: string;

  @ApiProperty({ example: 'max.power@gmx.de' })
  email: string;

  constructor({ uuid, username, email }: Customer) {
    this.uuid = uuid;
    this.username = username;
    this.email = email;
  }
}
