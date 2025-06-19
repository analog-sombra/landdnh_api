import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateNaFeeInput } from './create-na_fee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { FeesStatus, PaymentMode, PaymentType } from '@prisma/client';

@InputType()
export class UpdateNaFeeInput extends PartialType(CreateNaFeeInput) {
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  na_formId: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  amount: string;

  @IsOptional()
  @IsEnum(PaymentType)
  @Field(() => PaymentType, { nullable: true })
  payment_type: PaymentType;

  @IsOptional()
  @IsEnum(PaymentMode)
  @Field(() => PaymentMode, { nullable: true })
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
  @IsString()
  @Field(() => String, { nullable: true })
  purpose: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  is_paid: boolean;

  @IsOptional()
  @IsEnum(FeesStatus)
  @Field(() => FeesStatus, { nullable: true })
  status: FeesStatus;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedById: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  deletedById: number;
}
