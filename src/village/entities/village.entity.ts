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

  @Field(() => Int)
  mamlatar_id: number;

  @Field(() => Int)
  rak_id: number;

  @Field(() => Int)
  circle_officer_id: number;

  @Field(() => Int)
  ldc_mamlatar_id: number;

  @Field(() => Int)
  dy_collector_id: number;

  @Field(() => Int)
  talati_id: number;

  @Field(() => Int)
  pda_id: number;
}
