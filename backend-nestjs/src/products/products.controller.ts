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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  allProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 201,
    description: 'The product has beed successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid data.',
  })
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get product by UUID' })
  @ApiResponse({ status: 200, description: 'Return the product.' })
  @ApiResponse({ status: 204, description: 'Product not found.' })
  findProductByUuid(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Product> {
    return this.productsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfuly updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid data.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  updateProduct(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(uuid, updateProductDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return this.productsService.remove(uuid);
  }
}
