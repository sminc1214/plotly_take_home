import { CreateUserInput } from './dto/create-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ProductsService } from '../products/products.service';
export declare class UsersService {
    private usersRepository;
    private productsService;
    constructor(usersRepository: Repository<User>, productsService: ProductsService);
    create(createUserInput: CreateUserInput): Promise<User>;
    orderProduct(user_id: string, product_id: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}
