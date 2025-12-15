import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PRODUCT_SEED_DATA } from './products.seed';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  private async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) return;

    const products = this.productRepository.create(PRODUCT_SEED_DATA);
    await this.productRepository.save(products);
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(uuid: string) {
    const product = await this.productRepository.findOne({
      where: { id: uuid },
    });
    if (!product)
      throw new NotFoundException(`Product with ${uuid} not found.`);
    return product;
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    if (!Object.values(updateProductDto).some((val) => !!val)) {
      throw new BadRequestException('Body must not be empty');
    }
    await this.productRepository.update(uuid, updateProductDto);

    return this.findOne(uuid);
  }

  async remove(uuid: string) {
    const { affected } = await this.productRepository.delete(uuid);
    if (!affected) {
      throw new NotFoundException(`Product with id ${uuid} not found`);
    }
  }
}
