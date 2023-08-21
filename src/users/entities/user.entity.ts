import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryColumn('varchar', { length: 50 })
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field((type) => Int)
  age: number;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
    eager: true,
  })
  @Field(() => [Product], { nullable: true })
  orders?: Product[];
}
