import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateNaApplicantInput {
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  lastName: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  contact: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  relation: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  signature_url: string;
}
