import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { PaymentMode, PaymentType } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

registerEnumType(PaymentType, {
  name: 'PaymentType', // this one is mandatory
});

registerEnumType(PaymentMode, {
  name: 'PaymentMode', // this one is mandatory
});

@InputType()
export class CreateNaFeeInput {
  @IsNumber()
  @Field(() => Int)
  na_formId: number;

  @IsString()
  @Field(() => String)
  amount: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  purpose: string;

  @IsNumber()
  @Field(() => Int)
  createdById: number;
}
