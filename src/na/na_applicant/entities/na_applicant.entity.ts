import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { UserStatus } from '@prisma/client';
import { Na } from 'src/na/entities/na.entity';
import { Village } from 'src/village/entities/village.entity';

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'The status of the user',
});

@ObjectType()
export class NaApplicant {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  na_formId: number;

  @Field(() => Na)
  na_form: Na;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  contact: string;

  @Field(() => Int, { nullable: true })
  villageId: number;

  @Field(() => Village, { nullable: true })
  village: Village;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  aadhar: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  relation: string;

  @Field(() => String, { nullable: true })
  signature_url: string;

  @Field(() => Boolean)
  is_main: boolean;

  @Field(() => UserStatus)
  status: UserStatus;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => String, { nullable: true })
  deletedAt: string;
}
