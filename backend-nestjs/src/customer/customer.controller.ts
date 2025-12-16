import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerResponseDto } from './dto/customer-reponse.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer.' })
  @ApiResponse({
    status: 201,
    description: 'Customer has been successfully created.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid Data' })
  @ApiResponse({
    status: 409,
    description: 'Email or Username already exists.',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const customer = await this.customerService.create(createCustomerDto);
    return new CustomerResponseDto(customer);
  }

  @Get()
  @ApiOperation({ description: 'Get all customers.' })
  @ApiResponse({
    status: 200,
    description: 'Return all customers.',
    type: [CustomerResponseDto],
  })
  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.customerService.findAll();
    return customers.map((c) => new CustomerResponseDto(c));
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get customer by UUID.' })
  @ApiResponse({
    status: 200,
    description: 'Return customer.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<CustomerResponseDto> {
    const customer = await this.customerService.findOne(uuid);
    return new CustomerResponseDto(customer);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update customer.' })
  @ApiResponse({
    status: 200,
    description: 'Customer has been successfully updated.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    const customer = await this.customerService.update(uuid, updateCustomerDto);
    return new CustomerResponseDto(customer);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete customer.' })
  @ApiResponse({ status: 204, description: 'Customer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.customerService.remove(uuid);
  }
}
