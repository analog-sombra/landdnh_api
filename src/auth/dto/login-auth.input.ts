import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginAuthInput {
  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @Field(() => String)
  contact: string;
}
