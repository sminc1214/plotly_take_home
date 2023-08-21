import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateProductInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  price: number;
}
