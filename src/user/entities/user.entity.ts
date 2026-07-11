import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Village } from 'src/village/entities/village.entity';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  alias: string;

  @Field(() => String)
  contact: string;

  @Field(() => String, { nullable: true })
  contact_two: string;

  @Field(() => String, { nullable: true })
  otp: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => Role)
  role: Role;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  aadhar: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => Village, { nullable: true })
  village: Village;
}
