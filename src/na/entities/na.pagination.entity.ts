import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Na } from './na.entity';

@ObjectType()
export class NaPagination {
  @Field(() => [Na])
  data: Na[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}
