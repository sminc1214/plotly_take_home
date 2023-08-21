import { User } from '../../users/entities/user.entity';
export declare class Product {
    id: string;
    name: string;
    price: number;
    user?: User;
}
