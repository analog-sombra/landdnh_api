import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { PaymentMode, PaymentType } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsEnum(PaymentType)
  @Field(() => PaymentType)
  payment_type: PaymentType;

  @IsEnum(PaymentMode)
  @Field(() => PaymentMode)
  payment_mode: PaymentMode;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  transaction_id: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  transaction_date: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  track_id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  bank_name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  bank_ref_no: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  invoice_no: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  order_id: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  is_paid: boolean;
}
