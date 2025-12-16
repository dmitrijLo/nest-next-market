import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';
import { Expose } from 'class-transformer';

export class CustomerResponseDto {
  @ApiProperty({ example: 'z5hjbc91-5d5k...' })
  @Expose()
  uuid: string;

  @ApiProperty({ example: 'maxpower' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'max.power@gmx.de' })
  @Expose()
  email: string;

  constructor({ uuid, username, email }: Customer) {
    this.uuid = uuid;
    this.username = username;
    this.email = email;
  }
}
