import { Product } from '../../products/entities/product.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    age: number;
    orders?: Product[];
}
