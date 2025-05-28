import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  lastName: string;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @Field(() => String)
  contact: string;

  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role: Role;
}
