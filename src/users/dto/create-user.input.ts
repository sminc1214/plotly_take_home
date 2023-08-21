import { InputType, Int, Field } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => Int)
  age: number;
}
