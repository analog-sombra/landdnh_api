import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

registerEnumType(Status, {
  name: 'Status',
  description: 'The status of the village',
});

@ObjectType()
export class Village {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Status)
  status: Status;
}
