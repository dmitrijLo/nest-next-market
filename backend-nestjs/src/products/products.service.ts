import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with ${id} not found.`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Object.values(updateProductDto).some((val) => !!val)) {
      throw new BadRequestException('Body must not be empty');
    }
    await this.productRepository.update(id, updateProductDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const { affected } = await this.productRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
