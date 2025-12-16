import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

interface PostgresError extends Error {
  code: string;
  detail?: string;
  constraint?: string;
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    //'This action adds a new customer';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, salt);

    const newCustomer = this.customerRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });

    try {
      return await this.customerRepository.save(newCustomer);
    } catch (error) {
      // POSTGRES ERROR CODE: 23505 - unique_violation
      // see https://www.postgresql.org/docs/current/errcodes-appendix.html
      const pgErr = error as PostgresError;
      if (pgErr.code === '23505') {
        if (pgErr.detail?.includes('username')) {
          throw new ConflictException('unsername not unique');
        }
        if (pgErr.detail?.includes('email')) {
          throw new ConflictException('email not unique');
        }

        throw new ConflictException('username or email already exists');
      }
      console.error(error);
      throw error;
    }
  }

  findAll() {
    //`This action returns all customer`;
    return this.customerRepository.find();
  }

  async findOne(uuid: string) {
    //`This action returns a #${id} customer`;
    const customer = await this.customerRepository.findOne({ where: { uuid } });
    if (!customer)
      throw new NotFoundException(`customer with #${uuid} not found`);
    return customer;
  }

  async update(uuid: string, updateCustomerDto: UpdateCustomerDto) {
    //`This action updates a #${id} customer`;
    if (!Object.values(updateCustomerDto).some((val) => !!val)) {
      throw new BadRequestException('Body must not be empty');
    }
    await this.customerRepository.update(uuid, updateCustomerDto);

    return this.findOne(uuid);
  }

  async remove(uuid: string) {
    //`This action removes a #${id} customer`;
    const { affected } = await this.customerRepository.delete(uuid);
    if (!affected)
      throw new NotFoundException(`customer with #${uuid} not found`);
  }
}
