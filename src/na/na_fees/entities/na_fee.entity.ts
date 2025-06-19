import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { FeesStatus, PaymentMode, PaymentType } from '@prisma/client';
import { Na } from 'src/na/entities/na.entity';
import { User } from 'src/user/entities/user.entity';

registerEnumType(FeesStatus, {
  name: 'FeesStatus',
  description: 'The status of the fees',
});

registerEnumType(PaymentType, {
  name: 'PaymentType',
  description: 'The status of the fees',
});

registerEnumType(PaymentMode, {
  name: 'PaymentMode',
  description: 'The status of the fees',
});

@ObjectType()
export class NaFee {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  na_formId: number;

  @Field(() => Na)
  na_form: Na;

  @Field(() => String)
  amount: string;

  @Field(() => PaymentType)
  payment_type: PaymentType;

  @Field(() => PaymentMode)
  payment_mode: PaymentMode;

  @Field(() => String, { nullable: true })
  transaction_id: string;

  @Field(() => Date, { nullable: true })
  transaction_date: Date;

  @Field(() => String, { nullable: true })
  track_id: string;

  @Field(() => String, { nullable: true })
  bank_name: string;

  @Field(() => String, { nullable: true })
  bank_ref_no: string;

  @Field(() => String, { nullable: true })
  invoice_no: string;

  @Field(() => String, { nullable: true })
  order_id: string;

  @Field(() => String, { nullable: true })
  purpose: string;

  @Field(() => Boolean, { defaultValue: false })
  is_paid: boolean;

  @Field(() => FeesStatus)
  status: FeesStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  createdById: number;

  @Field(() => User, { nullable: true })
  createdBy: User;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  updatedById: number;

  @Field(() => User, { nullable: true })
  updatedBy: User;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Field(() => Int, { nullable: true })
  deletedById: number;

  @Field(() => User, { nullable: true })
  deletedBy: User;
}
