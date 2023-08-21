import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  async orderProduct(user_id: string, product_id: string) {
    const product = await this.productsService.findOne(product_id);

    const user = await this.usersRepository.findOne({
      where: { id: user_id },
    });

    if (product && user) {
      user.orders = user.orders ? [...user.orders, product] : [product];

      await this.usersRepository.save(user);
    }

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id: id } });
  }
}
