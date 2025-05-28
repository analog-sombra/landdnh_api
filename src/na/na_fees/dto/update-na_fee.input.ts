import { CreateNaFeeInput } from './create-na_fee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaFeeInput extends PartialType(CreateNaFeeInput) {
  @Field(() => Int)
  id: number;
}
