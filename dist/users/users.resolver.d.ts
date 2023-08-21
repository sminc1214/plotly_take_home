import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    orderProduct(user_id: string, product_id: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}
