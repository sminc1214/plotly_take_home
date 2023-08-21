import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
