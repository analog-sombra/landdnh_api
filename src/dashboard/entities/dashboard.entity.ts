import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dashboard {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
